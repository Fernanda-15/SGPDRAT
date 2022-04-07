<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\TareaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () { 

    Route::get('/user/test',[UserController::class,'test']);
    Route::post('/user/login',[UserController::class,'login']);
    Route::post('/user/getidentity',[UserController::class,'getIdentity']);
    Route::get('/user/register',[UserController::class,'register']);
    Route::post('/user/updaterole',[UserController::class,'updateRole']);
    Route::post('/user/getrole/{id}',[UserController::class,'getRole']);

    //RUTAS AUTOMATICAS RESTful
    Route::resource('/user', UserController::class,['except'=>['create','edit']]);
    Route::resource('/proyecto', ProyectoController::class,['except'=>['create','edit']]);
    Route::resource('/tarea', TareaController::class,['except'=>['create','edit']]);

});


