<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Widen featured_image_path from varchar(255) to text.
     *
     * Unsplash (and most third-party image CDN) URLs routinely exceed 255
     * characters once query params like ixid, ixlib, crop, and sizing flags
     * are included, and truncating them silently corrupts the URL rather
     * than just warning — so this needs to be a real column change, not a
     * script-side workaround alone.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->text('featured_image_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('featured_image_path', 255)->nullable()->change();
        });
    }
};