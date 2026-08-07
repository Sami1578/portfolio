<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AutoBlogController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // 1. Authenticate secret token from headers
        $automationKey = $request->header('X-Automation-Key');
        if (!$automationKey || $automationKey !== config('app.blog_automation_key')) {
            return response()->json(['message' => 'Unauthorized key.'], 401);
        }

        // 2. Validate payload matching your Post model
        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'excerpt'             => 'nullable|string',
            'content'             => 'required|string',
            'featured_image_path' => 'nullable|string',
            'tech_tags'           => 'nullable|array',
            'user_id'             => 'nullable|integer|exists:users,id',
        ]);

        // 3. Create post using model attributes
        $post = Post::create([
            'user_id'             => $validated['user_id'] ?? 1, // Default admin user ID
            'title'               => $validated['title'],
            'excerpt'             => $validated['excerpt'] ?? null,
            'content'             => $validated['content'],
            'featured_image_path' => $validated['featured_image_path'] ?? null,
            'tech_tags'           => $validated['tech_tags'] ?? [],
            'is_published'        => true,
            'published_at'        => now(),
        ]);

        return response()->json([
            'message' => 'Post published successfully!',
            'slug'    => $post->slug,
            'post_id' => $post->id,
        ], 201);
    }
}