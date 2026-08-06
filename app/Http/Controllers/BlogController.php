<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostView;
use App\Services\PortfolioService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(PortfolioService $portfolioService): Response
    {
        $posts = Post::where('is_published', true)
            ->latest('published_at')
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'featured_image_path' => $post->featured_image_path,
                'tech_tags' => $post->tech_tags ?? [],
                'published_at' => $post->published_at,
                'view_count' => $post->view_count,
            ]);

        return Inertia::render('Blog/Index', [
            ...$this->layoutData($portfolioService),
            'posts' => $posts,
        ]);
    }

    public function show(Request $request, Post $post, PortfolioService $portfolioService): Response
    {
        abort_unless($post->is_published, 404);

        $this->recordView($request, $post);

        return Inertia::render('Blog/Show', [
            ...$this->layoutData($portfolioService),
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'featured_image_path' => $post->featured_image_path,
                'featured_image_url' => $this->absoluteImageUrl($request, $post->featured_image_path),
                'meta_description' => $post->excerpt ?: Str::limit(strip_tags($post->content), 160),
                'tech_tags' => $post->tech_tags ?? [],
                'published_at' => $post->published_at?->toIso8601String(),
                'updated_at' => $post->updated_at?->toIso8601String(),
                'view_count' => $post->view_count,
            ],
            'comments' => $post->approvedComments()
                ->with('approvedReplies:id,parent_id,author_name,body,created_at')
                ->get(['id', 'author_name', 'body', 'created_at']),
            'commenterEmail' => session('commenter_email'),
        ]);
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

    /**
     * Built from the current request host rather than APP_URL so OG/Twitter
     * image tags stay correct regardless of environment/port mismatches.
     */
    private function absoluteImageUrl(Request $request, ?string $path): ?string
    {
        return $path ? $request->getSchemeAndHttpHost() . '/storage/' . $path : null;
    }

    private function recordView(Request $request, Post $post): void
    {
        $created = PostView::query()->insertOrIgnore([
            'post_id' => $post->id,
            'session_id' => $request->session()->getId(),
            'viewed_date' => now()->toDateString(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if ($created) {
            $post->increment('view_count');
        }
    }
}
