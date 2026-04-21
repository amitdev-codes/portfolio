<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=380&fit=crop',
                ],
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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=380&fit=crop',
                ],
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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&h=380&fit=crop',
                ],
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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=380&fit=crop',
                ],
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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=380&fit=crop',
                ],
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
                'screenshots' => [
                    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=380&fit=crop',
                    'https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=600&h=380&fit=crop',
                ],
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

            foreach ($item['screenshots'] as $image) {
                $project->addMediaFromUrl($image)
                    ->toMediaCollection('project_screenshots');
            }
        }
    }
}
