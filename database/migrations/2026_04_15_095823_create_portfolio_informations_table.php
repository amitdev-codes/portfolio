<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_informations', function (Blueprint $table) {
            $table->id();
            // 👤 Basic Info
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();

            // 📍 Address & Location
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // 📞 Contact
            $table->string('phone_number')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('email')->nullable();

            // 🔗 Links
            $table->string('cv_link')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('github_link')->nullable();
            $table->string('website_link')->nullable();

            // 📝 Descriptions
            $table->string('small_description', 500)->nullable();
            $table->longText('description')->nullable();

            // 🔍 SEO
            $table->string('seo_title')->nullable();
            $table->text('seo_metatags')->nullable();

            // ⚙️ Extra useful fields
            $table->string('profile_image')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_informations');
    }
};
