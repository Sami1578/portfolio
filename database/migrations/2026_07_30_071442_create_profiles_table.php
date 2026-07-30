<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('initials');
            $table->string('title');
            $table->text('tagline');
            $table->boolean('available')->default(true);
            $table->string('availability_label');
            $table->string('location');
            $table->json('stack'); // Stores ['Laravel', 'React', 'MySQL']
            $table->json('stats'); // Stores [{value: '10+', label: 'Projects shipped'}, ...]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
