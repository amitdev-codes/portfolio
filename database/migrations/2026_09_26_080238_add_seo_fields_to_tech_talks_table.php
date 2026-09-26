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
        Schema::table('tech_talks', function (Blueprint $table) {
            $table->string('seo_title')->nullable()->after('slug');
            $table->text('seo_metatags')->nullable()->after('seo_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tech_talks', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_metatags']);
        });
    }
};
