<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Tarea;

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
        $TareaID = Tarea::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/tarea/'.($TareaID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteTarea()
    {
        $TareaID = Tarea::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/tarea/'.$TareaID);
        $response->assertStatus(200, $response->status());
    }
}
