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
   //test gor getting the list
   public function testGet_UserList()
   {
      $response = $this->client->request('GET', 'index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   //test for creating a user
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
      //adding a new user to the databse so we can add a rating for this user
      $postData1 = [
         'username' => "NewUserForNewSongTest",
         'password' => "newPassword",
         'confirm_password' => "newPassword",
      ];

        $response1 = $this->client->request('POST', 'index.php/user/create', [
         'body' => json_encode($postData1),
        ]);

      //data for rating to be added
      $postData = [
         'artist' => 'NewArtist',
         'username' => 'NewUserForNewSongTest',
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
      //create a new user to ensure the user is in the database before trying to login
      $postData1 = [
         'username' => "UserLoginTest",
         'password' => "newPassword",
         'confirm_password' => "newPassword",
      ];
        $response1 = $this->client->request('POST', 'index.php/user/create', [
         'body' => json_encode($postData1),
        ]);

      //data for testing if the suer we just created can log in
      $postData = [
         'username' => 'UserLoginTest',
         'password' => 'newPassword',
      ];

      $response = $this->client->request('POST', 'index.php/user/login', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(201, $response->getStatusCode());
   }


   public function testPost_FailedLogin()
   {
      //checking to ensure a user who does not exist in our database can not log in
      $postData = [
         'username' => 'TestUserDNE',
         'password' => 'PasswordDNE',
      ];

      $response = $this->client->request('POST', 'index.php/user/login', [
        'body' => json_encode($postData),
      ]);

      $this->assertEquals(202, $response->getStatusCode());
   }

   //for this test to pass you must add a rating with ID 102 to our rating database
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

   //for this test to work make sure there is a rating in your database with the ID of 98
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

