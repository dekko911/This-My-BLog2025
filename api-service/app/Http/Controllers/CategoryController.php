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
        $categories = Category::latest()->with(['blog'])->where(function ($i) {
            if ($this->search) {
                return $i->where('name', 'like', "%$this->search%")->orWhereRelation('blog', 'name', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
        ]);

        $category = Category::create($validated);

        return response()->json([
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'unique:categories,name']
        ]);

        $category->update($validated);

        return response()->json([
            'category' => $category,
        ]);
    }

    public function destroy($id)
    {
        Category::destroy($id);

        return response()->json([
            'status' => 'Category Deleted.'
        ]);
    }
}
