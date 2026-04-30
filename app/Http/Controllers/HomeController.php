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
                $coverImage = $project->getMedia('cover_image')->first();
                $screenshots = $project->getMedia('project_screenshots');
                $images = [];
                if ($coverImage) {
                    $images[] = asset('images/'.$coverImage->file_name);
                }

                // Then all screenshots
                $screenshots->each(function ($media) use (&$images) {
                    $images[] = asset('images/'.$media->file_name);
                });

                // Fallback if no images
                if (empty($images)) {
                    $defaultImage = $project->getFirstMedia('default_images');
                    if ($defaultImage) {
                        $images[] = asset('images/'.$defaultImage->file_name);
                    }
                }

                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'short_description' => Str::limit($project->short_description, 120),
                    'full_description' => $project->full_description,
                    'color' => $project->color ?? '#3b82f6',
                    'tech' => $project->tech ?: [],
                    'link' => $project->link ?? '#',
                    'images' => $images, // ✅ COVER FIRST, then screenshots
                    'image_count' => count($images),
                    'has_cover' => ! empty($coverImage),
                ];
            });

        return Inertia::render('landing/LandingPage', [
            'projects' => $projects,
        ]);
    }
}
