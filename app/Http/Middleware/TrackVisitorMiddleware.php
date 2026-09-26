<?php

namespace App\Http\Middleware;

use App\Events\VisitorVisited;
use Closure;
use Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closest(Request)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get visitor IP address
        $ipAddress = $request->ip();

        // For testing, you might want to use a specific IP
        // $ipAddress = '8.8.8.8';

        // Get user agent
        $userAgent = $request->header('User-Agent', '');

        // Get referrer
        $referrer = $request->header('referer', '');

        // Get current page URL
        $pageUrl = $request->fullUrl();

        // Initialize geolocation data
        $latitude = null;
        $longitude = null;
        $city = '';
        $country = '';

        // Try to get geolocation data from IP address (skip for localhost/reserved IPs in development)
        if ($ipAddress && ! $this->isLocalOrReservedIp($ipAddress)) {
            try {
                $response = Http::timeout(3)->get("https://ipinfo.io/{$ipAddress}/json");

                if ($response->successful()) {
                    $data = $response->json();
                    // ipinfo.io returns loc as "lat,lng"
                    if (! empty($data['loc'])) {
                        $loc = explode(',', $data['loc']);
                        $latitude = $loc[0] ?? null;
                        $longitude = $loc[1] ?? null;
                    }
                    $city = $data['city'] ?? '';
                    $country = $data['country'] ?? '';
                }
            } catch (\Exception $e) {
                // Log the error but don't break the request
                Log::warning('Failed to get geolocation for IP '.$ipAddress, ['error' => $e->getMessage()]);
            }
        }

        // Fire the event to store visitor data
        Event::dispatch(new VisitorVisited(
            ipAddress: $ipAddress,
            userAgent: $userAgent,
            referrer: $referrer,
            pageUrl: $pageUrl,
            latitude: $latitude,
            longitude: $longitude,
            city: $city,
            country: $country
        ));
        // dd('hello');

        return $next($request);
    }

    /**
     * Check if IP address is local/reserved (for development/testing)
     */
    protected function isLocalOrReservedIp(string $ipAddress): bool
    {
        // Localhost and private IP ranges
        $localIps = [
            '127.0.0.1',
            '::1',
            '0.0.0.0',
        ];

        if (in_array($ipAddress, $localIps)) {
            return true;
        }

        // Check for private IP ranges
        if (preg_match('/^10\./', $ipAddress) ||
            preg_match('/^172\.(1[6-9]|2[0-9]|3[0-1])\./', $ipAddress) ||
            preg_match('/^192\.168\./', $ipAddress) ||
            preg_match('/^169\.254\./', $ipAddress)) {
            return true;
        }

        return false;
    }
}
