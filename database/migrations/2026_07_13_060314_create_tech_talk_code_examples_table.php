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
        Schema::create('tech_talk_code_examples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tech_talk_id')
                ->constrained('tech_talks')
                ->cascadeOnDelete();

            $table->string('title')->nullable();        // e.g. "Before optimization"
            $table->string('language')->default('php'); // for syntax highlighting: php, js, blade, sql...
            $table->longText('code');
            $table->text('explanation')->nullable();     // short note above/below the snippet
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_talk_code_examples');
    }
};
