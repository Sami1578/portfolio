<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('post_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();
            $table->string('session_id');
            $table->date('viewed_date');
            $table->timestamps();

            $table->unique(['post_id', 'session_id', 'viewed_date'], 'post_views_dedup_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('post_views');
    }
};
