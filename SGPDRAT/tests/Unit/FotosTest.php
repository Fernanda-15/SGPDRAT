<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class FotosTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getFotos()
    {
        $response = $this->call('GET','api/fotos');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleFotos()
    {
        $response = $this->call('GET','api/fotos/1');

        $response->assertStatus(200, $response->status());
    }
}
