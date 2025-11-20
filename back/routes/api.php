<?php

use App\Http\Controllers\SpotController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/spots', [SpotController::class, 'index']);
Route::post('/spots', [SpotController::class, 'store']);
Route::post('/tags', [TagController::class, 'store']);
