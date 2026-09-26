<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\VisitorVisited;
use App\Listeners\TrackVisitorVisit;

class VisitorAnalyticsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        \Event::listen(
            VisitorVisited::class,
            TrackVisitorVisit::class
        );
    }
}
