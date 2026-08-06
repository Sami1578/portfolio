<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostCommentController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SkillCategoryController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
*/
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{post:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/posts/{post:slug}/comments', [BlogCommentController::class, 'store'])->name('blog.comments.store');

/*
|--------------------------------------------------------------------------
| Authentication (guest)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Admin dashboard (authenticated + admin only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', EnsureUserIsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Singletons
        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('about', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('about', [AboutController::class, 'update'])->name('about.update');

        Route::get('contact', [AdminContactController::class, 'edit'])->name('contact.edit');
        Route::put('contact', [AdminContactController::class, 'update'])->name('contact.update');

        // Collections
        Route::resource('services', ServiceController::class)->except('show');
        Route::resource('skill-categories', SkillCategoryController::class)
            ->parameters(['skill-categories' => 'skillCategory'])
            ->except('show');
        Route::resource('skills', SkillController::class)->except('show');
        Route::resource('projects', ProjectController::class)->except('show');
        Route::post('posts/upload-image', [PostController::class, 'uploadImage'])->name('posts.upload-image');
        Route::resource('posts', PostController::class)->except('show');

        Route::get('comments', [PostCommentController::class, 'index'])->name('comments.index');
        Route::patch('comments/{comment}/approve', [PostCommentController::class, 'approve'])->name('comments.approve');
        Route::patch('comments/{comment}/reject', [PostCommentController::class, 'reject'])->name('comments.reject');
        Route::delete('comments/{comment}', [PostCommentController::class, 'destroy'])->name('comments.destroy');

        // Contact messages (read + delete)
        Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::get('messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
        Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    });