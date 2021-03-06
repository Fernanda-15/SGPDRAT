<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proyecto;

class ProyectoController extends Controller
{

    ///
    ///CONSTRUCTOR DE LA CLASE, INYECTA MIDDLEWARE
    ///
    public function __construct()
    {
       // $this->middleware('api.auth');
    }

    ///
    ///RETORNA TODOS LOS REGISTROS DE PROYECTOS ALMACENADOS EN LA BASE DE DATOS
    ///
    public function index(){
        $data=Proyecto::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RECIBE UN ID DEL PROYECTO Y RETORNA LOS DATOS DEL MISMO SI EXISTE EN LA BASE DE DATOS
    ///
    public function show($id){  //BUSQUEDA POR ID
        $data=Proyecto::find($id);  //BUSCA EL ID EN LA DB
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
    ///OBTIENE EL ULTIMO PROYECTO DE LA BASE DE DATOS
    ///
    public function getUltimo(){ //Buscar el ID del proyecto
        $data = Proyecto::latest('id')->first();
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RECIBE UN REQUEST CON LA INFORMACION DEL PROYECTO, VERIFICA LOS CAMPOS Y AGREGA EL PROYECTO A LA BASE DE DATOS
    ///
    public function store(Request $request){
        $proyecto=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'user_id'=>'required|integer',
            'numero_contratacion'=>'required',
            'nombre'=>'required',
            'objetivo'=>'required',
            'ubicacion'=>'required',
            'fecha_inicio'=>'required',
            'fecha_final'=>'required',
            'forma_pago'=>'required',
            'monto_adjudicado'=>'required',
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
            $proyecto=new Proyecto();
            $proyecto->user_id=$data['user_id'];
            $proyecto->numero_contratacion=$data['numero_contratacion'];
            $proyecto->nombre=$data['nombre'];
            $proyecto->objetivo=$data['objetivo'];
            $proyecto->ubicacion=$data['ubicacion'];
            $proyecto->fecha_inicio=$data['fecha_inicio'];
            $proyecto->fecha_final=$data['fecha_final'];
            $proyecto->forma_pago=$data['forma_pago'];
            $proyecto->monto_adjudicado=$data['monto_adjudicado'];
            $proyecto->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    ///
    ///RECIBE UN REQUEST CON LA INFORMACION DEL PROYECTO, VERIFICA LOS CAMPOS Y AGREGA EL PROYECTO A LA BASE DE DATOS
    ///
    public function update(Request $request){
            $proyecto=$request;
            $json=$request->input('json',null);
            $data=json_decode($json,true);
            if(!empty($data)){
                $data=array_map('trim',$data);
                $rules=[
                    'user_id'=>'required|integer',
                    'numero_contratacion'=>'required',
                    'nombre'=>'required',
                    'objetivo'=>'required',
                    'ubicacion'=>'required',
                    'fecha_inicio'=>'required',
                    'fecha_final'=>'required',
                    'forma_pago'=>'required',
                    'monto_adjudicado'=>'required',
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
                        $updated=Proyecto::where('id',$id)->update($data);
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
    ///RECIBE EL ID DEL PROYECTO Y SI EXISTE EN LA BASE DE DATOS LO ELIMINA
    ///
    public function destroy($id){

        if(isset($id)){
            $deleted=Proyecto::where('id',$id)->delete();
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
    ///OBTIENE LOS PROYECTOS A PARTIR DEL ID DE UN USUARIO
    ///
    public function getProyectoByU($id){
        $data = Proyecto::Where('user_id',$id)->get();
       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }

    ///
    ///BUSCA LOS PROYECTOS CON UN NOMBRE QUE CONTENGA LAS MISMAS LETRAS QUE LA BUSQUEDA
    ///
    public function buscar($valor){
        $data = Proyecto::Where('nombre', 'like' , "%$valor%")->get();
       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }

}
