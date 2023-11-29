<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class ListTest extends PHPUnit\Framework\TestCase
{
   protected $client;

   protected function setUp(): void
   {
      parent::setUp();
      $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost:80/Comp333-Project-Matt-Emmett-TestingIntegration/lyrical-lounge/src/backEnd/index.php"]);
   }

   public function testGet_UserList()
   {
      $response = $this->client->request('GET', 'index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   public function tearDown(): void
   {
      parent::tearDown();
      $this->client = null;
   }
}
?>

