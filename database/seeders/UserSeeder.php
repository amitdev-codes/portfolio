<?php

// database/seeders/UserSeeder.php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create special users first
        $this->createSpecialUsers();

        // Create 10,000 regular users
        $this->createBulkUsers(10000);

        $this->command->info('10,000+ users seeded successfully!');
    }

    private function createSpecialUsers(): void
    {
        $specialUsers = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@portfolio.com',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@portfolio.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'name' => 'Developer',
                'email' => 'developer@portfolio.com',
                'password' => Hash::make('password'),
                'role' => 'developer',
            ],
        ];

        foreach ($specialUsers as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'email_verified_at' => now(),
                'password' => $userData['password'],
            ]);

            $user->assignRole($userData['role']);
        }
    }

    private function createBulkUsers(int $count): void
    {
        $faker = Faker::create();
        $roles = ['user', 'developer', 'admin']; // Skip superadmin for bulk

        User::factory($count)->create()->each(function ($user) use ($roles) {
            // Randomly assign role (90% user, 8% developer, 2% admin)
            $role = $roles[array_rand($roles, 1)];

            $user->assignRole($role);

            // Randomly verify some emails
            if (rand(1, 100) > 20) {
                $user->update(['email_verified_at' => now()]);
            }
        });
    }
}
