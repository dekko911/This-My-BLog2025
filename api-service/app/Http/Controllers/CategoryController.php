<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $search;

    public function __construct()
    {
        $this->search = request('search');
    }

    public function index()
    {
        $categories = Category::latest()->with(['blog'])->where(function ($i) {
            if ($this->search) {
                return $i->where('name', 'like', "%$this->search%")->orWhereRelation('blog', 'name', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }
}