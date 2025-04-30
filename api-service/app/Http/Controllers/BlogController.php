<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    protected $search;

    public function __construct()
    {
        $this->search = request('search');
    }

    public function index()
    {
        $blogs = Blog::latest()->with(['user', 'category'])->where(function ($i) {
            if ($this->search) {
                return $i->where('title', 'like', "%$this->search%")
                    ->orWhere('release', 'like', "%$this->search%")
                    ->orWhereRelation('user', 'name', 'like', "%$this->search%")
                    ->orWhereRelation('category', 'name', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'blogs' => $blogs,
        ]);
    }
}
