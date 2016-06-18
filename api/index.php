<?php
/*
 * FORECAST.IO + GOOGLE LOCATION SERVICES API
 */
 
// Shortcuts for request and Response classes
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Load all Composer packages
require '../vendor/autoload.php';
use Slim\App;

// Load helpers & config
$settings = include('../config/config.php');

// Create new slim app
$app = new App($settings);

/*
 * GET LAT/LNG FOR PLACE NAME
 */
$app->get('/location/{location}', function (Request $request, Response $response) {
    $location = urlencode($request->getAttribute('location'));
    $url = "http://maps.googleapis.com/maps/api/geocode/json?address={$location}&sensor=false";
    
    // Query google for location
    $results = file_get_contents($url);
    $json = json_decode($results);
    $status = 200;
    
    // Handle no results
    if ($json->status == "ZERO_RESULTS"){
        $status = 204;
    };
    
    // Get lat and lng values from results
    $lat = $json->results[0]->geometry->location->lat;
    $lng = $json->results[0]->geometry->location->lng;
    
    $data = array('lat' => $lat, 'lng' => $lng);
    
    // Return as json
    $jsonResponse = $response->withJson($data, $status);
    return $jsonResponse;
});

/*
 * GET WEATHER CONDITIONS FOR LOCATION
 */
$app->get('/forecast/{lat},{lng}[/{time}]', function (Request $request, Response $response) {
    $lat = $request->getAttribute('lat');
    $lng = $request->getAttribute('lng');
    $time = $request->getAttribute('time');
    
    $key = $this->settings['API_KEY'];
    $api = 'https://api.forecast.io/forecast';
    $params = '?exclude=minutely,alerts,flags&units=si';
    
    // Query forecast service
    if (isset($time)) {
        $results = file_get_contents("{$api}/{$key}/{$lat},{$lng},{$time}{$params}");
    } else {
        $results = file_get_contents("{$api}/{$key}/{$lat},{$lng}{$params}");
    }
    $arr = json_decode($results, true);
    $processed = processData($arr);

    // Return as json
    $jsonResponse = $response->withJson($processed);
    return $jsonResponse;
});

// Start app
$app->run();