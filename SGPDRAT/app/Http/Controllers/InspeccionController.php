<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inspeccion;

class InspeccionController extends Controller
{
    public function __construct()
    {
       // $this->middleware('api.auth');
    }

    public function index(){  
        $data=Inspeccion::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    public function getInspeccionByP($id){  
        $data = Inspeccion::Where('proyecto_id',$id)->get();

       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }
    
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

    public function store(Request $request){
        $inspeccion=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
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
            $inspeccion->fecha=$data['fecha']; 
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
    
    public function getUltimo(){ //Buscar el ID del proyecto
        $data = Inspeccion::latest('id')->first();
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

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
