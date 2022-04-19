<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class TareaTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getTarea()
    {
        $response = $this->call('GET','api/tarea');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleTarea()
    {
        $response = $this->call('GET','api/tarea/1');

        $response->assertStatus(200, $response->status());
    }
}
