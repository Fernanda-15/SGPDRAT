<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Proyecto;

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

    public function test_getSingleProyecto()
    {
        $ProyectoID = Proyecto::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/proyecto/'.($ProyectoID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteProyecto()
    {
        $ProyectoID = Proyecto::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/proyecto/'.$ProyectoID);
        $response->assertStatus(200, $response->status());
    }
}
