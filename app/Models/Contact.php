<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $guarded = [];

    protected $casts = [
        'contact_info' => 'array',
        'social_links' => 'array',
    ];
}
