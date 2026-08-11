<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('short_description');
            // Markdown/rich-text setup instructions, same longText pattern as posts.content.
            $table->longText('instructions')->nullable();
            // Storage::put() disk paths — local in dev, R2 in production. Same
            // "store relative path, resolve URL at render time" pattern as
            // Post::featured_image_path.
            $table->string('preview_path')->nullable();
            $table->string('code_bundle_path')->nullable();
            $table->string('code_bundle_original_name')->nullable();
            // JSON tag array, mirrors Post::tech_tags so the same TagFilter /
            // whereJsonContains querying approach works unchanged.
            $table->json('tech_tags')->nullable();
            $table->unsignedInteger('download_count')->default(0);
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
