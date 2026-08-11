<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'short_description',
        'instructions',
        'code_bundle_path',
        'code_bundle_original_name',
        'tech_tags',
        'is_active',
    ];

    protected $casts = [
        'tech_tags' => 'array',
        'is_active' => 'boolean',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function (Resource $resource) {
            if (blank($resource->slug)) {
                $resource->slug = static::uniqueSlugFrom($resource->title, $resource->id);
            }
        });
    }

    public static function uniqueSlugFrom(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $suffix = 1;

        while (
            static::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-" . ++$suffix;
        }

        return $slug;
    }

    public function media(): HasMany
    {
        return $this->hasMany(ResourceMedia::class)->orderBy('sort_order');
    }
}
