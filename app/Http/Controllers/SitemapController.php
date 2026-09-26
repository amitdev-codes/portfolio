<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\TechTalk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    public function index(Request $request)
    {
        $baseUrl = URL::to('/');

        $urls = [
            [
                'loc' => $baseUrl,
                'lastmod' => now()->toDateString(),
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
        ];

        // Add tech talks
        $techTalks = TechTalk::published()->ordered()->get();
        foreach ($techTalks as $talk) {
            $urls[] = [
                'loc' => $baseUrl . '/tech-talk-details/' . $talk->slug,
                'lastmod' => $talk->date ? $talk->date->toDateString() : now()->toDateString(),
                'changefreq' => 'monthly',
                'priority' => '0.8',
            ];
        }

        // Add projects
        $projects = Project::orderBy('sort_order', 'asc')->get();
        foreach ($projects as $project) {
            $urls[] = [
                'loc' => $baseUrl . '#projects',
                'lastmod' => now()->toDateString(),
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url['loc']) . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '<changefreq>' . $url['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }
}
