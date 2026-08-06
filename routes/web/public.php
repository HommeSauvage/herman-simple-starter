<?php

use App\Http\Controllers\Public\ContactController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| Every route in this starter is reachable without authentication — there
| is none. Their Inertia pages live in resources/js/pages/public/ and are
| wrapped in PublicLayout automatically (see resources/js/app.tsx).
|
*/

Route::inertia('/', 'public/home')->name('home');
Route::inertia('about', 'public/about')->name('about');

Route::inertia('contact', 'public/contact')->name('contact');
Route::post('contact', [ContactController::class, 'store'])->name('contact.store');
