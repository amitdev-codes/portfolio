<?php

namespace App\Listeners;

use App\Events\VisitorVisited;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\VisitorAnalytics;
use Illuminate\Support\Carbon;

class TrackVisitorVisit
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(VisitorVisited $event): void
    {
        // Try to find existing visitor by IP address
        $visitor = VisitorAnalytics::where('ip_address', $event->ipAddress)->first();

        if ($visitor) {
            // Update existing visitor: increment count and update timestamp
            $visitor->increment('total_visited');
            $visitor->update([
                'last_visited_at' => now(),
                // Update other fields that might have changed
                'user_agent' => $event->userAgent,
                'referrer' => $event->referrer,
                'page_url' => $event->pageUrl,
                'latitude' => $event->latitude,
                'longitude' => $event->longitude,
                'city' => $event->city,
                'country' => $event->country,
            ]);
        } else {
            // Create new visitor record
            VisitorAnalytics::create([
                'ip_address' => $event->ipAddress,
                'user_agent' => $event->userAgent,
                'referrer' => $event->referrer,
                'page_url' => $event->pageUrl,
                'latitude' => $event->latitude,
                'longitude' => $event->longitude,
                'city' => $event->city,
                'country' => $event->country,
                'total_visited' => 1,
                'last_visited_at' => now(),
            ]);
        }
    }
}
