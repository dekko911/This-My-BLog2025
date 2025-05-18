<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();

            $roles = $user->roles()->pluck('name')->all();

            $token = $user->createToken($user->name, $roles);

            return response()->json([
                'status' => 'success',
                'token' => $token,
                'user' => $user,
            ]);
        }

        return response()->json([
            'status' => 'fail',
            'message' => 'The provided credentials do not match with our records.',
        ]);

    }
}