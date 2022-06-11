<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Archivos;

class ArchivosController extends Controller
{
    public function __construct()
    {
       // $this->middleware('api.auth');
    }
    
    public function index(){  
        $data=Archivos::all(); //OBTIENE TODOS LOS REGISTROS EN LA DB
        $response=array(
            'status'=>'success',
            'code'=>200,
            'data'=>$data
        );
        return response()->json($response,200);
    }

    public function show($id){  
        $data=Archivos::find($id);  
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
        $archivos=$request;
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
            $archivos=new Archivos();
            $archivos->inspeccion_id=$data['inspeccion_id'];
            $archivos->nombre=$data['nombre'];
            $archivos->save();
            $response=array(
                'status'=>'success',
                'code'=>200,
                'message'=>'Datos almacenados exitosamente'
            );
        }
        return response()->json($response,$response['code']);
    }

    public function update(Request $request){ 
        $archivos=$request;
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
                    $updated=Archivos::where('id',$id)->update($data);
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
        $data=Archivos::find($id);
        $name = $data['nombre'];
        \Storage::disk('archivos')->delete($name);
        $deleted=Archivos::where('id',$id)->delete();
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

public function uploadArchivo(Request $request){
    $file=$request->file('file0');
    $validate=\Validator::make($request->all(),[
        'file0'=>'required|file|mimes:pdf,txt,docx'
    ]);
    if(!$file || $validate->fails()){
        $response=array(
            'status'=>'error',
            'code'=>406,
            'message'=>'Error al subir la imagen',
           
        );
    }else{
        $file_name=time().$file->getClientOriginalName();
        \Storage::disk('archivos')->put($file_name,\File::get($file));
        $response=array(
            'status'=>'success',
            'code'=>200,
            'message'=>'Imagen cargada correctamente',
            'file'=>$file_name
        );
    }
    return response()->json($response,$response['code']);
}
public function getArchivosByI($id){  
    $data = Archivos::Where('inspeccion_id',$id)->get();

   return response()->json([
    'status'=>'success',
    'code'=>200,
    'data'=>$data
   ], 200);
}


public function getDocumentos($filename){
    $exist=\Storage::disk('archivos')->exists($filename);
    if($exist){
        $file=\Storage::disk('archivos')->get($filename);
        return new Response($file,200);
    }else{
        $response=array(
            'status'=>'error',
            'code'=>404,
            'message'=>'Archivo no existe'
      );
        return response()->json($response,$response['code']);
    }
}

public function getRuta($filename){
    return response()->file(storage_path('app/public/archivos/'.$filename));
   
}

}
