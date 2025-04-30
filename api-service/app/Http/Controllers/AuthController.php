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

            $roles = $user->pluck('roles')->all();

            $token = $user->createToken($user->name, $roles);

            return response()->json([
                'token' => $token,
                'user' => $user,
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'status' => 'fail',
                'message' => 'The provided credentials do not match with our records.',
            ]);
        }
    }
}
