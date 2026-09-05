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
        Schema::create('about_informations', function (Blueprint $table) {
            $table->id();

            // 🏷️ Section header
            $table->string('section_label')->nullable();     // "About Me"
            $table->string('heading_main')->nullable();       // "What I"
            $table->string('heading_highlight')->nullable();  // "Bring"

            // 💡 Highlight cards (icon + title + desc), left column
            $table->json('highlights')->nullable();
            // e.g. [{"icon":"🎯","title":"Strategic Thinking","desc":"..."}]

            // 📅 Experience timeline, right column
            $table->string('experience_heading')->nullable(); // "Years of Experience"
            $table->json('experiences')->nullable();
            // e.g. [{"year":"2024–Now","role":"...","company":"...","desc":"..."}]

            // 🧰 Tech stack chips
            $table->string('tech_stack_label')->nullable();   // "Tech Stack"
            $table->json('tech_stack')->nullable();
            // e.g. ["React","Laravel","TypeScript",...]

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_informations');
    }
};
