<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'blog_id',
        'name',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class, 'blog_id', 'id');
    }

    public function categories()
    {
        return $this->hasMany(Category::class, 'category_id', 'id');
    }
}
