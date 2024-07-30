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
                'phone' => '1234567890', // Set admin phone number
            ]
        );

        User::firstOrCreate(
            ['email' => 'user@user.com'],
            [
                'name' => 'user',
                'password' => bcrypt('password'),
                'role' => 'user',
                'registration_key' => 'Shifters@Heec143',
                'phone' => '0987654321', // Set user phone number
            ]
        );
    }
}
