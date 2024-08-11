<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // login a user method
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            // User authenticated successfully
            return response()->json([
                'message' => 'Login successful!',
                'user' => Auth::user(),
                'token' => Auth::user()->createToken('auth_token')->plainTextToken

            ]);
        } else {
            return response()->json([
                'code' => 401,
                'message' => 'Invalid login credentials!',
            ], 401);
        }// 1 day

      
    }

    // logout a user method
    public function logout(Request $request)
    {
       auth()->logout();

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully!'
        ]);
    }

    // get the authenticated user method
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
