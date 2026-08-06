<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostRequest;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(PostRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('featured_image')) {
            $data['featured_image_path'] = $this->storeImage($request->file('featured_image'), 'posts/featured');
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            if ($post->featured_image_path) {
                Storage::disk('public')->delete($post->featured_image_path);
            }
            $data['featured_image_path'] = $this->storeImage($request->file('featured_image'), 'posts/featured');
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        if ($post->featured_image_path) {
            Storage::disk('public')->delete($post->featured_image_path);
        }

        foreach ($this->extractContentImagePaths($post->content) as $path) {
            Storage::disk('public')->delete($path);
        }

        $post->delete();

        return back()->with('success', 'Post deleted successfully.');
    }

    /**
     * Handles a single image upload from the RichTextEditor, returns its public URL
     * so the editor can insert it inline into the post content.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,webp,jpg', 'max:4096'],
        ]);

        $path = $this->storeImage($request->file('image'), 'posts/content');

        return response()->json(['url' => Storage::disk('public')->url($path)]);
    }

    private function storeImage($file, string $directory): string
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file->getRealPath());
        $image->scaleDown(width: 1600);

        $filename = $directory . '/' . uniqid() . '.webp';
        Storage::disk('public')->put($filename, (string) $image->toWebp(82));

        return $filename;
    }

    /**
     * @return array<int, string>
     */
    private function extractContentImagePaths(string $content): array
    {
        preg_match_all('/<img[^>]+src="([^"]+)"/i', $content, $matches);
        $storageUrl = rtrim(Storage::disk('public')->url(''), '/');

        return collect($matches[1] ?? [])
            ->filter(fn ($src) => str_starts_with($src, $storageUrl))
            ->map(fn ($src) => ltrim(str_replace($storageUrl, '', $src), '/'))
            ->all();
    }
}
