<?php

namespace App\DataTables;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;

class ProjectDataTable extends BaseDataTable
{
    protected string $dataKey = 'projects';

    protected function query(): Builder
    {
        return Project::select([
            'id', 'title', 'short_description', 'full_description', 'color', 'emoji', 'tech', 'accent',
            'link', 'sort_order', 'is_featured',
            'created_at',
        ]);
    }

    protected function searchableColumns(): array
    {
        return ['title'];
    }

    protected function filterableColumns(): array
    {
        return ['title'];
    }

    protected function filterHandlers(): array
    {
        return ['title'];
    }

    protected function transform($project): array
    {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'short_description' => $project->short_description,
            'full_description' => $project->full_description,
            'color' => $project->color,
            'emoji' => $project->emoji,
            'tech' => $project->tech,
            'accent' => $project->accent,
            'link' => $project->link,
            'sort_order' => $project->sort_order,
            'slug' => $project->slug,
            'is_featured' => $project->is_featured,
            'created_at' => $project->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
