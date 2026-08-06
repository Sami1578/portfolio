<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostView extends Model
{
    protected $fillable = [
        'post_id',
        'session_id',
        'viewed_date',
    ];

    protected $casts = [
        'viewed_date' => 'date',
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
