<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Controller for Blogs.
 */
class BlogController extends Controller
{
    protected $search;
    public $file;

    public function __construct(Request $request)
    {
        $this->search = request('search');
        $this->file = $request->file('photo');
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

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'category_id' => ['required'],
            'title' => ['required'],
            'description' => ['required'],
            'release' => ['required'],
            'photo' => ['nullable', 'file', 'mimes:png,jpg'],
        ]);

        if ($this->file) {
            $extension = $this->file->extension();
            $file_name = Str::random(20) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $file_name, 'public');
        }

        $blog = Blog::create([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'release' => $request->release,
            'photo' => $file_name ?? null,
            // tanda ?? kalau variable $file_name tidak ada isi, maka diberi nilai null / kalau variable $file_name ada isi, maka nilai null tidak digunakan. "NULL COALESCING"
        ]);

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'user_id' => ['required'],
            'category_id' => ['required'],
            'title' => ['required', 'unique:blogs,title'],
            'description' => ['required'],
            'release' => ['required'],
            'photo' => ['nullable', 'file', 'mimes:png,jpg'],
        ]);

        if ($this->file) {
            if ($request->old('photo')) {
                Storage::delete('blogs/photo/' . $request->old('photo'));
            }

            $extension = $this->file->extension();
            $file_name = Str::random(20) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $file_name, 'public');
        }

        $blog = Blog::where('id', $blog->id)
            ->update([
                'user_id' => $request->user_id,
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'release' => $request->release,
                'photo' => $file_name,
            ]);

        return response()->json([
            'blog' => $blog,
            'message' => 'Data Has Been Updated !',
        ]);
    }

    public function destroy(Blog $blog)
    {
        if ($blog->photo) {
            Storage::delete('blogs/photo/' . $blog->photo);
        }

        Blog::destroy($blog->id);

        return response()->json([
            'status' => 'Blog Deleted.',
        ]);
    }
}