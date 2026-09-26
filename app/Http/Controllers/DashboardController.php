<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
//        dd('tests');
        // Get visitor analytics with deduplication
        $visits = VisitorAnalytics::sum('total_visited');
        $todayVisits = VisitorAnalytics::whereDate('last_visited_at', today())->count();
        $weekVisits = VisitorAnalytics::whereDate('last_visited_at', '>=', now()->subWeek())->count();

        // Get top countries (sum of total_visited per country, last 30 days)
        $topCountries = VisitorAnalytics::select('country', DB::raw('sum(total_visited) as count'))
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->whereDate('last_visited_at', '>=', now()->subMonth())
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'country' => $item->country,
                    'count' => (int) $item->count,
                ];
            })->toArray();

        // Get content stats
        $projectsCount = Project::count();
        $techTalksCount = TechTalk::count();
        $publishedTechTalksCount = TechTalk::where('is_published', true)->count();

        return inertia('dashboard', [
            'visits' => $visits,
            'todayVisits' => $todayVisits,
            'weekVisits' => $weekVisits,
            'topCountries' => $topCountries,
            'projectsCount' => $projectsCount,
            'techTalksCount' => $techTalksCount,
            'publishedTechTalksCount' => $publishedTechTalksCount,
        ]);
    }
}
