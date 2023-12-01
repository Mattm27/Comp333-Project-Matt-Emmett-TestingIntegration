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



