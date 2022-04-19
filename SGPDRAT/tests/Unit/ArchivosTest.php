<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

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
        $response = $this->call('GET','api/archivos/1');

        $response->assertStatus(200, $response->status());
    }
}
