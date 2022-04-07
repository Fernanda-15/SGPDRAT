<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) //intercepta peticiones y revisa si tiene token
    // pa entrar a ruta 
    {
        $jwtAuth=new JwtAuth();
        $token=$request->header('token');
        $logged=$jwtAuth->verify($token);
        if($logged){
            return $next($request);
        }else{
            $response=array(
                'status'=>'error',
                'code'=>401,
                'message'=>'No tiene privilegios para acceder a este recurso'
            );
            return response()->json($response,$response['code']);
        } 
        
    }
}
