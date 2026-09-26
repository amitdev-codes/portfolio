<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\PortfolioInformation;
use App\Models\Project;
use App\Models\Stat;
use App\Models\TechTalk;
use App\Models\VisitorAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Inertia\Response|ResponseFactory
     */
    public function index(Request $request)
    {
        $visits = (int) VisitorAnalytics::sum('total_visited');
        $uniqueVisitors = VisitorAnalytics::count();
        $todayVisits = VisitorAnalytics::whereDate('last_visited_at', today())->count();
        $weekVisits = VisitorAnalytics::whereDate('last_visited_at', '>=', now()->subWeek())->count();
        $monthVisits = VisitorAnalytics::whereDate('last_visited_at', '>=', now()->subMonth())->count();
        $olderVisits = max(0, $uniqueVisitors - $monthVisits);

        $topCountries = VisitorAnalytics::select('country', DB::raw('sum(total_visited) as count'))
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->whereDate('last_visited_at', '>=', now()->subMonth())
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(6)
            ->get()
            ->map(fn ($item) => [
                'name' => $item->country,
                'value' => (int) $item->count,
            ])
            ->values()
            ->toArray();

        $projectsCount = Project::count();
        $featuredProjectsCount = Project::where('is_featured', true)->count();
        $techTalksCount = TechTalk::count();
        $publishedTechTalksCount = TechTalk::where('is_published', true)->count();
        $experiencesCount = Experience::count();
        $statsCount = Stat::count();

        $portfolio = PortfolioInformation::query()->latest()->first();
        $skills = collect($portfolio?->skills ?? [])
            ->filter()
            ->values();

        $techUsage = Project::query()
            ->whereNotNull('tech')
            ->pluck('tech')
            ->flatten()
            ->filter()
            ->countBy()
            ->sortDesc()
            ->take(8)
            ->map(fn ($count, $name) => [
                'name' => (string) $name,
                'value' => (int) $count,
            ])
            ->values()
            ->toArray();

        $skillsChart = $skills
            ->map(fn ($skill) => [
                'name' => (string) $skill,
                'value' => 1,
            ])
            ->values()
            ->toArray();

        if ($skillsChart === [] && $techUsage !== []) {
            $skillsChart = $techUsage;
        }

        return inertia('dashboard', [
            'visits' => $visits,
            'todayVisits' => $todayVisits,
            'weekVisits' => $weekVisits,
            'monthVisits' => $monthVisits,
            'topCountries' => $topCountries,
            'projectsCount' => $projectsCount,
            'featuredProjectsCount' => $featuredProjectsCount,
            'techTalksCount' => $techTalksCount,
            'publishedTechTalksCount' => $publishedTechTalksCount,
            'experiencesCount' => $experiencesCount,
            'statsCount' => $statsCount,
            'charts' => [
                'contentOverview' => [
                    ['name' => 'Projects', 'value' => $projectsCount],
                    ['name' => 'Tech Talks', 'value' => $techTalksCount],
                    ['name' => 'Experiences', 'value' => $experiencesCount],
                    ['name' => 'Stats', 'value' => $statsCount],
                ],
                'projects' => [
                    ['name' => 'Featured', 'value' => $featuredProjectsCount],
                    ['name' => 'Regular', 'value' => max(0, $projectsCount - $featuredProjectsCount)],
                ],
                'techTalks' => [
                    ['name' => 'Published', 'value' => $publishedTechTalksCount],
                    ['name' => 'Draft', 'value' => max(0, $techTalksCount - $publishedTechTalksCount)],
                ],
                'visitors' => [
                    ['name' => 'Today', 'value' => $todayVisits],
                    ['name' => 'This Week', 'value' => max(0, $weekVisits - $todayVisits)],
                    ['name' => 'This Month', 'value' => max(0, $monthVisits - $weekVisits)],
                    ['name' => 'Older', 'value' => $olderVisits],
                ],
                'skills' => $skillsChart,
                'techStack' => $techUsage,
                'countries' => $topCountries,
            ],
        ]);
    }
}
