<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ResourceRequest;
use App\Models\Resource;
use App\Models\ResourceMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    private const RESOURCES_PER_PAGE = 15;

    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $selectedTags = array_values(array_filter((array) $request->query('tags', [])));

        $resources = Resource::query()
            ->with(['media' => fn ($q) => $q->orderBy('sort_order')->limit(1)])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->when(!empty($selectedTags), function ($query) use ($selectedTags) {
                $query->where(function ($q) use ($selectedTags) {
                    foreach ($selectedTags as $tag) {
                        $q->orWhereJsonContains('tech_tags', $tag);
                    }
                });
            })
            ->latest()
            ->paginate(self::RESOURCES_PER_PAGE)
            ->withQueryString()
            ->through(fn (Resource $resource) => [
                'id' => $resource->id,
                'title' => $resource->title,
                'short_description' => $resource->short_description,
                'tech_tags' => $resource->tech_tags ?? [],
                'download_count' => $resource->download_count,
                'is_active' => $resource->is_active,
                'thumbnail_path' => $resource->media->first()?->path,
                'media_count' => $resource->media->count(),
            ]);

        return Inertia::render('Admin/Resources/Index', [
            'resources' => $resources,
            'availableTags' => $this->availableTags(),
            'selectedTags' => $selectedTags,
            'search' => $search,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Resources/Create');
    }

    public function store(ResourceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        unset($data['preview_files'], $data['remove_media_ids'], $data['code_bundle']);

        if ($request->hasFile('code_bundle')) {
            $file = $request->file('code_bundle');
            $data['code_bundle_path'] = $this->storeCodeBundle($file);
            $data['code_bundle_original_name'] = $file->getClientOriginalName();
        }

        $resource = Resource::create($data);

        if ($request->hasFile('preview_files')) {
            $this->storeMedia($resource, $request->file('preview_files'));
        }

        return redirect()->route('admin.resources.index')->with('success', 'Resource created successfully.');
    }

    public function edit(Resource $resource): Response
    {
        return Inertia::render('Admin/Resources/Edit', [
            'resource' => [
                ...$resource->toArray(),
                'media' => $resource->media->map(fn (ResourceMedia $m) => [
                    'id' => $m->id,
                    'path' => $m->path,
                    'type' => $m->type,
                ]),
            ],
        ]);
    }

    public function update(ResourceRequest $request, Resource $resource): RedirectResponse
    {
        $data = $request->validated();
        $removeIds = $data['remove_media_ids'] ?? [];
        unset($data['preview_files'], $data['remove_media_ids'], $data['code_bundle']);

        if ($request->hasFile('code_bundle')) {
            if ($resource->code_bundle_path) {
                Storage::delete($resource->code_bundle_path);
            }
            $file = $request->file('code_bundle');
            $data['code_bundle_path'] = $this->storeCodeBundle($file);
            $data['code_bundle_original_name'] = $file->getClientOriginalName();
        }

        $resource->update($data);

        if (!empty($removeIds)) {
            $this->deleteMediaByIds($resource, $removeIds);
        }

        if ($request->hasFile('preview_files')) {
            $this->storeMedia($resource, $request->file('preview_files'));
        }

        return redirect()->route('admin.resources.index')->with('success', 'Resource updated successfully.');
    }

    public function destroy(Resource $resource): RedirectResponse
    {
        foreach ($resource->media as $media) {
            Storage::delete($media->path);
        }
        if ($resource->code_bundle_path) {
            Storage::delete($resource->code_bundle_path);
        }

        $resource->delete();

        return back()->with('success', 'Resource deleted successfully.');
    }

    public function toggleActive(Resource $resource): RedirectResponse
    {
        $resource->update(['is_active' => !$resource->is_active]);

        return back()->with('success', $resource->is_active ? 'Resource published.' : 'Resource unpublished.');
    }

    /**
     * Deletes a single media item immediately — used by the edit form's
     * per-thumbnail "x" button so removal doesn't wait on a full form
     * submit. Kept separate from the `remove_media_ids` bulk path in
     * update(), which exists for the create-form case (media selected and
     * then deselected before the resource even exists yet).
     */
    public function destroyMedia(Resource $resource, ResourceMedia $media): RedirectResponse
    {
        abort_unless($media->resource_id === $resource->id, 404);

        Storage::delete($media->path);
        $media->delete();

        return back()->with('success', 'Media removed.');
    }

    /**
     * @return array<int, string>
     */
    private function availableTags(): array
    {
        return Resource::query()
            ->pluck('tech_tags')
            ->flatten()
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->all();
    }

    /**
     * @param array<int, UploadedFile> $files
     */
    private function storeMedia(Resource $resource, array $files): void
    {
        $nextOrder = (int) $resource->media()->max('sort_order');

        foreach ($files as $file) {
            $nextOrder++;
            $isVideo = str_starts_with($file->getMimeType() ?? '', 'video/');

            $path = ($isVideo ? 'previews/video/' : 'previews/image/') . uniqid() . '.' . $file->getClientOriginalExtension();
            Storage::put($path, file_get_contents($file->getRealPath()));

            ResourceMedia::create([
                'resource_id' => $resource->id,
                'path' => $path,
                'type' => $isVideo ? 'video' : 'image',
                'sort_order' => $nextOrder,
            ]);
        }
    }

    /**
     * @param array<int, int> $ids
     */
    private function deleteMediaByIds(Resource $resource, array $ids): void
    {
        $items = $resource->media()->whereIn('id', $ids)->get();

        foreach ($items as $media) {
            Storage::delete($media->path);
            $media->delete();
        }
    }

    private function storeCodeBundle($file): string
    {
        $path = 'code-bundles/' . uniqid() . '.zip';
        Storage::put($path, file_get_contents($file->getRealPath()));

        return $path;
    }
}
