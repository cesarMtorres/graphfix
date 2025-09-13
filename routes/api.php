<?php

use App\Http\Controllers\CodeRunnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/run-php', [CodeRunnerController::class, 'index'])->name('run-php');
