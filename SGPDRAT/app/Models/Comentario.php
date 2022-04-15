<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $fillable = [
        'proyecto_id',
        'contenido'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    protected $table = 'comentario'; //SE DEFINE EL NOMBRE DE LA TABLA

    public function proyecto(){
        return $this->belongsTo('App\Models\Proyecto','proyecto_id');
    }
}
