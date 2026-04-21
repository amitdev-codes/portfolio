<?php

namespace Database\Seeders;

use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run()
    {
        Experience::truncate();

        $experiences = [
            [
                'role' => 'Laravel Developer',
                'company' => 'Freelance / Contract',
                'description' => 'Working as a Laravel developer building scalable web applications, REST APIs, and dynamic dashboards. Focused on performance optimization, clean architecture, and modern frontend integration using React.',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'company_logo' => null,
                'company_website' => null,
            ],
            [
                'role' => 'Junior Web Developer',
                'company' => 'Local IT Company, Kathmandu',
                'description' => 'Worked on PHP and Laravel-based applications, contributed to CRUD systems, admin panels, and learned database optimization and API integrations.',
                'start_date' => '2022-01-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'company_logo' => null,
                'company_website' => null,
            ],
        ];

        foreach ($experiences as $index => $item) {
            Experience::create([
                'role' => $item['role'],
                'company' => $item['company'],
                'description' => $item['description'],

                'start_date' => $item['start_date']
                    ? Carbon::parse($item['start_date'])
                    : null,

                'end_date' => $item['end_date']
                    ? Carbon::parse($item['end_date'])
                    : null,

                'is_current' => $item['is_current'],

                'company_logo' => $item['company_logo'],
                'company_website' => $item['company_website'],

                'sort_order' => $index + 1,
            ]);
        }
    }
}
