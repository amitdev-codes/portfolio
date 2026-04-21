<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_talks', function (Blueprint $table) {
            $table->id();
            // 🔢 Ordering / display
            $table->unsignedInteger('number')->nullable(); // e.g. Talk #1, #2
            $table->unsignedInteger('sort_order')->default(0);

            // 🏷 Category
            $table->string('category')->nullable();
            $table->string('category_color')->nullable(); // e.g. tailwind color or hex

            // 📄 Content
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable(); // full talk/blog content

            // 📅 Meta
            $table->date('date')->nullable();
            $table->string('read_time')->nullable(); // e.g. "5 min read"

            // 🔗 Optional useful fields
            $table->string('slug')->unique();
            $table->string('cover_image')->nullable();
            $table->string('video_link')->nullable(); // YouTube / talk link
            $table->string('source_link')->nullable(); // slides / repo

            // ⚙️ Status
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_talks');
    }
};
