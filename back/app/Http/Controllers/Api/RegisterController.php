<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class RegisterController extends Controller
{
    protected $defaultRegistrationKey = 't';

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'user',
            'registration_key' => $request->registration_key ?? $this->defaultRegistrationKey,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function registerAdmin(RegisterRequest $request)
    {
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'admin'
        ]);

        $token = $admin->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user' => new UserResource($admin),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
