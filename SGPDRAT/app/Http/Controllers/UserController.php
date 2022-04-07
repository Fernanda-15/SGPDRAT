<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth',['except'=>['login','store','index','destroy','update','show']]);
    }

    public function test(Request $request){
        return "Test Controlador Usuario";
    }

    public function login(Request $request){
        $jwtAuth= new JwtAuth();
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'nombreUsuario'=>'required|alpha',
            'contrasena'=>'required'
        ];
        $validate=\validator($data,$rules);
        if($validate->fails()){
            $response=array(
                'status'=>'error',
                'code'=>'406',
                'message'=>'Los datos enviados son incorrectos',
                'errors'=>$validate->errors()
            );
        }
        else{
            $response=$jwtAuth->signin($data['nombreUsuario'],$data['contrasena']);
        }
        if(isset($response['code'])){
            return response()->json($response,$response['code']);
        }else{
            return response()->json($response,200);
        }
    }

    public function getIdentity(Request $request){ 
        $jwtAuth=new JwtAuth();
        $token=$request->header('token');
        $response=$jwtAuth->verify($token,true); 
        return $response;
    }

    public function register(Request $request){
        return "Registro de Usuario";
    }

    public function index(){  
        $data=User::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    public function show($id){  //BUSQUEDA POR ID
        $data=User::find($id);  //BUSCA EL ID EN LA DB
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

    //PARA DESABILITAR VERIFICACION CSRF  app/Http/Kernel.php
    public function store(Request $request){
        $user=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'nombreUsuario'=>'required|alpha',
            'contrasena'=>'required',
            'nombre'=>'required',
            'cedula'=>'required',
            'telefono'=>'required',
            'correo'=>'required|email|unique:users',
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
            $user=new User();
            $user->nombreUsuario=$data['nombreUsuario'];
            $user->contrasena=hash('sha256',$data['contrasena']);
            //$user->contrasena=$data['contrasena'];
            $user->rol=$data['rol']; // Tipos de Roles -> admin | |
            $user->nombre=$data['nombre'];
            $user->cedula=$data['cedula'];
            $user->telefono=$data['telefono'];
            $user->correo=$data['correo'];
            $user->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    public function update(Request $request){ 
        $user=$request;
            $json=$request->input('json',null);
            $data=json_decode($json,true);
            if(!empty($data)){
                $data=array_map('trim',$data);
                $rules=[
                    'nombreUsuario'=>'required|alpha',
                    'contrasena'=>'required',
                    'nombre'=>'required',
                    'cedula'=>'required',
                    'telefono'=>'required',
                    'correo'=>'required|email|',
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
                        $updated=User::where('id',$id)->update($data);
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
            $deleted=User::where('id',$id)->delete();
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

    public function updateRole(Request $request){
        $user=$request;
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'id'=>'required|integer',
            'rol'=> 'required|alpha',
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
            $user=User::find($data['id']);
            if(is_object($user)){
                $user->rol = $data['rol'];
                $user->save();
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
        return response()->json($response,$response['code']);
    }
    }

    public function getRole($id){  //BUSQUEDA POR ID
        info($id);
        $data=User::find($id);  //BUSCA EL ID EN LA DB
        if(is_object($data)){  //VERIFICA SI ES OBJETO
            $response=array(
                'status'=>'success',
                'code'=>200,
                'data'=>$data->rol 
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

}
