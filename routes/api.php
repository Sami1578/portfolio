<?php
use App\Http\Controllers\Api\AutoBlogController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResourceAutomationController;

Route::middleware('automation.key')->group(function () {
    Route::post('/blog/auto-publish', [AutoBlogController::class, 'store']);
    Route::post('/automation/resources', [ResourceAutomationController::class, 'store']);
});
