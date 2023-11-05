<?php

use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('guest')->group(function(){
    Route::controller(AuthController::class)->name('auth.')->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/login', 'LoginPage')->name('login');
        Route::post('/login', 'LoginRequest')->name('login.post');
        Route::get('/register', 'RegisterPage')->name('register');
        Route::post('/register', 'RegisterRequest')->name('register.post');
    });
});

Route::middleware('auth')->group(function(){
    Route::controller(AuthController::class)->name('auth.')->group(function(){
        Route::delete('/logout', 'LogoutRequest')->name('logout.delete');
    });

    Route::controller(TransactionController::class)
        ->name('transaction.')
        ->prefix('transaction')
        ->group(function(){
            Route::get('/', 'index')->name('index');
            Route::get('/history', 'HistoryPage')->name('history');
            Route::get('/create', 'InsertPage')->name('insert');
            Route::post('/insert', 'InserRequest')->name('insert.post');
    });
});