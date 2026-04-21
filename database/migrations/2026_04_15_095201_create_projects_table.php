<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            // 📄 Content
            $table->string('title');
            $table->string('slug')->nullable();
            $table->longText('short_description')->nullable();
            $table->longText('full_description')->nullable();

            // 🎨 UI/Design
            $table->string('emoji')->nullable();
            $table->string('color')->nullable();   // gradient classes
            $table->string('accent')->nullable();  // hex color

            // 🧰 Tech stack
            $table->json('tech')->nullable();

            // 🔗 Links
            $table->string('link')->nullable();

            // ⭐ Flags
            $table->boolean('is_featured')->default(false);

            // 🔢 Sorting
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
