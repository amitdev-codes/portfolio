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
            $table->string('role_title')->nullable();      // "Full Stack Developer"
            $table->string('tech_stack')->nullable();       // "React + Laravel"

            // 📍 Address & Location
            $table->string('address')->nullable();
            $table->string('short_location')->nullable();   // "Kathmandu, Nepal" (badge display)
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
            $table->string('small_description', 500)->nullable(); // used as hero tagline
            $table->longText('description')->nullable();

            // 📊 Hero Stats (kept as flexible JSON so you can add/remove/re-order without new migrations)
            $table->json('stats')->nullable();
            // e.g. [{"value":"3+","label":"Years Exp."}, {"value":"20+","label":"Projects"}, ...]
            //skills
            $table->json('skills')->nullable();
            // ✅ Availability
            $table->boolean('is_available')->default(true);
            $table->string('availability_text')->nullable(); // "Available for work"

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
