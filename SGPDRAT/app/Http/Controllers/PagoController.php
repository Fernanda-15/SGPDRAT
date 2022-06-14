<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pago;

class PagoController extends Controller
{

    ///
    ///CONSTRUCTOR DE LA CLASE, INYECTA MIDDLEWARE
    ///
    public function __construct()
    {
       // $this->middleware('api.auth');
    }
    
    ///
    ///RETORNA TODOS LOS REGISTROS DE PAGOS DE LA BASE DE DATOS
    ///
    public function index(){  
        $data=Pago::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RECIBE UN ID Y RETORNA LA INFORMACION DEL PAGO CON ESE ID
    ///
    public function show($id){  
        $data=Pago::find($id);  
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
    ///RETORNA TODOS LOS PAGOS QUE PERTENEZCAN A UN PROYECTO A PARTIR DE UN ID
    ///
    public function getPagoByP($id){  
        $data = Pago::Where('proyecto_id',$id)->get();

       return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$data
       ], 200);
    }

    ///
    ///RECIBE LOS DATOS DEL PAGO, VERIFICA LOS CAMPOS Y LO AGREGA A LA BASE DE DATOS
    ///
    public function store(Request $request){
        $Pago=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'proyecto_id'=>'required|integer',
            'numero'=>'required',
            'proyeccion'=>'required',
            'monto'=>'required',
            'justificacion'=>'required',
            'numero_transaccion'=>'required',
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
            $Pago=new Pago();
            $Pago->proyecto_id=$data['proyecto_id'];
            $Pago->numero=$data['numero'];
            $Pago->proyeccion=$data['proyeccion'];
            $Pago->monto=$data['monto'];
            $Pago->justificacion=$data['justificacion'];
            $Pago->numero_transaccion=$data['numero_transaccion'];
            $Pago->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    ///
    ///RECIBE LOS DATOS DEL PAGO, VERIFICA LOS CAMPOS Y LO ACTUALIZA EN LA BASE DE DATOS
    ///
    public function update(Request $request){ 
        $Pago=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        if(!empty($data)){
            $data=array_map('trim',$data);
            $rules=[
                'numero'=>'required',
                'proyeccion'=>'required',
                'monto'=>'required',
                'justificacion'=>'required',
                'numero_transaccion'=>'required',
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
                    $updated=Pago::where('id',$id)->update($data);
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
    ///RECIBE EL ID DEL PAGO Y SI EXISTE LO ELIMINA DE LA BASE DE DATOS
    ///
    public function destroy($id){
        if(isset($id)){
            $deleted=Pago::where('id',$id)->delete();
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
