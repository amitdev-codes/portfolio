<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileCannotBeAdded;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::truncate();

        $projects = [
            [
                'title' => 'FANSEP',
                'emoji' => '🌾',
                'short_description' => 'Field-level program and activity management platform for coordinated planning and reporting.',
                'full_description' => 'FANSEP is a web-based management system for planning, tracking, and reporting field activities. It supports structured workflows, role-based access, document handling, and dashboards so teams can monitor progress across regions with clear accountability.',
                'color' => 'from-emerald-500 to-teal-600',
                'accent' => '#059669',
                'tech' => ['Laravel', 'React', 'MySQL', 'Tailwind', 'REST API'],
                'link' => 'https://pmis.amitdev.com.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'GRMS (Grievance Redressal Management System)',
                'emoji' => '⚖️',
                'short_description' => 'End-to-end grievance intake, routing, escalation, and resolution tracking.',
                'full_description' => 'GRMS digitizes grievance redressal from submission to closure. Citizens and staff can register cases, assign departments, track SLAs, escalate overdue items, and generate status reports — improving transparency and response time across the organization.',
                'color' => 'from-violet-500 to-indigo-600',
                'accent' => '#6366f1',
                'tech' => ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'REST API'],
                'link' => 'https://grms.amitdev.com.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'Real Estate Management System',
                'emoji' => '🏢',
                'short_description' => 'Property listings, unit inventory, customers, and transaction tracking in one place.',
                'full_description' => 'A complete real estate management platform covering projects, units, customer onboarding, bookings, and payment tracking. Built with a clean admin UI, relational data model, and APIs that keep inventory and sales pipelines in sync for developers and agents.',
                'color' => 'from-sky-500 to-blue-600',
                'accent' => '#0ea5e9',
                'tech' => ['Laravel', 'Vue.js', 'PostgreSQL', 'S3', 'REST API'],
                'link' => 'https://realestate.amitdev.com.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'Vacancy Management System',
                'emoji' => '👔',
                'short_description' => 'Recruitment portal for posting vacancies, applications, and hiring workflows.',
                'full_description' => 'Vacancy Management System streamlines hiring: publish openings, collect applications, shortlist candidates, and manage recruitment stages. Includes admin controls for vacancy lifecycle, applicant status updates, and reporting for HR teams.',
                'color' => 'from-amber-500 to-orange-600',
                'accent' => '#f59e0b',
                'tech' => ['Laravel', 'React', 'MySQL', 'Tailwind', 'REST API'],
                'link' => 'https://recruit1.ntc.net.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'Online Taxation System',
                'emoji' => '🧾',
                'short_description' => 'Citizen e-service platform for online tax filing, payments, and status tracking.',
                'full_description' => 'Online Taxation System enables citizens to submit tax-related services digitally — including applications, document uploads, payment flows, and status tracking. Designed for municipal / government e-service use with secure authentication and audit-friendly records.',
                'color' => 'from-rose-500 to-pink-600',
                'accent' => '#e11d48',
                'tech' => ['Laravel', 'React', 'MySQL', 'Payment Gateway', 'REST API'],
                'link' => 'https://eservice.kathmandu.gov.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'Meeting Management System',
                'emoji' => '📅',
                'short_description' => 'Schedule meetings, manage agendas, attendance, and minutes digitally.',
                'full_description' => 'Meeting Management System helps organizations plan and run meetings efficiently. Create agendas, invite participants, record attendance, attach documents, and publish minutes — with searchable history and reminders for upcoming sessions.',
                'color' => 'from-cyan-500 to-teal-600',
                'accent' => '#0891b2',
                'tech' => ['Laravel', 'React', 'MySQL', 'Tailwind', 'Notifications'],
                'link' => 'https://meeting.amitdev.com.np/',
                'screenshots' => [],
            ],
            [
                'title' => 'PMIS Management System',
                'emoji' => '📊',
                'short_description' => 'Project monitoring and information system for plans, progress, and reporting.',
                'full_description' => 'PMIS is a project monitoring and information system for tracking plans, milestones, physical/financial progress, and stakeholder reporting. Dashboards and structured forms help teams keep project data consistent and decision-ready.',
                'color' => 'from-purple-500 to-violet-600',
                'accent' => '#8b5cf6',
                'tech' => ['Laravel', 'React', 'MySQL', 'Charts', 'REST API'],
                'link' => 'https://pmis.amitdev.com.np/',
                'screenshots' => [],
            ],
        ];

        foreach ($projects as $index => $item) {
            $project = Project::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'emoji' => $item['emoji'],
                'short_description' => $item['short_description'],
                'full_description' => $item['full_description'],
                'color' => $item['color'],
                'accent' => $item['accent'],
                'tech' => $item['tech'],
                'link' => $item['link'],
                'is_featured' => $index < 3,
                'sort_order' => $index + 1,
            ]);

            foreach ($item['screenshots'] as $filename) {
                $path = database_path("seeders/images/{$filename}");

                if (! file_exists($path)) {
                    $this->command?->warn(
                        "  Missing local seed image for \"{$item['title']}\": {$path}"
                    );
                    continue;
                }

                try {
                    $project->addMedia($path)
                        ->preservingOriginal()
                        ->toMediaCollection('project_screenshots');
                } catch (FileCannotBeAdded $e) {
                    Log::warning("ProjectSeeder: could not attach screenshot for '{$item['title']}': {$path}", [
                        'error' => $e->getMessage(),
                    ]);

                    $this->command?->warn(
                        "  Skipped image for \"{$item['title']}\": {$path}"
                    );
                }
            }
        }
    }
}
