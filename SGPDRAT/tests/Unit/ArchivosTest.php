<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Archivos;

class ArchivosTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getArchivos()
    {
        $response = $this->call('GET','api/archivos');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleArchivos()
    {
        $ArchivosID = Archivos::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/archivos/'.($ArchivosID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteArchivos()
    {
        $ArchivosID = Archivos::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/archivos/'.$ArchivosID);
        $response->assertStatus(200, $response->status());
    }
}
