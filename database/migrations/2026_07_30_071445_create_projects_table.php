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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');                          // e.g. "Enterprise Multi-Vendor E-Commerce Platform"
            $table->string('subtitle')->nullable();          // e.g. "MENA Region · Client NDA Protected"
            $table->string('architecture_tag')->nullable();  // e.g. "REST API · Event-Driven · Multi-Tenant"
            $table->text('description');                     // High-level summary of the project

            // JSON columns for flexible arrays & key-value pairs
            $table->json('highlights');                      // Array of bullet points: ["Built RBAC...", "Integrated Bosta..."]
            $table->json('stats')->nullable();               // Array of objects: [{"value": "35%", "label": "Query Speed"}]
            $table->json('tech_stack');                      // Array of strings: ["Laravel", "Stripe API", "MySQL"]

            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
