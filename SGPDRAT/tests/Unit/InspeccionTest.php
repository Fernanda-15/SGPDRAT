<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class InspeccionTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getInspeccion()
    {
        $response = $this->call('GET','api/inspeccion');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleInspeccion()
    {
        $response = $this->call('GET','api/inspeccion/1');

        $response->assertStatus(200, $response->status());
    }
}
