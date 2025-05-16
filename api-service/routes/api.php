<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    // Route::apiResource('/users', UserController::class);
    // Route::apiResource('/blogs', BlogController::class);
    // Route::apiResource('/categories', CategoryController::class);
});

Route::middleware(['auth:sanctum', 'ability:writer'])->group(function () {
    // Route::apiResource('/blogs', BlogController::class);
    // Route::apiResource('/categories', CategoryController::class);
});

Route::apiResource('/users', UserController::class);
Route::apiResource('/blogs', BlogController::class);
Route::apiResource('/categories', CategoryController::class);
Route::get('/blogs/slug/{slug}', [BlogController::class, 'slug']);
