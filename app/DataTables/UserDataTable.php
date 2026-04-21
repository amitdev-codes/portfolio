<?php

namespace App\DataTables;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Role;

class UserDataTable extends BaseDataTable
{
    protected string $dataKey = 'users';

    protected function query(): Builder
    {
        return User::with('roles:id,name')->select('id', 'name', 'email', 'email_verified_at', 'created_at');
    }

    protected function searchableColumns(): array
    {
        return ['name', 'email'];
    }

    protected function filterableColumns(): array
    {
        return ['name', 'email'];
    }

    protected function filterHandlers(): array
    {
        return [
            'roles' => fn ($q, $v) => $q->whereHas('roles', fn ($r) => $r->where('name', $v)),
        ];
    }

    protected function transform($user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i'),
            'roles' => $user->roles->pluck('name')->implode(', '),
            'created_at' => $user->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [
            'roles' => Role::pluck('name')->toArray(),
        ];
    }
}
