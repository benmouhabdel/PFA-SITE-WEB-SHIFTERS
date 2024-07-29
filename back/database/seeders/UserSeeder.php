<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'admin',
                'password' => bcrypt('password'),
                'role' => 'admin',

            ]
        );

        User::firstOrCreate(
            ['email' => 'user@user.com'],
            [
                'name' => 'user',
                'password' => bcrypt('password'),
                'role' => 'user',
                'registration_key' => 'Shifters@Heec143' // Set registration key
            ]
        );
    }
}
