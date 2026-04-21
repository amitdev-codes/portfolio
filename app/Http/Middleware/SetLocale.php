<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = session('app_locale', config('app.locale'));

        // Check if locale files exist, else default to 'en'
        if (! in_array($locale, ['en', 'np']) || ! File::exists(resource_path("lang/{$locale}"))) {
            $locale = 'en';
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
