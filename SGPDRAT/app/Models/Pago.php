<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = [
        'proyecto_id',
        'numero',
        'proyeccion',
        'monto'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'pago'; //SE DEFINE EL NOMBRE DE LA TABLA

    public function proyecto(){
        return $this->belongsTo('App\Models\Proyecto','proyecto_id');
    }    
}
