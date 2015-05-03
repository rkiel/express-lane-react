# Heroku

    heroku auth:login
    heroku apps:create
    heroku config:add NODE_ENV=production
    heroku addons:add redistogo
    heroku logs --tail
    heroku restart

### Procfile

    web: bin/www

### Mongolab

    heroku addons:add mongolab
    heroku addons:docs mongolab
    heroku config|grep MONGOLAB_URI

### pacakge.json

    "engines": {
      "node": "0.10.x",
      "npm": "1.4.x"
    }

