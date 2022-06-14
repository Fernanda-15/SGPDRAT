<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inspeccion;

class InspeccionController extends Controller
{
    ///
    ///CONSTRUCTOR DE LA CLASE, INYECTA MIDDLEWARE
    ///
    public function __construct()
    {
       // $this->middleware('api.auth');
    }


    ///
    ///RETORNA TODOS LOS REGISTROS DE INSPECCIONES DE LA BASE DE DATOS
    ///
    public function index(){  
        $data=Inspeccion::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RETORNA TODAS LAS INSPECCIONES DE UN PROYECTO A PARTIR DEL ID DEL MISMO
    ///
    public function getInspeccionByP($id){  
        $data = Inspeccion::Where('proyecto_id',$id)->get();

       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }
    
    ///
    ///RETORNA UNA INSPECCION A PARTIR DEL ID DE LA MISMA
    ///
    public function show($id){  //BUSQUEDA POR ID
        $data=Inspeccion::find($id);  //BUSCA EL ID EN LA DB
        if(is_object($data)){  //VERIFICA SI ES OBJETO
            $response=array(
                'status'=>'success',
                'code'=>200,
                'data'=>$data 
            );
        }else{
            $response=array(
                'status'=>'error',
                'code'=>404,
                'message'=>'Recurso no encontrado'
            );
        }
        return response()->json($response,$response['code']);
    }

    ///
    ///RECIBE LA INFORMACION DE LA INSPECCION, VERIFICA LOS CAMPOS Y ALMACENA LA INSPECCION EN LA BASE DE DATOS
    ///
    public function store(Request $request){
        $inspeccion=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'proyecto_id'=>'required|integer',
            'user_id'=>'required|integer',
            'numero'=>'required',
            'observaciones'=>'required',
            'firma'=>'required',
            'avance_obra'=>'required',
            'porcentaje_pagado'=>'required',
            'tareas_ejecutadas'=>'required',
        ];
        $valid=\validator($data,$rules);
        if($valid->fails()){
            $response=array(
                'status'=>'error',
                'code'=>406,
                'message'=>'Los datos son incorrectos',
                'errors'=>$valid->errors()
            );;
        }else{
            $inspeccion=new Inspeccion();
            $inspeccion->proyecto_id=$data['proyecto_id'];
            $inspeccion->user_id=$data['user_id'];
            $inspeccion->numero=$data['numero'];
            $inspeccion->fecha=now();
            $inspeccion->observaciones=$data['observaciones'];
            $inspeccion->firma=$data['firma'];
            $inspeccion->avance_obra=$data['avance_obra'];
            $inspeccion->porcentaje_pagado=$data['porcentaje_pagado'];
            $inspeccion->tareas_ejecutadas=$data['tareas_ejecutadas'];
            $inspeccion->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    ///
    ///OBTIENE LA ULTIMA INSPECCION GUARDADA EN LA BASE DE DATOS
    ///
    public function getUltimo(){ //Buscar el ID del proyecto
        $data = Inspeccion::latest('id')->first();
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RECIBE LA INFORMACION DE LA INSPECCION, VERIFICA LOS CAMPOS Y ACTUALIZA LA INSPECCION EN LA BASE DE DATOS
    ///
    public function update(Request $request){ 
        $inspeccion=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        if(!empty($data)){
            $data=array_map('trim',$data);
            $rules=[
                'proyecto_id'=>'required|integer',
                'user_id'=>'required|integer',
                'numero'=>'required',
                'fecha'=>'required',
                'observaciones'=>'required',
                'firma'=>'required',
                'avance_obra'=>'required',
                'porcentaje_pagado'=>'required',
                'tareas_ejecutadas'=>'required',
            ];
            $validate=\validator($data,$rules);
                if($validate->fails()){
                 $response=array(
                    'status'=>'error',
                    'code'=>406,
                    'message'=>'Los datos son incorrectos',
                    'errors'=>$validate->errors()
                );
                }else{
                    $id=$data['id'];
                    unset($data['id']);  
                    unset($data['created_at']);      
                    $data['updated_at']=now();    
                    $updated=Inspeccion::where('id',$id)->update($data);
                    if($updated>0){
                        $response=array(
                            'status'=>'success',
                            'code'=>200,
                            'message'=>'Datos almacenados exitosamente'
                        );
                    }else{
                    $response=array(
                        'status'=>'error',
                        'code'=>400,
                        'message'=>'No se pudo actualizar los datos'
                    );
                    }
                }
        }else{
        $response=array(
            'status'=>'error',
            'code'=>400,
            'message'=>'Faltan parametros'
        );
        }
    return response()->json($response,$response['code']);
}

    ///
    ///ELIMINA UNA INSPECCION A PARTIR DEL ID DE LA MISMA
    ///
public function destroy($id){
      
    if(isset($id)){
        $deleted=Inspeccion::where('id',$id)->delete();
    if($deleted){
        $response=array(
            'status'=>'success',
            'code'=>200,
            'message'=>'Eliminado correctamente'
        );
    }else{
        $response=array(
            'status'=>'error',
            'code'=>400,
            'message'=>'Problemas al eliminar el recurso'
        );
    }
    }else{
    $response=array(
        'status'=>'error',
        'code'=>400,
        'message'=>'Falta el identificador del recurso'
    );
    }
    return response()->json($response,$response['code']);
}

}
