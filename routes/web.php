<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;

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

Route::get('/', [PlayerController::class, 'index'])->name('login');

Route::post('/login', [PlayerController::class, 'authenticate']); 
Route::get('/register', [PlayerController::class, 'register']);
Route::post('/create-user', [PlayerController::class, 'store']);

Route::get('/game', function () {
    return view('welcome');
})->middleware('auth');

Route::get('/api/user-data', function() {
    return auth()->user();
})->middleware('auth');

Route::post('/move-stickman', [PlayerController::class, 'moveStickman'])->middleware('auth');