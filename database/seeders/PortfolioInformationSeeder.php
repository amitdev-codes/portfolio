<?php

namespace Database\Seeders;

use App\Models\PortfolioInformation;
use Illuminate\Database\Seeder;

class PortfolioInformationSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'first_name' => 'Amit',
            'middle_name' => 'Kumar',
            'last_name' => 'Dev',
            'role_title' => 'Full Stack Developer',
            'tech_stack' => 'Laravel · React · PHP',

            'address' => 'Sanepa-2, Lalitpur, Kathmandu, Nepal',
            'short_location' => 'Kathmandu, Nepal',
            'latitude' => 27.6780,
            'longitude' => 85.3167,

            'phone_number' => null,
            'mobile_number' => null,
            'email' => 'devopsamit4@gmail.com',

            'cv_link' => null,
            'linkedin_link' => 'https://www.linkedin.com/in/amitdev',
            'github_link' => 'https://github.com/amitdev',
            'website_link' => null,

            'small_description' => 'Building scalable web platforms with Laravel & React — from grievance systems and PMIS to real estate, recruitment, and municipal e-services.',
            'description' => 'I am Amit Kumar Dev, a Laravel-focused full stack developer based in Nepal with 6+ years of hands-on experience. I design and ship production systems for government and enterprise teams — APIs, admin dashboards, and polished React frontends — with a focus on clean architecture, performance, and real-world reliability.',

            'stats' => [
                ['value' => '6+', 'label' => 'Years Exp.'],
                ['value' => '25+', 'label' => 'Projects'],
                ['value' => '15+', 'label' => 'Clients'],
                ['value' => '99%', 'label' => 'Uptime'],
            ],

            'skills' => [
                'Laravel',
                'PHP',
                'React',
                'TypeScript',
                'Vue.js',
                'MySQL',
                'PostgreSQL',
                'Redis',
                'REST APIs',
                'Inertia.js',
                'Tailwind CSS',
                'Docker',
                'Linux',
                'Git',
                'CI/CD',
                'Nginx',
            ],

            'is_available' => true,
            'availability_text' => 'Open to new projects',

            'seo_title' => 'Amit Kumar Dev | Laravel & React Full Stack Developer',
            'seo_metatags' => 'Laravel Developer Nepal, Amit Kumar Dev, Full Stack Developer, React Laravel, PHP Developer Kathmandu, Web Developer Nepal',

            'is_active' => true,
        ];

        $portfolio = PortfolioInformation::query()->first();

        if ($portfolio) {
            $portfolio->update($data);
        } else {
            PortfolioInformation::create($data);
        }
    }
}
