<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();

            // 💼 Core Info
            $table->string('role');            // e.g. Backend Developer
            $table->string('company');         // e.g. ABC Pvt Ltd

            // 📝 Description
            $table->text('description')->nullable();

            // 📅 Timeline (important)
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);

            // 🔗 Optional
            $table->string('company_logo')->nullable();
            $table->string('company_website')->nullable();

            // 🔢 Sorting
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
