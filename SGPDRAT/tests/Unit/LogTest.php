<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Log;

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
        $LogID = Log::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/log/'.($LogID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteLog()
    {
        $LogID = Log::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/log/'.$LogID);
        $response->assertStatus(200, $response->status());
    }
}
