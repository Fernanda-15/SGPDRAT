<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fotos extends Model
{
    use HasFactory;

    protected $fillable = [
        'inspeccion_id',
        'nombre'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'fotos'; //SE DEFINE EL NOMBRE DE LA TABLA

    public function inspeccion(){
        return $this->belongsTo('App\Models\Inspeccion','inspeccion_id');
    }
}
