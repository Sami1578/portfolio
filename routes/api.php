<?php
use App\Http\Controllers\Api\AutoBlogController;
use Illuminate\Support\Facades\Route;

Route::post('/blog/auto-publish', [AutoBlogController::class, 'store']);