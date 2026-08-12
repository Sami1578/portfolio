<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAutomatedResourceRequest;
use App\Models\Resource;
use App\Models\ResourceMedia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ResourceAutomationController extends Controller
{
    /**
     * Create a resource from the daily GitHub Actions automation.
     *
     * Auth is handled by the shared VerifyAutomationKey middleware (checks
     * X-Automation-Key against config('app.blog_automation_key')) — the
     * same key and middleware used by the blog automation endpoint.
     */
    public function store(StoreAutomatedResourceRequest $request)
    {
        $validated = $request->validated();

        $codeBundlePath = null;
        if ($request->hasFile('code_bundle')) {
            // No disk argument -> uses config('filesystems.default'), whatever
            // that's set to per-environment (R2 on live, local/public in dev).
            $codeBundlePath = $request->file('code_bundle')->store('resources/bundles');
        }

        $resource = Resource::create([
            'user_id' => $validated['user_id'] ?? 1, // Default admin user ID, same pattern as AutoBlogController
            'title' => $validated['title'],
            // slug is intentionally omitted — Resource::boot() fills it
            // automatically via uniqueSlugFrom() on saving.
            'short_description' => $validated['short_description'],
            'instructions' => $validated['instructions'],
            'code_bundle_path' => $codeBundlePath,
            'code_bundle_original_name' => $validated['code_bundle_original_name'] ?? null,
            'tech_tags' => json_decode($validated['tech_tags'], true) ?? [],
            'is_active' => true,
        ]);

        // Thumbnail: download the Unsplash image server-side and attach it as
        // the first ResourceMedia row (sort_order 0), matching how Show.jsx
        // reads resource.media[0] as the main viewer image.
        if (!empty($validated['thumbnail_url'])) {
            $thumbnailPath = $this->downloadThumbnail($validated['thumbnail_url'], $resource->slug);

            if ($thumbnailPath) {
                ResourceMedia::create([
                    'resource_id' => $resource->id,
                    'path' => $thumbnailPath,
                    'type' => 'image',
                    'sort_order' => 0,
                ]);
            }
        }

        return response()->json([
            'message' => 'Resource created successfully.',
            'id' => $resource->id,
            'slug' => $resource->slug,
        ], 201);
    }

    private function downloadThumbnail(string $url, string $slug): ?string
    {
        try {
            $response = Http::timeout(15)->get($url);

            if (!$response->successful()) {
                return null;
            }

            $path = "resources/media/{$slug}-" . uniqid() . '.jpg';
            Storage::put($path, $response->body());

            return $path;
        } catch (\Throwable $e) {
            // Non-fatal — a resource with no media is fine, the frontend
            // already falls back to a placeholder icon for that case.
            report($e);
            return null;
        }
    }
}