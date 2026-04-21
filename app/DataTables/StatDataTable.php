<?php

namespace App\DataTables;

use App\Models\Stat;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;


class StatDataTable extends BaseDataTable
{
    protected string $dataKey = 'stats';

    protected function query(): QueryBuilder
    {
        return Stat::select([
            'id', 'value', 'label', 'icon', 'sort_order', 'created_at',
        ]);
    }

    protected function searchableColumns(): array
    {
        return ['label'];
    }

    protected function filterableColumns(): array
    {
        return ['label'];
    }

    protected function filterHandlers(): array
    {
        return ['label'];
    }

    protected function transform($Stat): array
    {
        return [
            'id' => $Stat->id,
            'value' => $Stat->value,
            'label' => $Stat->label,
            'icon' => $Stat->icon,
            'sort_order' => $Stat->sort_order,
            'created_at' => $Stat->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
