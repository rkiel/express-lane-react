# Features

* User Interace with Bootstrap & jQuery
* Technology stack of Node and MongoDB
* NPM modules including Express, Jade, Mongoose
* Development environment using Vagrant
* Deployment environment using Heroku
* Testign using Mocha, Chai, Sinon, and jsHint

# Installation

### Clone the repository

    mkdir -p ~/GitHub/rkiel
    cd ~/GitHub/rkiel
    git clone git@github.com:rkiel/express-lane.git MY-NEW-PROJECT

### Make it your own

    cd MY-NEW-PROJECT
    rm -rf .git
    git init
    git add .
    git commit -m "Initial commit"

### Startup development environment

    vagrant up
    vagrant ssh express

    cd /vagrant
    npm install

### Run the tests

    npm test

### Start your application

    ./bin/www

### Login to your application

* [http://192.168.33.60:3000/](http://192.168.33.60:3000/)

### Deploy to Heroku

    heroku auth:login
    heroku apps:create --addons mongolab
    heroku config:add COOKIE_SECRET="So Long, and Thanks for All the Fish"
    git push heroku master
    heroku open

# Acknowledgements

* [Code School - Building Blocks of Express](https://www.codeschool.com/courses/building-blocks-of-express-js)
* [Code School - Soup to Bits: Building Blocks of Express](https://www.codeschool.com/screencasts/soup-to-bits-building-blocks-of-express-js)
* [Code School - Blasting Off with Bootstrap](https://www.codeschool.com/courses/blasting-off-with-bootstrap)
* [Everything You Ever Wanted to Know about Node Authentication by Randall Degges](https://www.youtube.com/watch?v=FkPqcIJvEPk)
* [MongoDB for Node.js Developers - Week 7 Mongoose](https://university.mongodb.com/courses/M101JS/about)
