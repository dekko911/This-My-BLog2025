<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

/**
 * Controller for Blogs.
 */
class BlogController extends Controller
{
    protected $search;

    public $file;

    // protected $disk;

    public function __construct(Request $request)
    {
        $this->search = request('search');
        $this->file = $request->file('photo');
        // $this->disk = Storage::build([
        //     'driver' => 'google',
        //     'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
        //     'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
        //     'accessToken' => Auth::user()->currentAccessToken(), // Get from authenticated user
        //     'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
        //     'folder' => env('GOOGLE_DRIVE_FOLDER'),
        // ]);
    }

    public function index()
    {
        $blogs = Blog::latest('created_at')->with(['user', 'category'])->where(function ($i) {
            if ($this->search) {
                return $i->where('title', 'like', "%$this->search%")
                    ->orWhere('slug', 'like', "%$this->search%")
                    ->orWhere('release', 'like', "%$this->search%")
                    ->orWhere('description', 'like', "%$this->search%")
                    ->orWhereRelation('user', 'name', 'like', "%$this->search%")
                    ->orWhereRelation('category', 'name', 'like', "%$this->search%");
            }
        })->get();

        return response()->json([
            'blogs' => $blogs,
        ]);
    }

    public function show($id)
    {
        $blog = Blog::with(['user', 'category'])->find($id);

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function slug($slug)
    {
        $blog = Blog::with(['user', 'category'])->where('slug', $slug)->first();

        return response()->json([
            'blog' => $blog,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => ['required'],
            'title' => ['required'],
            'slug' => ['required'],
            'description' => ['required'],
            'release' => ['required'],
            'photo' => ['nullable', 'mimes:png,jpg,webp'],
        ]);

        if ($this->file) {
            $extension = $this->file->extension();
            $fileName = rand(10000, 15000) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $fileName, 'public');
        }

        $blog = Blog::create([
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'release' => $request->release,
            'photo' => $fileName ?? "-",
            // tanda ?? kalau variable $file_name tidak ada isi, maka diberi nilai null / kalau variable $file_name ada isi, maka nilai null tidak digunakan. "NULL COALESCING"
        ]);

        return response()->json([
            'blog' => $blog,
            'message' => 'Data Blog Has Created !'
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'category_id' => ['required'],
            'title' => ['required'],
            'slug' => ['required'],
            'description' => ['required'],
            'release' => ['required'],
        ]);

        $updatePhoto = $blog->findOrFail($blog['id']);

        if ($this->file) {
            if ($updatePhoto->photo) {
                Storage::disk('public')->delete("blogs/photo/$updatePhoto->photo");
            }

            $extension = $this->file->extension();
            $fileName = rand(10000, 15000) . '.' . $extension;

            $this->file->storeAs('blogs/photo', $fileName, 'public');
        }

        $blog->update([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'release' => $request->release,
        ]);

        if ($blog->photo) {
            $blog->update(['photo' => $fileName]);
        }

        return response()->json([
            'blog' => $blog,
            'message' => 'Data Has Been Updated !',
        ]);
    }

    public function destroy(Blog $blog)
    {
        if ($blog->photo) {
            Storage::disk('public')->delete("blogs/photo/$blog->photo");
            // Gdrive::delete("blog-photo/$blog->photo");
        }

        Blog::destroy($blog->id);

        return response()->json([
            'status' => 'Blog Deleted.',
        ]);
    }
}
