<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;

class LogTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getLog()
    {
        $response = $this->call('GET','api/log');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleLog()
    {
        $response = $this->call('GET','api/log/1');

        $response->assertStatus(200, $response->status());
    }
}
