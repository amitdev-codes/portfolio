<?php

namespace App\DataTables;

use App\Models\AboutInformation;
use Illuminate\Database\Eloquent\Builder;

class AboutInformationDataTable extends BaseDataTable
{
    protected string $dataKey = 'AboutInformation';

    protected function query(): Builder
    {
        return AboutInformation::select([
            'id',
            'section_label',
            'heading_main',
            'heading_highlight',
            'highlights',
            'experience_heading',
            'experiences',
            'tech_stack_label',
            'tech_stack',
            'is_active',
            'created_at',
        ]);
    }

    protected function searchableColumns(): array
    {
        return ['section_label', 'heading_main', 'heading_highlight', 'experience_heading'];
    }

    protected function filterableColumns(): array
    {
        return ['is_active'];
    }

    protected function filterHandlers(): array
    {
        return ['is_active'];
    }

    protected function transform($aboutInformation): array
    {
        return [
            'id' => $aboutInformation->id,
            'section_label' => $aboutInformation->section_label,
            'heading' => trim(
                ($aboutInformation->heading_main ?? '').' '.($aboutInformation->heading_highlight ?? '')
            ),
            'experience_heading' => $aboutInformation->experience_heading,
            'highlights_count' => count($aboutInformation->highlights ?? []),
            'experiences_count' => count($aboutInformation->experiences ?? []),
            'tech_stack_count' => count($aboutInformation->tech_stack ?? []),
            'is_active' => $aboutInformation->is_active,
            'created_at' => $aboutInformation->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
