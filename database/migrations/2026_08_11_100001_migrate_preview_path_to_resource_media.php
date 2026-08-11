<?php

use App\Models\Resource;
use App\Models\ResourceMedia;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('resources', 'preview_path')) {
            // Carry over any existing single preview as the first media
            // item, so resources created before this update don't lose
            // their image.
            Resource::query()
                ->whereNotNull('preview_path')
                ->get(['id', 'preview_path'])
                ->each(function (Resource $resource) {
                    ResourceMedia::create([
                        'resource_id' => $resource->id,
                        'path' => $resource->preview_path,
                        'type' => 'image',
                        'sort_order' => 0,
                    ]);
                });

            Schema::table('resources', function (Blueprint $table) {
                $table->dropColumn('preview_path');
            });
        }
    }

    public function down(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            $table->string('preview_path')->nullable();
        });

        // One-way backfill only — restoring the single-column value from
        // resource_media on rollback isn't attempted since it's lossy
        // either direction. Re-run the forward migration if needed.
    }
};
