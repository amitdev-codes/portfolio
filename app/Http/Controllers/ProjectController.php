<?php

namespace App\Http\Controllers;

use App\DataTables\ProjectDataTable;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('projects/Index', (new ProjectDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('projects/ProjectForm');
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        $project = Project::create($data);

        // Cover Image
        if ($request->hasFile('cover_image')) {
            $project
                ->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image');
        }

        // Screenshots
        if ($request->hasFile('screenshots')) {
            foreach ($request->file('screenshots') as $file) {
                $project
                    ->addMedia($file)
                    ->toMediaCollection('project_screenshots');
            }
        }

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project Information created successfully.');
    }

    public function show(Project $project)
    {
        return view('admin.projects.show', compact('project'));
    }

    public function edit(Project $project)
    {
        $project->load('media');

        return Inertia::render('projects/ProjectForm', [
            'project' => [
                ...$project->toArray(),

                // Cover image (single)
                'cover_image' => optional($project->getFirstMedia('cover_image'))->getUrl(),

                // Screenshots (multiple)
                'screenshots' => $project
                    ->getMedia('project_screenshots')
                    ->map(fn ($media) => [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                    ])
                    ->values(),
            ],
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $project->update($data);

        // Replace cover image
        if ($request->hasFile('cover_image')) {
            $project->clearMediaCollection('cover_image');

            $project
                ->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image');
        }

        // Replace screenshots (optional strategy)
        if ($request->hasFile('screenshots')) {
            $project->clearMediaCollection('project_screenshots');

            foreach ($request->file('screenshots') as $file) {
                $project
                    ->addMedia($file)
                    ->toMediaCollection('project_screenshots');
            }
        }

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project Information updated successfully.');


    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
