<?php

// Assign permissions to roles AFTER all seeders
// database/seeders/RolePermissionSeeder.php (Optional - run after main seeders)

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Superadmin gets ALL permissions
        $superadmin = Role::findByName('superadmin');
        $allPermissions = Permission::all();
        $superadmin->syncPermissions($allPermissions);

        // Admin gets most permissions
        $admin = Role::findByName('admin');
        $adminPermissions = Permission::whereIn('name', [
            'view-users', 'create-users', 'edit-users', 'delete-users',
            'view-roles', 'view-permissions',
        ])->get();
        $admin->syncPermissions($adminPermissions);

        // Developer gets limited permissions
        $developer = Role::findByName('developer');
        $developerPermissions = Permission::whereIn('name', [
            'view-users', 'edit-users',
        ])->get();
        $developer->syncPermissions($developerPermissions);

        // User gets no permissions
        $user = Role::findByName('user');
        $user->syncPermissions([]);

        $this->command->info('Role permissions assigned successfully!');
    }
}
