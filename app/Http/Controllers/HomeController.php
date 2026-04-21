<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function landing(Request $request)
    {
        $projects = Project::with('media')
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($project) {
                // STEP 1: Always get cover image FIRST (highest priority)
                $coverImage = $project->getMedia('project_cover')->first();

                // STEP 2: Get ALL screenshots
                $screenshots = $project->getMedia('project_screenshots');

                // STEP 3: Build array - COVER FIRST, then screenshots
                $images = [];

                // Always add cover image first (if exists)
                if ($coverImage) {
                    $images[] = $coverImage->getUrl();
                }

                // Add all screenshots after cover
                $screenshots->each(function ($media) use (&$images) {
                    $images[] = $media->getUrl();
                });

                // Fallback: if no cover or screenshots, use any default image
                if (empty($images)) {
                    $defaultImage = $project->getFirstMedia('default_images');
                    if ($defaultImage) {
                        $images[] = $defaultImage->getUrl();
                    }
                }

                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'short_description' => Str::limit($project->short_description, 120),
                    'full_description' => $project->full_description,
                    'color' => $project->color ?? '#3b82f6',
                    'tech' => $project->tech? : [],
                    'link' => $project->link ?? '#',
                    'images' => $images, // ✅ COVER FIRST, then screenshots
                    'image_count' => count($images),
                    'has_cover' => !empty($coverImage),
                ];
            });

        return Inertia::render('landing/LandingPage', [
            'projects' => $projects
        ]);
    }

}
