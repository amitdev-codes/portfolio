<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#4f46e5">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = localStorage.getItem('appearance') || '{{ $appearance ?? "system" }}';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark);

                document.documentElement.classList.toggle('dark', isDark);
                document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(0.965 0.004 285);
            }
            html.dark {
                background-color: oklch(0.2 0.03 280);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
        <link rel="icon" href="/images/profileimage.png" type="image/png" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

        @php
            $seoTitle = $page['props']['seo']['title'] ?? config('app.name', 'Amit Kumar Dev');
            $seoDescription = $page['props']['seo']['description'] ?? 'Amit Kumar - Full Stack Developer. Building scalable web applications with Laravel, React, and modern technologies.';
            $seoImage = $page['props']['seo']['image'] ?? asset('images/og-default.png');
            $seoUrl = $page['props']['seo']['url'] ?? request()->fullUrl();
            $seoType = $page['props']['seo']['type'] ?? 'website';
            $seoTwitterCard = $page['props']['seo']['twitter_card'] ?? 'summary_large_image';
            $seoRobots = $page['props']['seo']['robots'] ?? 'index, follow';
            $canonicalUrl = $page['props']['seo']['canonical'] ?? request()->fullUrl();
        @endphp

        {{-- SEO Meta Tags --}}
        <title>{{ $seoTitle }}</title>
        <meta name="description" content="{{ $seoDescription }}">
        <meta name="keywords" content="{{ $page['props']['seo']['keywords'] ?? 'Amit Kumar, Full Stack Developer, Laravel, React, PHP, JavaScript, Web Development' }}">
        <meta name="author" content="Amit Kumar">
        <meta name="robots" content="{{ $seoRobots }}">
        <link rel="canonical" href="{{ $canonicalUrl }}">

        {{-- Open Graph / Facebook --}}
        <meta property="og:type" content="{{ $seoType }}">
        <meta property="og:url" content="{{ $seoUrl }}">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta property="og:image" content="{{ $seoImage }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="{{ config('app.name', 'Amit Kumar Dev') }}">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="{{ $seoTwitterCard }}">
        <meta name="twitter:url" content="{{ $seoUrl }}">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
        <meta name="twitter:image" content="{{ $seoImage }}">

        {{-- Additional SEO --}}
        <meta name="googlebot" content="index, follow">
        <meta name="bingbot" content="index, follow">

        <x-inertia::head>
            <title>{{ config('app.name', 'Amit Kumar Dev') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
