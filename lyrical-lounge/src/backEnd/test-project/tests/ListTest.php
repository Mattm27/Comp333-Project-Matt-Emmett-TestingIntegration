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

   public function testPost_CreateUser()
    {
      $postData = [
         'username' => "NewUserTest",
         'password' => "newPassword",
         'confirm_password' => "newPassword",
      ];

        $response = $this->client->request('POST', 'index.php/user/create', [
         'body' => json_encode($postData),
        ]);

        $this->assertEquals(201, $response->getStatusCode());
    }


   public function testPost_NewSong()
   {
      $postData = [
         'artist' => 'NewArtist',
         'username' => 'beefBoss',
         'song' => 'NewSongByJustinBeiber',
         'rating' => 5, 
         'id' => 130, 
      ];

      $response = $this->client->request('POST', 'index.php/rating/create', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(201, $response->getStatusCode());
   }

   public function testPost_LoginUser()
   {
      $postData = [
         'username' => 'NewUserTest',
         'password' => 'newPassword',
      ];

      $response = $this->client->request('POST', 'index.php/user/login', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(201, $response->getStatusCode());
   }


   public function testPost_FailedLogin()
   {
      $postData = [
         'username' => 'TestUser',
         'password' => 'PasswordDNE',
      ];

      $response = $this->client->request('POST', 'index.php/user/login', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(202, $response->getStatusCode());
   }

   public function testPost_DeleteSong()
   {
      
      $postData = [
         'id' => 102, 
      ];

      $response = $this->client->request('POST', 'index.php/rating/delete', [
         'body' => json_encode($postData),
      ]);

      $this->assertEquals(200, $response->getStatusCode());
   }

   public function testPost_updateSong()
   {
      $postData = [
         'artist' => 'TestArtistEdit',
         'song' => 'TestSongEdited',
         'rating' => 5, 
         'id' => 98, 
      ];

      $response = $this->client->request('POST', 'index.php/rating/edit', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(201, $response->getStatusCode());
   }

   public function tearDown(): void
      {  
         parent::tearDown();
         $this->client = null;
   }
}
?>

