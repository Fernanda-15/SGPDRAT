<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fotos;

class FotosController extends Controller
{
    public function __construct()
    {
       // $this->middleware('api.auth');
    }

    public function index(){  
        $data=Fotos::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    public function show($id){  
        $data=Fotos::find($id);  
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

    public function store(Request $request){
        $fotos=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'inspeccion_id'=>'required|integer',
            'nombre'=>'required',
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
            $fotos=new Fotos();
            $fotos->inspeccion_id=$data['inspeccion_id'];
            $fotos->nombre=$data['nombre'];
            $fotos->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    public function update(Request $request){ 
        $fotos=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        if(!empty($data)){
            $data=array_map('trim',$data);
            $rules=[
                'inspeccion_id'=>'required|integer',
                'nombre'=>'required',
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
                    $updated=Fotos::where('id',$id)->update($data);
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
        $deleted=Fotos::where('id',$id)->delete();
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
