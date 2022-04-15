<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'proyecto_id',
        'usuario',
        'descripcion'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'log'; //SE DEFINE EL NOMBRE DE LA TABLA

    public function proyecto(){
        return $this->belongsTo('App\Models\Proyecto','proyecto_id');
    }
}
