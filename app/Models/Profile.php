<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = [];

    // Automatically cast JSON columns to PHP arrays/objects
    protected $casts = [
        'stack' => 'array',
        'stats' => 'array',
        'available' => 'boolean',
    ];
}
