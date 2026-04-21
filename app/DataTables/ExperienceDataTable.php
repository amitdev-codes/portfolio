<?php

namespace App\DataTables;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

class ExperienceDataTable extends BaseDataTable
{
    protected string $dataKey = 'experiences';

    protected function query(): QueryBuilder
    {
        return Experience::select([
            'id', 'role', 'company', 'description',
            'start_date', 'end_date', 'is_current', 'company_logo', 'company_website', 'sort_order',
            'created_at',
        ]);
    }

    protected function searchableColumns(): array
    {
        return ['role', 'company', 'description'];
    }

    protected function filterableColumns(): array
    {
        return ['role', 'company', 'description'];
    }

    protected function filterHandlers(): array
    {
        return ['role', 'company', 'description'];
    }

    protected function transform($Experience): array
    {
        return [
            'id' => $Experience->id,
            'role' => $Experience->role,
            'company' => $Experience->company,
            'description' => $Experience->description,
            'start_date' => $Experience->start_date,
            'end_date' => $Experience->end_date,
            'is_current' => $Experience->is_current,
            'company_logo' => $Experience->company_logo,
            'company_website' => $Experience->company_website,
            'sort_order' => $Experience->sort_order,
            'created_at' => $Experience->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
