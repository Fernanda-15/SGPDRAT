<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class PagoTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getPago()
    {
        $response = $this->call('GET','api/pago');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSinglePago()
    {
        $response = $this->call('GET','api/pago/1');

        $response->assertStatus(200, $response->status());
    }
}
