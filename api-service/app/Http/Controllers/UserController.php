<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $search;

    public function __construct()
    {
        $this->search = request('search');
    }

    public function index()
    {
        $users = User::latest()->where(function ($i) {
            if ($this->search) {
                return $i->where('name', 'like', "%$this->search%")
                    ->orWhere('email', 'like', "%$this->search%")
                    ->orWhere('roles', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
            'roles' => ['required'],
        ]);

        $user = User::create($validated);

        return response()->json([
            'user' => $user,
            'message' => 'Data Has Been Created !'
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'unique:users,email,' . $user->id],
            'password' => ['required'],
            'roles' => ['required']
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'roles' => $request->roles
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'Data Has Been Updated !'
        ]);
    }

    public function destroy($id)
    {
        User::destroy($id);

        return response()->json([
            'status' => 'User deleted',
        ]);
    }
}
