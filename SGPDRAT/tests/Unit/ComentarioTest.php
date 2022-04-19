<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class ComentarioTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getComentario()
    {
        $response = $this->call('GET','api/comentario');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleComentario()
    {
        $response = $this->call('GET','api/comentario/1');

        $response->assertStatus(200, $response->status());
    }
}
