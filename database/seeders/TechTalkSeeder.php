<?php

namespace Database\Seeders;

use App\Models\TechTalk;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TechTalkSeeder extends Seeder
{
    public function run()
    {
        TechTalk::truncate();

        $techTalks = [
            [
                'number' => 1,
                'category' => 'Finding',
                'category_color' => '#6366f1', // clean color instead of tailwind class
                'title' => 'Why Your Laravel Queries Are Slow (And How to Fix Them)',
                'excerpt' => 'Discovered a bottleneck that dropped response times from 2s to 80ms. Here\'s the exact technique.',
                'date' => '2025-03-01',
                'read_time' => '5 min',
            ],
            [
                'number' => 2,
                'category' => 'Tips',
                'category_color' => '#ec4899',
                'title' => 'React Hooks: Building Custom Hooks for Production',
                'excerpt' => 'A practical guide to reusable custom hooks that make your React code cleaner and more maintainable.',
                'date' => '2025-02-01',
                'read_time' => '8 min',
            ],
            [
                'number' => 3,
                'category' => 'Deep Dive',
                'category_color' => '#a855f7',
                'title' => 'Understanding Laravel Queues in Production',
                'excerpt' => 'Complete guide to job chaining, batching, rate limiting, and failure handling in Laravel.',
                'date' => '2025-01-01',
                'read_time' => '12 min',
            ],
        ];

        foreach ($techTalks as $index => $item) {

            TechTalk::create([
                'number' => $item['number'],
                'sort_order' => $index + 1,

                'category' => $item['category'],
                'category_color' => $item['category_color'],

                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'excerpt' => $item['excerpt'],
                'content' => $this->generateContent($item['title']), // optional

                'date' => Carbon::parse($item['date']),
                'read_time' => $item['read_time'],

                'cover_image' => null,
                'video_link' => null,
                'source_link' => null,

                'is_published' => true,
            ]);
        }
    }

    private function generateContent($title): string
    {
        return "## {$title}\n\nThis is a detailed explanation of {$title}. You can expand this with real technical content including examples, code snippets, and production insights.";
    }
}
