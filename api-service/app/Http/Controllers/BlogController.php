<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::latest()->with(['user'])->get();

        return response()->json([
            'blogs' => $blogs,
        ]);
    }
}
