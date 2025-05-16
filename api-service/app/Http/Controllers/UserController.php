<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

/**
 * Controller for Users.
 */
class UserController extends Controller
{
    protected $search;
    public $user;

    public function __construct(User $user)
    {
        $this->search = request('search');
    }

    public function index()
    {
        $users = User::oldest()->where(function ($i) {
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

    public function show($id)
    {
        $user = User::find($id);

        return response()->json([
            'user' => $user,
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
            'message' => 'User Has Created !',
        ]);
    }

    public function update(Request $request, User $user)
    {
        // tidak memakai element input hidden lagi sebagai menyembunyikan id = karena bisa lewat where('id', $user->id)

        $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'roles' => ['required']
        ]);

        if ($user['roles'] == 'admin') {
            throw new \Exception("Admin user Can't Be Edit !");
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'roles' => $request->roles
        ]);

        if ($request->pasword) {
            $user->update(['password' => $request->password]);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Data Has Been Updated !'
        ]);
    }

    public function destroy(User $user)
    {
        if ($user['roles'] == 'admin') {
            throw new \Exception("Admin user Can't Be Deleted !");
        }

        User::destroy($user->id);

        return response()->json([
            'status' => 'User deleted.',
        ]);
    }
}