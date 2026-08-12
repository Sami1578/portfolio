<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Resource;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generates the sitemap dynamically so newly published posts are included automatically.
     */
    public function index(): Response
    {
        $origin = rtrim(config('app.url'), '/');

        $urls = [
            ['loc' => $origin . '/', 'lastmod' => now()->toDateString(), 'changefreq' => 'monthly', 'priority' => '1.0'],
            ['loc' => $origin . '/posts', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => $origin . '/resources', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '0.8'],
            ];

        Post::where('is_published', true)
            ->get(['slug', 'updated_at'])
            ->each(function (Post $post) use (&$urls, $origin) {
                $urls[] = [
                    'loc' => $origin . '/posts/' . $post->slug,
                    'lastmod' => $post->updated_at->toDateString(),
                    'changefreq' => 'monthly',
                    'priority' => '0.6',
                ];
            });

        Resource::where('is_active', true)
            ->get(['slug', 'updated_at'])
            ->each(function (Resource $resource) use (&$urls, $origin) {
                $urls[] = [
                    'loc' => $origin . '/resources/' . $resource->slug,
                    'lastmod' => $resource->updated_at->toDateString(),
                    'changefreq' => 'monthly',
                    'priority' => '0.6',
                ];
            });

        $content = view('sitemap', ['urls' => $urls])->render();

        return response($content, 200)
            ->header('Content-Type', 'text/xml; charset=utf-8');
    }
}
