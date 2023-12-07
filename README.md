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
cd backEnd
```

run the following command:

```bash
php vendor/bin/phpunit tests
```

Note the following:

- Some tests are reliant on that there is a user name NewUserTest in the database.So run the following command twice(the first time it creates the NewUserTest and adds it to the databse)

```bash
php vendor/bin/phpunit tests
```

- Delete song opperates of the idea that there is a song with id of 102 so you can manually add a rating with id 102 to the ratings database

- update song test relies on the fact there is a song with id of 98 in the ratings database so manually add a song with id of 98 to the database

# Problem 4 Instructions

First, cd into the lyrical-lounge folder

```bash
cd lyrical-lounge
```

Next install dependencies by using

```bash
npm install
```

To run tests, run npm test

```bash
npm test
```

# Problem 6 Generative AI
For the use of Generative AI we used Chat GPT. We copied the tutorial for PHP unit testing into Chat GPT to train it and then we asked the following prompt. 

```bash
Can you write the following unit test function?

testGet_UserList: request the current user list with a GET request and check that the server responds with a 200 response code.
```

We received the following response...

```bash
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
```
We altered this code slightly to have it work for my directory. We also later asked how we could pass data as a json through when we need to hardcode a new user to create. From there we just slightly edited each question as the code for each unit test was essentially the same with minor tweaks in the url and the data being sent over. Overall Chat GPT impressed us very much this semester with how useful it was for debugging code and for executing very small and specific functions. At this point in time, it seems that Chat GPT is useful as a way to supplement the work you are doing, especially in the scope of software engineering as it has not yet proved that it can completely output large projects as the result of a single prompt.   

In the event something is not working for some reason please contact either eschillinger@wesleyan.edu or msmay@wesleyan.edu

Additionally here are screenshots to serve as proof all our tests are passing as expected...
![UnitTests](https://github.com/eschillinger7/Comp333-Project-Matt-Emmett-TestingIntegration/assets/144485976/044c9773-05b8-4a7b-bb2d-421fb0998fbb)
![Pytest](https://github.com/eschillinger7/Comp333-Project-Matt-Emmett-TestingIntegration/assets/144485976/c8937433-43aa-4299-941d-9e0ac5ea13d9)
![BackEndTests](https://github.com/eschillinger7/Comp333-Project-Matt-Emmett-TestingIntegration/assets/144485976/97fc52c9-5a7d-4552-97e8-34d9b9d23f53)
![FrontEndTests](https://github.com/eschillinger7/Comp333-Project-Matt-Emmett-TestingIntegration/assets/144485976/2c748e9b-9271-4af4-913a-acb69a15669a)


