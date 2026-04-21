<?php

namespace App\DataTables;

use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Permission;

class PermissionDataTable extends BaseDataTable
{
    protected string $dataKey = 'permissions';

    protected function query(): Builder
    {
        return Permission::select('id', 'name', 'guard_name', 'created_at');
    }

    protected function searchableColumns(): array
    {
        return ['name'];
    }

    protected function filterableColumns(): array
    {
        return ['name', 'guard_name'];
    }

    protected function filterHandlers(): array
    {
        return [
            'name' => fn ($q, $v) => $q->where('name', 'like', "%$v%"),
        ];
    }

    protected function transform($permission): array
    {
        return [
            'id' => $permission->id,
            'name' => $permission->name,
            'guard_name' => $permission->guard_name,
            'created_at' => $permission->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
