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
        Schema::table('visitor_analytics', function (Blueprint $table) {
            $table->integer('total_visited')->default(1);
            $table->timestamp('last_visited_at')->useCurrent();
            $table->index('last_visited_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_analytics', function (Blueprint $table) {
            $table->dropColumn(['total_visited', 'last_visited_at']);
        });
    }
};
