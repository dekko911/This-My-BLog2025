<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public $search;

    public function __construct()
    {
        $this->search = request('search');
    }

    public function index()
    {
        $roles = Role::oldest()->with(['user'])->where(function ($i) {

            if ($this->search) {
                return $i->where('name', 'like', "%$this->search%")->orWhereRelation('user', 'name', 'like', "%$this->search%");
            }
        })->get();

        // $duplicate = Role::selectRaw('name * ? as amount_name')
        //     ->groupBy('name')
        //     ->having('amount_name', '=', 3)
        //     ->get();

        return response()->json([
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required'],
            'name' => ['required'],
        ]);

        if ($request->name == 'admin') {
            throw new \Exception("Can't Add Admin Twice !");
        }

        $role = Role::create($validated);

        return response()->json([
            'role' => $role,
            'message' => 'Role Has Been Created !'
        ]);
    }

    public function destroy(Role $role)
    {
        if ($role['id'] === 1) {
            throw new \Exception("Role Admin Can't Deleted !");
        }

        Role::destroy($role->id);

        return response()->json([
            'status' => 'Role deleted.',
        ]);
    }
}
