<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;

class TareaController extends Controller
{
    public function __construct()
    {
       // $this->middleware('api.auth');
    }

    public function index(){  
        $data=Tarea::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    public function show($id){  
        $data=Tarea::find($id);  
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

    public function getTareaByP($id){  
        $data = Tarea::Where('proyecto_id',$id)->get();

       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }

    public function store(Request $request){
        $tarea=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'proyecto_id'=>'required|integer',
            'numero'=>'required',
            'descripcion'=>'required',
            'peso'=>'required',
            'avance'=>'required',
            'fecha_inicio'=>'required',
            'fecha_final'=>'required'
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
            $tarea=new Tarea();
            $tarea->proyecto_id=$data['proyecto_id'];
            $tarea->numero=$data['numero'];
            $tarea->descripcion=$data['descripcion']; 
            $tarea->peso=$data['peso'];
            $tarea->avance=$data['avance'];
            $tarea->fecha_inicio=$data['fecha_inicio'];
            $tarea->fecha_final=$data['fecha_final'];
            $tarea->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    public function update(Request $request){ 
            $tarea=$request;
            $json=$request->input('json',null);
            $data=json_decode($json,true);
            if(!empty($data)){
                $data=array_map('trim',$data);
                $rules=[
                    'numero'=>'required',
                    'descripcion'=>'required',
                    'peso'=>'required',
                    'avance'=>'required',
                    'fecha_inicio'=>'required',
                    'fecha_final'=>'required'
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
                        unset($data['proyecto_id']);  
                        $updated=Tarea::where('id',$id)->update($data);
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
            $deleted=Tarea::where('id',$id)->delete();
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
