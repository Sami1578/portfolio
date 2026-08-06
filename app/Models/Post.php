<?php

namespace App\Models;

use App\Support\SanitizesHtml;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use SanitizesHtml;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image_path',
        'tech_tags',
        'is_published',
        'published_at',
        'view_count',
    ];

    protected $casts = [
        'tech_tags' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (Post $post) {
            if ($post->isDirty('content')) {
                $post->content = $post->sanitizeHtml($post->content);
            }

            if (! $post->slug) {
                $post->slug = static::generateUniqueSlug($post->title);
            }

            if ($post->is_published && ! $post->published_at) {
                $post->published_at = now();
            }
        });
    }

    public static function generateUniqueSlug(string $title): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $suffix = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = "{$base}-" . ++$suffix;
        }

        return $slug;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(PostComment::class);
    }

    public function approvedComments(): HasMany
    {
        return $this->comments()->whereNull('parent_id')->where('status', 'approved')->latest();
    }

    public function views(): HasMany
    {
        return $this->hasMany(PostView::class);
    }
}
