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
        Schema::create('tech_talk_screenshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tech_talk_id')
                ->constrained('tech_talks')
                ->cascadeOnDelete();

            $table->string('image_path');       // storage path, e.g. tech-talks/abc.png
            $table->string('caption')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_talk_screenshots');
    }
};
