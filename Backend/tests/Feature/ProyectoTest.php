<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProyectoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */


    public function test_getUser()
    {
        $response = $this->call('GET','/api/proyecto');

        $response->assertStatus(200, $response->status());
    }

    public function test_getUser1()
    {
        $response = $this->call('GET','/api/proyecto/1');

        $response->assertStatus(200, $response->status());
    }
}
