<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Fotos;

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
        $FotosID = Fotos::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/fotos/'.($FotosID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteFotos()
    {
        $FotosID = Fotos::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/fotos/'.$FotosID);
        $response->assertStatus(200, $response->status());
    }
}
