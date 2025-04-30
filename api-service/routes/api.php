<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {

});

Route::middleware(['auth:sanctum', 'ability:writer'])->group(function () {

});
