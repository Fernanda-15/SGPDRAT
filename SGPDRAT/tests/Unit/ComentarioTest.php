<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Comentario;

class ComentarioTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getComentario()
    {
        $response = $this->call('GET','api/comentario');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleComentario()
    {
        $ComentarioID = Comentario::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/comentario/'.($ComentarioID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteComentario()
    {
        $ComentarioID = Comentario::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/comentario/'.$ComentarioID);
        $response->assertStatus(200, $response->status());
    }
}
