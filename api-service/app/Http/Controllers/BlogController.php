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
            'title' => ['required'],
            'description' => ['required'],
            'release' => ['required'],
            'photo' => ['nullable', 'file', 'mimes:png,jpg'],
        ]);

        if ($this->file) {
            $extension = $this->file->extension();
            $file_name = Str::random(20) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $file_name);
        }

        $blog = Blog::create([
            'title' => $request->title,
            'description' => $request->description,
            'release' => $request->release,
            'photo' => $file_name ?? null,
            // tanda ?? kalau variable $file_name tidak ada isi, maka diberi nilai null / kalau variable $file_name ada isi, maka nilai null tidak digunakan "NULL COALESCING"
        ]);

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => ['required', 'unique:blogs,title'],
            'description' => ['required'],
            'release' => ['required'],
            'photo' => ['nullable', 'file', 'mimes:png,jpg'],
        ]);

        if ($this->file) {

            if (Storage::exists($this->file)) {
                Storage::delete($this->file);
            }

            $extension = $this->file->extension();
            $file_name = Str::random(20) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $file_name);
        }

        $blog->update([
            'title' => $request->title,
            'description' => $request->description,
            'release' => $request->release,
            'photo' => $file_name,
        ]);

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function destroy($id)
    {
        if ($this->file) {
            Storage::delete('blogs/photo');
        }

        Blog::destroy($id);

        return response()->json([
            'status' => 'Blog Deleted.',
        ]);
    }
}
