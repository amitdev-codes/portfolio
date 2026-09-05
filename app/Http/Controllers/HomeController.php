<?php

namespace App\Http\Controllers;

use App\Models\AboutInformation;
use App\Models\PortfolioInformation;
use App\Models\Project;
use App\Models\TechTalk;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function landing(Request $request)
    {
        $portfolio = PortfolioInformation::where('is_active', true)->first();

        $hero = $portfolio ? (function () use ($portfolio) {
            $cvMedia = $portfolio->getFirstMedia('cv_documents');
            $cvUrl = $cvMedia ? $cvMedia->getUrl() : ($portfolio->cv_link ?: null);
            $cvExtension = $cvMedia
                ? strtolower($cvMedia->extension)
                : (($portfolio->cv_link && pathinfo($portfolio->cv_link, PATHINFO_EXTENSION))
                    ? strtolower(pathinfo($portfolio->cv_link, PATHINFO_EXTENSION))
                    : null);

            return [
                'name' => [
                    'first' => $portfolio->first_name,
                    'middle' => $portfolio->middle_name,
                    'last' => $portfolio->last_name,
                ],
                'role_title' => $portfolio->role_title,
                'tagline' => $portfolio->small_description,
                'location' => $portfolio->short_location,
                'tech_stack' => $portfolio->tech_stack,
                'is_available' => $portfolio->is_available,
                'availability_text' => $portfolio->availability_text ?? 'Available for work',
                'stats' => $portfolio->stats ?? [],
                'skills' => $portfolio->skills ?? [],
                'profile_image' => $portfolio->getFirstMediaUrl('profile_images') ?: null,
                'cover_image' => $portfolio->getFirstMediaUrl('cover_images') ?: null,
                'links' => [
                    'github' => $portfolio->github_link,
                    'linkedin' => $portfolio->linkedin_link,
                    'email' => $portfolio->email,
                    'phone' => $portfolio->phone_number ?: $portfolio->mobile_number,
                    'cv' => $cvUrl,
                    'cv_type' => $cvExtension, // 'pdf' | 'doc' | 'docx' | null
                ],
            ];
        })() : null;

        $aboutInfo = AboutInformation::where('is_active', true)->first();
        $about = $aboutInfo ? [
            'section_label' => $aboutInfo->section_label,
            'heading_main' => $aboutInfo->heading_main,
            'heading_highlight' => $aboutInfo->heading_highlight,
            'highlights' => $aboutInfo->highlights,        // array cast
            'experience_heading' => $aboutInfo->experience_heading,
            'experiences' => $aboutInfo->experiences,       // array cast
            'tech_stack_label' => $aboutInfo->tech_stack_label,
            'tech_stack' => $aboutInfo->tech_stack,        // array cast
        ] : null;

        $projects = Project::with('media')
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($project) {
                $coverImage = $project->getMedia('cover_image')->first();
                $screenshots = $project->getMedia('project_screenshots');
                $images = [];

                if ($coverImage) {
                    $images[] = $coverImage->getUrl();
                }
                $screenshots->each(function ($media) use (&$images) {
                    $images[] = $media->getUrl();
                });
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
                    'tech' => $project->tech ?: [],
                    'link' => $project->link ?? '#',
                    'images' => $images,
                    'image_count' => count($images),
                    'has_cover' => ! empty($coverImage),
                ];
            });

        $techTalks = TechTalk::published()
            ->ordered()
            ->get()
            ->map(function ($talk) {
                return [
                    'id' => $talk->id,
                    'number' => str_pad((string) $talk->number, 2, '0', STR_PAD_LEFT), // 1 -> "01"
                    'slug' => $talk->slug,
                    'category' => $talk->category,
                    'categoryColor' => $talk->category_color, // hex, e.g. "#6366f1"
                    'title' => $talk->title,
                    'excerpt' => $talk->excerpt,
                    'date' => $talk->date?->format('M Y'), // "Mar 2025"
                    'readTime' => $talk->read_time,
                ];
            });

        return Inertia::render('landing/LandingPage', [
            'hero' => $hero,
            'projects' => $projects,
            'about' => $about,
            'techTalks' => $techTalks,
        ]);
    }
}
