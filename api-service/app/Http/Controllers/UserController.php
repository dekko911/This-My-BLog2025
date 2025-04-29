<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->with(['blogs'])->get();

        return response()->json([
            'users' => $users,
        ]);
    }
}