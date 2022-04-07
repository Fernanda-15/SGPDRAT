<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use Exception;


class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

     use WithoutMiddleware;

    public function test_getUser()
    {
        $response = $this->call('GET','/api/user');

        $response->assertStatus(200, $response->status());
    }

    public function test_getUser1()
    {
        $response = $this->call('GET','/api/user/1');

        $response->assertStatus(200, $response->status());
    }

    public function test_postUser()
    {
        $data=[
            'nombreUsuario' => 'admin',
            'contrasena' => 'admin',
            'rol' => 'admin',
            'nombre' => 'admin',
            'cedula'=>'123',
            'telefono' => '123',
            'correo' => 'testing@correo.com'
        ];
        $response = $this->postJson('/api/user', $data);
        $response->assertStatus(201);
    }
}
