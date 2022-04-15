<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inspeccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'proyecto_id',
        'user_id',
        'numero',
        'fecha',
        'observaciones',
        'firma',
        'avance_obra',
        'porcentaje_pagado',
        'tareas_ejecutadas'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'inspeccion'; //SE DEFINE EL NOMBRE DE LA TABLA

    public function user(){
        return $this->belongsTo('App\Models\User','user_id');
    }

    public function proyecto(){
        return $this->belongsTo('App\Models\Proyecto','proyecto_id');
    }

    public function fotos(){
        return $this->hasMany('App\Models\Fotos');
    }

    public function archivos(){
        return $this->hasMany('App\Models\Archivos');
    }
}
