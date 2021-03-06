<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\InspeccionController;
use App\Http\Controllers\FotosController;
use App\Http\Controllers\ArchivosController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\PagoController;


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
    Route::get('/tarea/proyecto/{id}',[TareaController::class,'getTareaByP']);
    Route::get('/log/proyecto/{id}',[LogController::class,'getLogByP']);
    Route::get('/comentario/proyecto/{id}',[ComentarioController::class,'getComentarioByP']);
    Route::get('/pago/proyecto/{id}',[PagoController::class,'getPagoByP']);
    Route::get('/proyecto/getultimo',[ProyectoController::class,'getUltimo']);
    Route::get('/proyecto/user/{id}',[ProyectoController::class,'getProyectoByU']);
    Route::get('/inspeccion/proyecto/{id}',[InspeccionController::class,'getInspeccionByP']);
    Route::post('/fotos/upload',[FotosController::class,'uploadImage']);
    Route::get('/inspeccion/getultimo',[InspeccionController::class,'getUltimo']);
    Route::post('/archivos/upload',[ArchivosController::class,'uploadArchivo']); 
    Route::get('/fotos/inspeccion/{id}',[FotosController::class,'getFotosByI']);
    Route::get('/archivos/inspeccion/{id}',[ArchivosController::class,'getArchivosByI']);
    Route::get('/fotos/getimage/{filename}',[FotosController::class,'getImage']);
    Route::get('/archivos/getdocumento/{filename}',[ArchivosController::class,'getDocumentos']);
    Route::get('/archivos/getruta/{filename}',[ArchivosController::class,'getRuta']);
    Route::get('/fotos/getruta/{filename}',[FotosController::class,'getRuta']);
    Route::get('/proyecto/buscar/{valor}',[ProyectoController::class,'buscar']);
    
    
    Route::get('/fotos/liberar/{id}',[FotosController::class,'liberar']);
    Route::get('/archivos/liberar/{id}',[ArchivosController::class,'liberar']);

    //RUTAS AUTOMATICAS RESTful
    Route::resource('/user', UserController::class,['except'=>['create','edit']]);
    Route::resource('/proyecto', ProyectoController::class,['except'=>['create','edit']]);
    Route::resource('/tarea', TareaController::class,['except'=>['create','edit']]);
    Route::resource('/inspeccion', InspeccionController::class,['except'=>['create','edit']]);
    Route::resource('/fotos', FotosController::class,['except'=>['create','edit']]);
    Route::resource('/archivos', ArchivosController::class,['except'=>['create','edit']]);
    Route::resource('/pago', PagoController::class,['except'=>['create','edit']]);
    Route::resource('/comentario', ComentarioController::class,['except'=>['create','edit']]);
    Route::resource('/log', LogController::class,['except'=>['create','edit']]);

});


