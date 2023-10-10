<?php

use App\Http\Controllers\ToDoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ToDoListController::class)->group(function(){
    Route::get('to_do_list/list', 'index');
    Route::get('to_do_list/create', 'create');
    Route::post('to_do_list/store', 'store');
    Route::get('to_do_list/edit/{id?}', 'edit');
    Route::post('to_do_list/update', 'update');
    Route::get('to_do_list/delete/{id?}', 'delete');
});
        
