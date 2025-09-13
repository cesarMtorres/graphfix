<?php

use App\Http\Controllers\CodeRunnerController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::prefix('api')->group(function () {
    Route::post('/run-php', [CodeRunnerController::class, 'index'])->name('run-php');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
