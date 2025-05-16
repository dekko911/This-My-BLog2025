<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

/**
 * Controller for Categories.
 */
class CategoryController extends Controller
{
    protected $search;

    public function __construct()
    {
        $this->search = request('search');
    }

    public function index()
    {
        $categories = Category::latest()->where(function ($i) {
            if ($this->search) {
                return $i->where('name', 'like', "%$this->search%")
                    ->orWhere('slug', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    // public function slug($slug)
    // {
    //     $category = Category::where('slug', $slug)->first();

    //     return response()->json([
    //         'category' => $category,
    //     ]);
    // }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
        ]);

        $category = Category::create($validated);

        return response()->json([
            'category' => $category,
            'message' => 'Data Category Has Created !'
        ]);
    }

    public function destroy(Category $category)
    {
        Category::destroy($category->id);

        return response()->json([
            'status' => 'Category Deleted.'
        ]);
    }
}
