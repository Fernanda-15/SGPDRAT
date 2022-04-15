<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $fillable = [
        'proyecto_id',
        'numero',
        'descripcion',
        'peso',
        'avance',
        'fecha_inicio',
        'fecha_final'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL
    protected $table = 'tarea'; //SE DEFINE EL NOMBRE DE LA TABLA


    public function proyecto(){
        return $this->belongsTo('App\Models\Proyecto','proyecto_id');
    }
}
