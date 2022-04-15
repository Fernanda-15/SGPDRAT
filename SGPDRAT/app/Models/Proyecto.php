<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'numero_contratacion',
        'nombre',
        'objetivo',
        'ubicacion',
        'fecha_inicio',
        'fecha_final',
        'forma_pago',
        'monto_adjudicado'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'proyecto'; //SE DEFINE EL NOMBRE DE LA TABLA


    public function user(){
        return $this->belongsTo('App\Models\User','user_id');
    }

    public function tareas(){
        return $this->hasMany('App\Models\Tarea');
    }

    public function inspecciones(){
        return $this->hasMany('App\Models\Inspeccion');
    }

    public function comentarios(){
        return $this->hasMany('App\Models\Comentario');
    }

    public function pagos(){
        return $this->hasMany('App\Models\Pago');
    }
    public function logs(){
        return $this->hasMany('App\Models\Log');
    }
}
