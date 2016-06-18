
### WeatherMole

> Because why not?

React, ES6, Weather!

[Live Demo](https://bardhovde.com/weather/)

* Shows you weather & local time for a given location
* Daily hourly breakdown view
* 7-day forecast view
* Changes colour based on time at location (day/night/dawn/dusk)
* It's got a mole


### Requirements

PHP 5.3.2+
Composer
node (latest)

### Local installation

* `npm install`
* Composer install (`php composer.phar install`) 
* Register with [forecast.io](http://forecast.io) to get your api key
* Make a copy of config/config.sample.php and fill in your correct API_KEY
* Make the /api folder accessible via apache/nginx
* In `webpack.config.js`, replace proxy/target with the apache/nginx api url


### Developing

* `npm run dev` to serve local dev version

### Deploying

* `npm run prod` to create the dist version.

### API

The php API is built with slimPHP and located in the `api` folder.

The API has the following endpoints:

* `/location/{location name}` - Returns lat/long coordinates for a location:
```
{
    "lat": -33.9248685,
    "lng": 18.4240553
}
```
* `/forecast/{latitude},{longitude}` - Returns the forecast for a location:
```
{
    "time": 12:00,
    "temp": 14,
    "icon": 'rain-day',
    "daylight": "day",
    "summary": 'Heavy rain all day',
    "day": [
        { "time": 00:00, "icon": 'clear-night', "temp": 11}
        { "time": 01:00, "icon": 'clear-night', "temp": 12}
        ...
    ],
    "week": [
        { "date": 13/4, "icon": 'clear-night', "temp": 11}
        { "date": 14/4, "icon": 'clear-night', "temp": 12}
        ...
    ]
}
```

### Limitations

The google location lookup limit is `2,500` per day
The forecast.io lookup limit is `1000` per day

### Credits

Uses the awesome "Clean weather icons" by [www.artill.de](http://www.artill.de)