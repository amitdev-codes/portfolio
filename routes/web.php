<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortFolioInformation\PortfolioInformationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\TechTalkController;
use App\Http\Controllers\UserManagement\PermissionController;
use App\Http\Controllers\UserManagement\RoleController;
use App\Http\Controllers\UserManagement\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'landing'])->name('home');
// routes/web.php - Your routes are CORRECT!
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
        Route::resource('users', UserController::class)->names('users');
        Route::post('users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');
        Route::get('users/export', [UserController::class, 'exportUsers'])->name('users.export');
        Route::resource('roles', RoleController::class)->names('roles');
        Route::resource('permissions', PermissionController::class)->names('permissions');
        Route::post('permissions/bulk-destroy', [PermissionController::class, 'bulkDestroy'])->name('permissions.bulk-destroy');

        Route::resource('products', ProductController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('tech-talks', TechTalkController::class);
        Route::resource('experiences', ExperienceController::class);
        Route::resource('stats', StatController::class);
        Route::resource('abouts', AboutController::class);
        Route::resource('portfolio-informations', PortfolioInformationController::class);
    });

Route::get('/lang/{locale}', function (string $locale) {
    if (in_array($locale, ['en', 'np'])) {
        session(['app_locale' => $locale]);
        app()->setLocale($locale);
        if (! file_exists(resource_path("lang/{$locale}/messages.php"))) {
            return redirect()->back()->with('message', 'Using Google Translate fallback');
        }
    }

    return redirect()->back();
})->name('lang.switch');
require __DIR__.'/settings.php';
