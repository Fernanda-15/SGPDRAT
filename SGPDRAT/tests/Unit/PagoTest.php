<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Pago;

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
        $PagoID = Pago::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/pago/'.($PagoID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deletePago()
    {
        $PagoID = Pago::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/pago/'.$PagoID);
        $response->assertStatus(200, $response->status());
    }
}
