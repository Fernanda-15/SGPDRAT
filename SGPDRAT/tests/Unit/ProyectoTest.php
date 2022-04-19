<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class ProyectoTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getProyecto()
    {
        $response = $this->call('GET','api/proyecto');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleproyecto()
    {
        $response = $this->call('GET','api/proyecto/1');

        $response->assertStatus(200, $response->status());
    }
}
