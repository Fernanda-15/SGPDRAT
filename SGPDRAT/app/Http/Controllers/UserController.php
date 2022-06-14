<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    ///
    ///CONSTRUCTOR DE LA CLASE, SE INYECTA EL MIDDLEWARE
    ///
    public function __construct()
    {
        $this->middleware('api.auth',['except'=>['login','store','index','destroy','update','show','getIdentity']]);
    }

    ///
    /// TEST USUARIO
    ///
    public function test(Request $request){
        return "Test Controlador Usuario";
    }

    ///
    ///LOGIN -> RECIBE USERNAME Y PASSWORD, VERIFICA LAS CREDENCIALES CON EL JWTAUTH Y RETORNA EL SIGN IN
    ///
    public function login(Request $request){
        $jwtAuth= new JwtAuth();
        $json=$request->input('json',null);
        $data=json_decode($json,true);
        $data=array_map('trim',$data);
        $rules=[
            'nombreUsuario'=>'required',
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


    ///
    ///OBTIENE LA IDENTIDAD LOGEADA
    ///
    public function getIdentity(Request $request){ 
        $jwtAuth=new JwtAuth();
        $token=$request->header('token');
        $response=$jwtAuth->verify($token,true); 
        return $response;
    }


    ///
    ///NO TIENE FUNCIONALIDAD
    ///
    public function register(Request $request){
        return "Registro de Usuario";
    }


    ///
    ///RETORNA TODOS LOS USUARIOS 
    ///
    public function index(){  
        $data=User::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///BUSCA UN USUARIO POR ID Y SI EXISTE LO RETORNA
    ///
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


    ///
    ///RECIBE UN REQUEST CON LOS DATOS DEL USUARIO, VERIFICA QUE LOS CAMPOS ESTEN CORRECTOS
    ///CREA UNA NUEVA ENTIDAD USER, ENCRIPTA LA CONTRASENA Y LO ALMACENA EN LA BASE DE DATOS
    ///
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

    ///
    ///RECIBE UN REQUEST CON LOS DATOS DEL USUARIO A ACTUALIZAR, VERIFICA LOS CAMPOS
    ///Y ACTUALIZA EL USUARIO EN LA BASE DE DATOS
    ///
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

    ///
    ///RECIBE UN ID Y ELIMINA EL USUARIO CON ESE ID EN LA BASE DE DATOS
    ///
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

    ///
    ///RECIBE EL ID Y EL ROL DEL USUARIO Y LO ACTUALIZA
    ///
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

    ///
    ///BUSCA POR ID EL USUARIO Y RETORNA EL ROL DEL MISMO
    ///
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