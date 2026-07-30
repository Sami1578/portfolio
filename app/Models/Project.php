<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'architecture_tag',
        'description',
        'highlights',
        'stats',
        'tech_stack',
        'is_featured',
        'sort_order',
    ];

    // Cast JSON columns into arrays for React
    protected $casts = [
        'highlights' => 'array',
        'stats' => 'array',
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
    ];
}
