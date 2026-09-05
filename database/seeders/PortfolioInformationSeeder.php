<?php

namespace Database\Seeders;

use App\Models\PortfolioInformation;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioInformationSeeder extends Seeder
{
    public function run()
    {
        DB::table('portfolio_informations')->truncate();

        DB::table('portfolio_informations')->insert([
            // 👤 Basic Info
            'first_name' => 'Amit',
            'middle_name' => 'Kumar',
            'last_name' => 'Dev',
            'role_title' => 'Full Stack Developer',
            'tech_stack' => 'React + Laravel',

            // 📍 Address & Location
            'address' => 'Sanepa-2, Lalitpur, Kathmandu, Nepal',
            'short_location' => 'Kathmandu, Nepal',
            'latitude' => 27.6780,
            'longitude' => 85.3167,

            // 📞 Contact
            'phone_number' => null,
            'mobile_number' => null,
            'email' => 'devopsamit4@gmail.com',

            // 🔗 Links
            'cv_link' => null,
            'linkedin_link' => 'https://www.linkedin.com/in/amitdev',
            'github_link' => 'https://github.com/amitdev',
            'website_link' => null,

            // 📝 Descriptions
            'small_description' => 'I craft high-performance web applications with React & Laravel — turning complex problems into elegant, scalable solutions.',
            'description' => 'I am Amit Kumar Dev, a Laravel-focused full stack developer based in Nepal. I specialize in building scalable web applications using Laravel, React, and modern web technologies. I have experience in backend architecture, API development, and dynamic frontend integrations. Passionate about clean code, performance optimization, and real-world problem solving.',

            // 📊 Hero Stats
            'stats' => json_encode([
                ['value' => '3+', 'label' => 'Years Exp.'],
                ['value' => '20+', 'label' => 'Projects'],
                ['value' => '15+', 'label' => 'Clients'],
                ['value' => '99%', 'label' => 'Uptime'],
            ]),

            // ✅ Availability
            'is_available' => true,
            'availability_text' => 'Available for work',

            // 🔍 SEO
            'seo_title' => 'Amit Kumar Dev | Laravel Developer Portfolio',
            'seo_metatags' => 'Laravel Developer Nepal, Amit Kumar Dev, Full Stack Developer Nepal, Laravel React Developer, PHP Developer Nepal, Web Developer Kathmandu',

            // 🖼 Images
            'profile_image' => 'profile.jpg',
            'cover_image' => 'cover.jpg',

            // ⚙️ Status
            'is_active' => true,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
