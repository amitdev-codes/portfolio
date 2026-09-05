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
                'title' => 'E-Commerce Platform',
                'emoji' => '🛒',
                'short_description' => 'Scalable e-commerce with real-time inventory and Stripe payments.',
                'full_description' => 'A full-featured e-commerce solution built for scale. Includes real-time inventory management, Stripe payment processing, an admin dashboard with analytics, multi-vendor support, and a custom recommendation engine. Handles 10k+ concurrent users with sub-200ms response times.',
                'color' => 'from-violet-500 to-indigo-600',
                'accent' => '#6366f1',
                'tech' => ['React', 'Laravel', 'Stripe', 'PostgreSQL', 'Redis'],
                'link' => '#',
                'screenshots' => ['ecommerce-1.jpg', 'ecommerce-2.jpg', 'ecommerce-3.jpg'],
            ],
            [
                'title' => 'Analytics Dashboard',
                'emoji' => '📊',
                'short_description' => 'Real-time data visualization with interactive charts and reports.',
                'full_description' => 'Enterprise-grade analytics platform with real-time WebSocket data feeds. Features custom chart builder, drag-and-drop dashboard layout, scheduled PDF reports, role-based access control, and multi-tenant architecture. Processes 1M+ data points daily.',
                'color' => 'from-pink-500 to-rose-600',
                'accent' => '#ec4899',
                'tech' => ['React', 'Chart.js', 'Node.js', 'MongoDB', 'WebSocket'],
                'link' => '#',
                'screenshots' => ['analytics-1.jpg', 'analytics-2.jpg', 'analytics-3.jpg'],
            ],
            [
                'title' => 'Social Network',
                'emoji' => '💬',
                'short_description' => 'Community platform with real-time messaging and content sharing.',
                'full_description' => 'Full-stack social platform with real-time WebSocket messaging, news feed algorithm, story feature, notification system, and content moderation tools. Supports media uploads via S3, end-to-end encrypted DMs, and group channels with up to 1000 members.',
                'color' => 'from-emerald-500 to-teal-600',
                'accent' => '#10b981',
                'tech' => ['React', 'Firebase', 'WebSocket', 'Tailwind', 'S3'],
                'link' => '#',
                'screenshots' => ['social-1.jpg', 'social-2.jpg', 'social-3.jpg'],
            ],
            [
                'title' => 'Content Management',
                'emoji' => '📝',
                'short_description' => 'Headless CMS with versioning and multi-language support.',
                'full_description' => 'A developer-friendly headless CMS with a visual block editor, content versioning with rollback, multi-language & locale support, GraphQL & REST APIs, webhook integrations, and media optimization pipeline. Used by 3 production publishing clients.',
                'color' => 'from-amber-500 to-orange-600',
                'accent' => '#f59e0b',
                'tech' => ['Laravel', 'Vue.js', 'PostgreSQL', 'S3', 'GraphQL'],
                'link' => '#',
                'screenshots' => ['cms-1.jpg', 'cms-2.jpg', 'cms-3.jpg'],
            ],
            [
                'title' => 'Learning Platform',
                'emoji' => '🎓',
                'short_description' => 'Online education with video streaming and progress tracking.',
                'full_description' => 'LMS platform with adaptive video streaming via FFmpeg, interactive quizzes with branching logic, student progress tracking, certificate generation, live Q&A sessions, and an instructor analytics panel. Supports cohort-based and self-paced courses.',
                'color' => 'from-sky-500 to-blue-600',
                'accent' => '#0ea5e9',
                'tech' => ['React', 'Laravel', 'FFmpeg', 'Redis', 'HLS'],
                'link' => '#',
                'screenshots' => ['learning-1.jpg', 'learning-2.jpg', 'learning-3.jpg'],
            ],
            [
                'title' => 'Healthcare Management',
                'emoji' => '🏥',
                'short_description' => 'HIPAA-compliant appointment scheduling and telemedicine.',
                'full_description' => 'Comprehensive healthcare platform with HIPAA-compliant data handling, appointment scheduling with conflict resolution, electronic medical records (EMR), WebRTC-powered video consultations, prescription management, and insurance claim processing integration.',
                'color' => 'from-purple-500 to-violet-600',
                'accent' => '#8b5cf6',
                'tech' => ['React', 'Node.js', 'MongoDB', 'WebRTC', 'HIPAA'],
                'link' => '#',
                'screenshots' => ['healthcare-1.jpg', 'healthcare-2.jpg', 'healthcare-3.jpg'],
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
                'is_featured' => $index < 3, // first 3 featured
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
                        ->preservingOriginal() // keep the source file in database/seeders/images
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
