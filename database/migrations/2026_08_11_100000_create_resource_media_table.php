<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resource_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resource_id')->constrained()->cascadeOnDelete();
            $table->string('path');
            // 'image' or 'video' — set at upload time from the file's mime,
            // so the frontend gallery knows whether to render <img> or
            // <video> without sniffing extensions.
            $table->string('type')->default('image');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['resource_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resource_media');
    }
};
