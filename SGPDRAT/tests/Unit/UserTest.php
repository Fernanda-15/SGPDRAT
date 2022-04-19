<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    public function test_getUser()
    {
        $response = $this->call('GET','api/user');

        $response->assertStatus(200, $response->status());
    }

    public function test_getSingleUser()
    {
        $userID = User::latest('created_at')->first()->value('id');

        $response = $this->call('GET','api/user/'.($userID));

        $response->assertStatus(200, $response->status());
    }

    public function test_deleteUser()
    {
        $userID = User::latest('created_at')->first()->value('id');
        $response = $this->call('DELETE','api/user/'.$userID);
        $response->assertStatus(200, $response->status());
    }
}
