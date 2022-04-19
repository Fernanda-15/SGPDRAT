<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Inspeccion;

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
        $InspeccionID = Inspeccion::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/inspeccion/'.($InspeccionID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteInspeccion()
    {
        $InspeccionID = Inspeccion::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/inspeccion/'.$InspeccionID);
        $response->assertStatus(200, $response->status());
    }
}
