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
        TechTalk::query()->delete(); // use delete() instead of truncate() so FK cascades apply cleanly

        $techTalks = [
            [
                'number' => 1,
                'category' => 'Finding',
                'category_color' => '#6366f1',
                'title' => 'Why Your Laravel Queries Are Slow (And How to Fix Them)',
                'excerpt' => 'Discovered a bottleneck that dropped response times from 2s to 80ms. Here\'s the exact technique.',
                'date' => '2025-03-01',
                'read_time' => '5 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => 'https://www.youtube.com/watch?v=example1',
                'code_examples' => [
                    [
                        'title' => 'Before: N+1 query',
                        'language' => 'php',
                        'code' => "\$posts = Post::all();\nforeach (\$posts as \$post) {\n    echo \$post->author->name;\n}",
                        'explanation' => 'This fires one query per post to fetch the author.',
                    ],
                    [
                        'title' => 'After: eager loading',
                        'language' => 'php',
                        'code' => "\$posts = Post::with('author')->get();\nforeach (\$posts as \$post) {\n    echo \$post->author->name;\n}",
                        'explanation' => 'A single extra query loads all authors up front.',
                    ],
                ],
                'screenshots' => [
                    ['image_path' => 'tech-talks/laravel-queries/before.png', 'caption' => 'Query log before fix'],
                    ['image_path' => 'tech-talks/laravel-queries/after.png', 'caption' => 'Query log after fix'],
                ],
            ],
            [
                'number' => 2,
                'category' => 'Tips',
                'category_color' => '#ec4899',
                'title' => 'React Hooks: Building Custom Hooks for Production',
                'excerpt' => 'A practical guide to reusable custom hooks that make your React code cleaner and more maintainable.',
                'date' => '2025-02-01',
                'read_time' => '8 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => null,
                'code_examples' => [
                    [
                        'title' => 'useDebounce hook',
                        'language' => 'tsx',
                        'code' => "function useDebounce<T>(value: T, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}",
                        'explanation' => 'Reusable across search inputs, filters, and autosave.',
                    ],
                ],
                'screenshots' => [],
            ],
            [
                'number' => 3,
                'category' => 'Deep Dive',
                'category_color' => '#a855f7',
                'title' => 'Understanding Laravel Queues in Production',
                'excerpt' => 'Complete guide to job chaining, batching, rate limiting, and failure handling in Laravel.',
                'date' => '2025-01-01',
                'read_time' => '12 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => 'https://www.youtube.com/watch?v=example3',
                'code_examples' => [
                    [
                        'title' => 'Job chaining',
                        'language' => 'php',
                        'code' => "Bus::chain([\n    new ProcessPodcast(\$podcast),\n    new OptimizePodcast(\$podcast),\n    new ReleasePodcast(\$podcast),\n])->dispatch();",
                        'explanation' => 'Each job only runs if the previous one succeeds.',
                    ],
                ],
                'screenshots' => [
                    ['image_path' => 'tech-talks/laravel-queues/horizon-dashboard.png', 'caption' => 'Horizon dashboard under load'],
                ],
            ],
            [
                'number' => 4,
                'category' => 'Tips',
                'category_color' => '#ec4899',
                'title' => 'Debugging N+1 Queries with Laravel Telescope',
                'excerpt' => 'A step by step walkthrough of catching N+1 problems before they hit production.',
                'date' => '2024-12-01',
                'read_time' => '6 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => null,
                'code_examples' => [
                    [
                        'title' => 'Enabling query watching',
                        'language' => 'php',
                        'code' => "Telescope::filter(function (IncomingEntry \$entry) {\n    return \$entry->type === 'query';\n});",
                        'explanation' => 'Narrows Telescope down to just query entries while debugging.',
                    ],
                ],
                'screenshots' => [
                    ['image_path' => 'tech-talks/telescope/query-list.png', 'caption' => 'Telescope query list flagging duplicates'],
                ],
            ],
            [
                'number' => 5,
                'category' => 'Deep Dive',
                'category_color' => '#a855f7',
                'title' => 'TypeScript Generics That Actually Help',
                'excerpt' => 'Cutting through the noise: the handful of generic patterns worth knowing.',
                'date' => '2024-11-01',
                'read_time' => '7 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => null,
                'code_examples' => [
                    [
                        'title' => 'A reusable API response type',
                        'language' => 'ts',
                        'code' => "type ApiResponse<T> = {\n  data: T;\n  meta: { page: number; total: number };\n};",
                        'explanation' => 'One generic type covers every paginated endpoint in the app.',
                    ],
                ],
                'screenshots' => [],
            ],
            [
                'number' => 6,
                'category' => 'Finding',
                'category_color' => '#6366f1',
                'title' => 'Caching Strategies for Laravel APIs',
                'excerpt' => 'Redis, response caching, and cache invalidation patterns that held up under load.',
                'date' => '2024-10-01',
                'read_time' => '9 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => 'https://www.youtube.com/watch?v=example6',
                'code_examples' => [
                    [
                        'title' => 'Tagged cache invalidation',
                        'language' => 'php',
                        'code' => "Cache::tags(['products'])->put(\"product.{\$id}\", \$product, 3600);\n\n// on update\nCache::tags(['products'])->flush();",
                        'explanation' => 'Tags let you invalidate a whole group of related keys at once.',
                    ],
                ],
                'screenshots' => [
                    ['image_path' => 'tech-talks/caching/redis-hit-rate.png', 'caption' => 'Cache hit rate before/after tagging'],
                ],
            ],
            [
                'number' => 7,
                'category' => 'Tips',
                'category_color' => '#ec4899',
                'title' => 'Writing Tests That Actually Catch Bugs',
                'excerpt' => 'Moving past coverage percentages toward tests that fail for the right reasons.',
                'date' => '2024-09-01',
                'read_time' => '6 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => null,
                'code_examples' => [
                    [
                        'title' => 'Testing the behavior, not the implementation',
                        'language' => 'php',
                        'code' => "it('refunds the full order amount', function () {\n    \$order = Order::factory()->paid()->create(['total' => 5000]);\n\n    \$order->refund();\n\n    expect(\$order->fresh()->refunded_amount)->toBe(5000);\n});",
                        'explanation' => 'Asserts on the outcome a user cares about, not internal method calls.',
                    ],
                ],
                'screenshots' => [],
            ],
            [
                'number' => 8,
                'category' => 'Deep Dive',
                'category_color' => '#a855f7',
                'title' => 'Designing a Multi-Tenant Laravel App',
                'excerpt' => 'Database-per-tenant vs shared schema, and how we decided which one to ship.',
                'date' => '2024-08-01',
                'read_time' => '11 min',
                'author_name' => 'Amit Kumar dev',
                'video_link' => 'https://www.youtube.com/watch?v=example8',
                'code_examples' => [
                    [
                        'title' => 'Resolving tenant from subdomain',
                        'language' => 'php',
                        'code' => "\$tenant = Tenant::where('subdomain', \$request->getHost())->firstOrFail();\napp()->instance('currentTenant', \$tenant);",
                        'explanation' => 'Middleware resolves and binds the tenant before any query runs.',
                    ],
                ],
                'screenshots' => [
                    ['image_path' => 'tech-talks/multi-tenant/architecture-diagram.png', 'caption' => 'Tenant resolution flow'],
                ],
            ],
        ];

        foreach ($techTalks as $index => $item) {
            $techTalk = TechTalk::create([
                'number' => $item['number'],
                'sort_order' => $index + 1,
                'category' => $item['category'],
                'category_color' => $item['category_color'],
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'excerpt' => $item['excerpt'],
                'content' => $this->generateContent($item['title']),
                'date' => Carbon::parse($item['date']),
                'read_time' => $item['read_time'],
                'cover_image' => null,
                'video_link' => $item['video_link'],
                'source_link' => null,
                'author_name' => $item['author_name'],
                'is_published' => true,
            ]);

            foreach ($item['code_examples'] as $i => $example) {
                $techTalk->codeExamples()->create([
                    ...$example,
                    'sort_order' => $i,
                ]);
            }

            foreach ($item['screenshots'] as $i => $screenshot) {
                $techTalk->screenshots()->create([
                    ...$screenshot,
                    'sort_order' => $i,
                ]);
            }
        }
    }

    private function generateContent($title): string
    {
        return "## {$title}\n\nThis is a detailed explanation of {$title}. You can expand this with real technical content including examples, code snippets, and production insights.";
    }
}
