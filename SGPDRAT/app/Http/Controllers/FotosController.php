<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Fotos;

class FotosController extends Controller
{
    ///
    ///CONSTRUCTOR DE LA CLASE, INYECTA MIDDLEWARE
    ///
    public function __construct()
    {
       // $this->middleware('api.auth');
    }

    ///
    ///RETORNA TODAS LAS INFORMACION DE LAS FOTOS DESDE LA BASE DE DATOS 
    ///
    public function index(){  
        $data=Fotos::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    ///
    ///RETORNA LA INFORMACION DE UNA FOTO A PARTIR DEL ID DE LA MISMA
    ///
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

    ///
    ///OBTIENE LA INFORMACION DE LA FOTO, VERIFICA LOS CAMPOS Y AGREGA LA INFORMACION A LA BASE DE DATOS
    ///
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

    ///
    ///OBTIENE LA INFORMACION DE LA FOTO, VERIFICA LOS CAMPOS Y ACTUALIZA LA INFORMACION A LA BASE DE DATOS
    ///
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

    ///
    ///ELIMINA LA INFORMACION DE UNA FOTO DE LA BASE DE DATOS A PARTIR DEL ID DE LA MISMA
    ///
public function destroy($id){
    if(isset($id)){
        $data=Fotos::find($id);
        $name = $data['nombre'];
        \Storage::disk('fotos')->delete($name);
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

    ///
    ///RECIBE UNA IMAGEN, VERIFICA EL FORMATO Y LA ALMACENA EN LA CARPETA DE FOTOS 
    ///
public function uploadImage(Request $request){
    $image=$request->file('file0');
    $validate=\Validator::make($request->all(),[
        'file0'=>'required|image|mimes:png,jpg,jpeg'
    ]);
    if(!$image || $validate->fails()){
        $response=array(
            'status'=>'error',
            'code'=>406,
            'message'=>'Error al subir la imagen',
           
        );
    }else{
        //$image_name=time().$image->getClientOriginalName();

        $image_name=time().$image->getClientOriginalName();
        
        \Storage::disk('fotos')->put($image_name,\File::get($image));
        $response=array(
            'status'=>'success',
            'code'=>200,
            'message'=>'Imagen cargada correctamente',
            'image'=>$image_name
        );
    }
    return response()->json($response,$response['code']);
}


    ///
    ///OBTIENE UNA IMAGEN DESDE EL DIRECTORIO DE FOTOS
    ///
public function getImage($filename){
    $exist=\Storage::disk('fotos')->exists($filename);
    if($exist){
        $file=\Storage::disk('fotos')->get($filename);
        return new Response($file,200);
    }else{
        $response=array(
            'status'=>'error',
            'code'=>404,
            'message'=>'Imagen no existe'
      );
        return response()->json($response,$response['code']);
    }
}

    ///
    ///OBTIENE LAS FOTOS DE UNA INSPECCION A PARTIR DEL ID DE LA MISMA
    ///
public function getFotosByI($id){  
    $data = Fotos::Where('inspeccion_id',$id)->get();
   return response()->json([
    'status'=>'success',
    'code'=>200,
    'data'=>$data
   ], 200);
}

    ///
    ///OBTIENE LA RUTA DE LAS FOTOS
    ///
public function getRuta($filename){
    return response()->file(storage_path('app/public/fotos/'.$filename));
   
}

    ///
    ///ELIMINA LA FOTO DE UN DIRECTORIO
    ///
public function liberar($name){
    \Storage::disk('fotos')->delete($name);
    return response()->json([
        'status'=>'success',
        'code'=>200,
        'data'=>$name
       ], 200);
 
}

}
