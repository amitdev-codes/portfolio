<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutInformationSeeder extends Seeder
{
    public function run()
    {
        DB::table('about_informations')->truncate();

        DB::table('about_informations')->insert([
            'section_label' => 'About Me',
            'heading_main' => 'What I',
            'heading_highlight' => 'Bring',

            'highlights' => json_encode([
                [
                    'icon' => '🎯',
                    'title' => 'Strategic Thinking',
                    'desc' => 'I approach projects with clear goals, designing solutions that deliver real business value.',
                ],
                [
                    'icon' => '⚡',
                    'title' => 'Full Stack Expertise',
                    'desc' => 'From DB architecture to pixel-perfect UI — comfortable across the entire stack.',
                ],
                [
                    'icon' => '🛡️',
                    'title' => 'Code Quality First',
                    'desc' => 'Clean, maintainable, well-documented code that scales without pain.',
                ],
                [
                    'icon' => '🚀',
                    'title' => 'Performance Driven',
                    'desc' => 'I optimize queries, assets, and workflows so applications stay fast as they grow.',
                ],
                [
                    'icon' => '🤝',
                    'title' => 'Clear Communication',
                    'desc' => 'I keep stakeholders in the loop with honest updates and no surprises at deadline time.',
                ],
                [
                    'icon' => '🔄',
                    'title' => 'Continuous Learning',
                    'desc' => 'I stay current with modern tools and best practices, applying what actually moves the needle.',
                ],
            ]),

            'experience_heading' => 'Years of Experience',
            'experiences' => json_encode([
                [
                    'year' => '2025–Now',
                    'role' => 'Senior Full Stack Developer',
                    'company' => 'Dryice Solutions',
                    'desc' => 'Contributed to the enhancement and successful implementation of the MOFA Project, improving overall project efficiency and outcomes. Played a key role in the FANSEP 2 Project, a World Bank–funded initiative, leading it to successful completion with sole responsibility for execution and coordination.',
                ],
                [
                    'year' => '2024–2025',
                    'role' => 'Full Stack Developer',
                    'company' => 'Empire Int',
                    'desc' => 'Developed and maintained a real estate management system using Laravel and Vue.js, covering property listings, unit/customer management, and transaction tracking. Designed the relational database schema for projects, units, customers, and payments, and built REST APIs connecting frontend to backend service',
                ],
                [
                    'year' => '2023–2024',
                    'role' => 'Full Stack Developer',
                    'company' => 'Malakar System/Freelance upwork',
                    'desc' => 'Developed Ecommerce project with nodejs,react and larvel as backend as well as ride sharing app',
                ],
                [
                    'year' => '2018–2023',
                    'role' => 'Backend Developer',
                    'company' => 'Shangrila Microsystem',
                    'desc' => "Led final delivery of VMS's result publication and payment processing modules, mentored junior developers, and served as primary technical contact for the PMIS and taxation systems",
                ],
                [
                    'year' => '2017–2018',
                    'role' => 'Entry level Java Developer',
                    'company' => 'Quest IT',
                    'desc' => 'Assited Java project of school management system with spring framework,hibernate and jdk 10 with mysql database',
                ],
            ]),

            'tech_stack_label' => 'Tech Stack',
            'tech_stack' => json_encode([
                'React', 'Laravel', 'TypeScript', 'PostgreSQL', 'Redis',
                'Docker', 'AWS', 'Tailwind', 'Node.js', 'Vue.js',
            ]),

            'is_active' => true,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
