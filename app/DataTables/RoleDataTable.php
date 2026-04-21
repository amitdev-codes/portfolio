<?php

namespace App\DataTables;

use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Role;

class RoleDataTable extends BaseDataTable
{
    protected string $dataKey = 'roles';

    protected function query(): Builder
    {
        return Role::select('id', 'name', 'created_at');
    }

    protected function searchableColumns(): array
    {
        return ['name'];
    }

    protected function filterableColumns(): array
    {
        return ['name'];
    }

    protected function filterHandlers(): array
    {
        return [
            'name' => fn ($q, $v) => $q->where('name', 'like', "%$v%"),
        ];
    }

    protected function transform($role): array
    {
        return [
            'id' => $role->id,
            'name' => $role->name,
            'created_at' => $role->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
