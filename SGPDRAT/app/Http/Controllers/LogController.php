<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    ///
    ///CONSTRUCTOR DE LA CLASE, INYECTA MIDDLEWARE
    ///
    public function __construct()
    {
       // $this->middleware('api.auth');
    }
    
    ///
    ///RETORNA TODOS LOS LOG DE LA BASE DE DATOS
    ///
    public function index(){  
        $data=Log::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RETORNA LA INFORMACION DE UN LOG A PARTIR DE UN ID
    ///
    public function show($id){  
        $data=Log::find($id);  
        if(is_object($data)){  
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
    ///RECIBE LA INFORMACION DEL LOG, VERIFICA LOS CAMPOS Y LO AGREGA A LA BASE DE DATOS
    ///
    public function store(Request $request){
        $Log=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'proyecto_id'=>'required|integer',
            'usuario'=>'required',
            'descripcion'=>'required'
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
            $Log=new Log();
            $Log->proyecto_id=$data['proyecto_id'];
            $Log->usuario=$data['usuario'];
            $Log->descripcion=$data['descripcion'];
            $Log->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    ///
    ///RECIBE LA INFORMACION DEL LOG, VERIFICA LOS CAMPOS Y LO ACTUALIZA EN LA BASE DE DATOS
    ///
    public function update(Request $request){ 
        $Log=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        if(!empty($data)){
            $data=array_map('trim',$data);
            $rules=[
                'proyecto_id'=>'required|integer',
                'usuario'=>'required',
                'descripcion'=>'required'
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
                    $updated=Log::where('id',$id)->update($data);
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
    ///ELIMINA UN LOG DE LA BASE DE DATOS A PARTIR DEL ID DEL MISMO 
    ///
    public function destroy($id){
        if(isset($id)){
            $deleted=Log::where('id',$id)->delete();
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

    ///
    ///RETORNA TODOS LOS LOGS DE UN PROYECTO A PARTIR DEL ID DEL MISMO
    ///
    public function getLogByP($id){  
        $data = Log::Where('proyecto_id',$id)->get();
       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }
}
