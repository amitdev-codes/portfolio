<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechTalkResource;
use App\Models\TechTalk;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;

class TechTalkDetailController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $techTalks = TechTalk::published()->ordered()->get();

        return TechTalkResource::collection($techTalks);
    }

    // GET /api/tech-talks/{techTalk:slug} -> used by the future detail page
    public function show(TechTalk $techTalk)
    {
        abort_unless($techTalk->is_published, 404);

        $techTalk->load(['codeExamples', 'screenshots']);
        
        // Prepare SEO data
        $seoTitle = $techTalk->seo_title ?: $techTalk->title . ' | Amit Kumar Dev';
        $seoDescription = $techTalk->seo_metatags ?: $techTalk->excerpt ?: 'Read ' . $techTalk->title . ' by Amit Kumar - Tech talks and presentations on software development.';
        $seoImage = $techTalk->cover_image ?: asset('images/og-default.png');
        $seoUrl = request()->fullUrl();
        $seoKeywords = $techTalk->category ? $techTalk->category . ', ' . $techTalk->title . ', Tech Talk, Amit Kumar' : 'Tech Talk, Amit Kumar, Software Development';

        return Inertia::render('landing/TechTalkDetail', [
            'techTalk' => [
                'id' => $techTalk->id,
                'number' => str_pad((string) $techTalk->number, 2, '0', STR_PAD_LEFT),
                'slug' => $techTalk->slug,
                'category' => $techTalk->category,
                'categoryColor' => $techTalk->category_color,
                'title' => $techTalk->title,
                'excerpt' => $techTalk->excerpt,
                'content' => $techTalk->content,
                'date' => $techTalk->date?->format('M Y'),
                'readTime' => $techTalk->read_time,
                'coverImage' => $techTalk->cover_image,
                'videoLink' => $techTalk->video_link,
                'sourceLink' => $techTalk->source_link,
                'authorName' => $techTalk->author_name,
                'codeExamples' => $techTalk->codeExamples->map(fn ($example) => [
                    'id' => $example->id,
                    'title' => $example->title,
                    'language' => $example->language,
                    'code' => $example->code,
                    'explanation' => $example->explanation,
                ]),
                'screenshots' => $techTalk->screenshots->map(fn ($shot) => [
                    'id' => $shot->id,
                    'url' => $shot->url,
                    'caption' => $shot->caption,
                ]),
            ],
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'image' => $seoImage,
                'url' => $seoUrl,
                'type' => 'article',
                'keywords' => $seoKeywords,
                'twitter_card' => 'summary_large_image',
                'robots' => 'index, follow',
                'canonical' => $seoUrl,
            ],
        ]);
    }
}
