<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    public function test_getUser()
    {
        $response = $this->call('GET','api/user');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleUser()
    {
        $response = $this->call('GET','api/user/1');

        $response->assertStatus(200, $response->status());
    }

    public function test_insertUser(){
        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Accept'] = 'application/json';

        $data = array(
            'nombreUsuario'=>'test',
            'contrasena'=>'test',
            'nombre'=>'test',
            'cedula'=>'test',
            'telefono'=>'test',
            'correo'=>'test'
        );

        $json = json_encode($data);

        $this->post('api/user', $json,)
        ->assertStatus(200);
    }
}
