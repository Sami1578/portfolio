<?php

use App\Services\PortfolioService;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\PortfolioController::class, 'index'])->name('home');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');