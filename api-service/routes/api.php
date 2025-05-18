<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/categories', CategoryController::class);
});

Route::middleware(['auth:sanctum', 'ability:admin,writer'])->group(function () {
    Route::apiResource('/blogs', BlogController::class);
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/category', [CategoryController::class, 'index']);
    Route::get('/blogs/slug/{slug}', [BlogController::class, 'slug']);
});

Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/slug/{slug}', [BlogController::class, 'slug']);
