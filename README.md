# Unit Testing and Continuous Integration

# Problem 2 Instructions 
To start, install pytest using
```bash
pip3 install pytest
```
Following that installation, cd into the Automation folder 
```bash
cd Automation
```
In order to run tests, run pytest -v

```bash
pytest -v
```

# Problem 3 Instructions
To setup the database: 

Ensure that XAMPP is installed (https://www.apachefriends.org) and that MySQL Database and Apache Web Server are running

In http://localhost/phpmyadmin/ create a database called rest_api_music_db and generate tables using the following SQL code:

Create Users Table:
```bash
CREATE TABLE users(username VARCHAR(255) PRIMARY KEY, password VARCHAR(255))
```

Create Ratings Table:
```bash
CREATE TABLE ratings(id INTEGER(11) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), artist VARCHAR(255), song VARCHAR(100), rating INTEGER(1), FOREIGN KEY (username) REFERENCES users(username))
```

Move the entire repo into the htdocs folder in xampp:

If you do not have it yet, install homebrew with:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install PHPUnit with:
```bash
brew install phpunit
```

Install Composer with:
```bash
brew install composer
```

If necessary, you can install PHP with:
```bash
brew install php
```
run the following
```bash
cd lyrical-lounge
cd src
cd backend
```

run the following command:
```bash
php vendor/bin/phpunit tests
```

# Problem 4 Instructions
First, cd into the lyrical-lounge folder
```bash
cd lyrical-lounge
```

Next install dependences by using
```bash
npm install
```
To run tests, run npm test
```bash
npm test
```

# Problem 6 Generative AI
For use of Generative AI I used chat GPT. I copied the tutorial for PHP unit testing into Chat GPT to train it and then I asked the followig prompt. 

```bash
Can you write the following unit test function?

testGet_UserList: request the current user list with a GET request and check that the server responds with a 200 response code.
```

I receieved the following response...

<?php

use PHPUnit\Framework\TestCase;

class StackTest extends TestCase
{
   protected $client;

   protected function setUp(): void
   {
      parent::setUp();
      $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost:3306/index.php"]);
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

I altered this code slightly to have it work for my directory. I also later asked how I would pass data as a json through when I need to hardcode a new user to create. From there I just slightly edited each question as the code for each unit test was essentially the same with minor tweaks in the url abd the data being sent over. Overall chat gpt impressed me very much this semester with how useful it was for debugging code and for executing very small and specific functions. 



