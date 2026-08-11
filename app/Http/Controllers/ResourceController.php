<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Services\PortfolioService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ResourceController extends Controller
{
    private const RESOURCES_PER_PAGE = 9;

    public function index(Request $request, PortfolioService $portfolioService): Response
    {
        $search = trim((string) $request->query('search', ''));
        $selectedTags = array_values(array_filter((array) $request->query('tags', [])));

        $resources = Resource::where('is_active', true)
            ->with(['media' => fn ($q) => $q->orderBy('sort_order')])
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
                'slug' => $resource->slug,
                'short_description' => $resource->short_description,
                'tech_tags' => $resource->tech_tags ?? [],
                'download_count' => $resource->download_count,
                // Card only needs the first image for the grid thumbnail
                // plus a count badge — full gallery lives on the detail page.
                'thumbnail_path' => $resource->media->first()?->path,
                'media_count' => $resource->media->count(),
            ]);

        return Inertia::render('Resources/Index', [
            ...$this->layoutData($portfolioService),
            'resources' => $resources,
            'availableTags' => $this->availableTags(),
            'selectedTags' => $selectedTags,
            'search' => $search,
        ]);
    }

    public function show(Resource $resource, PortfolioService $portfolioService): Response
    {
        abort_unless($resource->is_active, 404);

        return Inertia::render('Resources/Show', [
            ...$this->layoutData($portfolioService),
            'resource' => [
                'id' => $resource->id,
                'title' => $resource->title,
                'slug' => $resource->slug,
                'short_description' => $resource->short_description,
                'instructions' => $resource->instructions,
                'tech_tags' => $resource->tech_tags ?? [],
                'download_count' => $resource->download_count,
                'has_code_bundle' => (bool) $resource->code_bundle_path,
                'media' => $resource->media->map(fn ($m) => [
                    'id' => $m->id,
                    'path' => $m->path,
                    'type' => $m->type,
                ]),
            ],
        ]);
    }

    public function download(Resource $resource): StreamedResponse
    {
        abort_unless($resource->is_active, 404);
        abort_unless($resource->code_bundle_path, 404);

        $resource->increment('download_count');

        $downloadName = $resource->code_bundle_original_name
            ?: Str::slug($resource->title) . '.zip';

        return Storage::download($resource->code_bundle_path, $downloadName);
    }

    /**
     * @return array<int, string>
     */
    private function availableTags(): array
    {
        return Resource::where('is_active', true)
            ->pluck('tech_tags')
            ->flatten()
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function layoutData(PortfolioService $portfolioService): array
    {
        $data = $portfolioService->getPortfolioData();

        return [
            'profile' => $data['profile'],
            'whatsapp' => $data['whatsapp'],
            'socialLinks' => $data['socialLinks'],
        ];
    }
}
