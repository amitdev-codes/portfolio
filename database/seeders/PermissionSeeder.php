<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Users Permissions
            'view-users', 'create-users', 'edit-users', 'delete-users',

            // Roles Permissions
            'view-roles', 'create-roles', 'edit-roles', 'delete-roles',

            // Permissions Permissions
            'view-permissions', 'create-permissions', 'edit-permissions', 'delete-permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
            ]);
        }

        $this->command->info('Permissions seeded successfully!');
    }
}
