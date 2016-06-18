<?php 
/*
 * PROCESS FORECAST DATA FOR APP
 */
function processData($data) {
    
    // Set timezone for date calculations
    date_default_timezone_set($data['timezone']);
    
    // Detect day/night
    $today = $data['daily']['data'][0]; 
    $time = $data['currently']['time'];
    $sunrise = $today['sunriseTime'];
    $sunset = $today['sunsetTime'];
    $daylight = 'night';
    
    if ($time >= $sunrise && $time < $sunset) {
        $daylight = 'day';
    }
    if ($time > ($sunrise - 3600) && $time < ($sunrise + 3600)){
        $daylight = 'dawn';
    }
    if ($time > ($sunset - 3600) && $time < ($sunset + 3600)){
        $daylight = 'dusk';
    }
    
    // Create time strings
    $time_string = date('H:i', $time);
    
    // Reduce and process daily data
    $dayDataRaw = array_slice($data['hourly']['data'], 0, 20);
    $dayData = [];
    for ($i = 0, $j = 0; $i < count($dayDataRaw); $i += 2, $j++) { 
        $dayData[$j] = $dayDataRaw[$i];
        $dayData[$j]['time'] = date('H:i', $dayDataRaw[$i]['time']);
        $dayData[$j]['temp'] = ceil($dayDataRaw[$i]['temperature']);
    }

    // ProcReduce and process ess weekly data
    $weekData = array_slice($data['daily']['data'], 0, 8);
    foreach ($weekData as &$item) {
        $item['time'] = date('j/n', $item['time']);
        $item['temp'] = ceil($item['temperatureMax']);
    }
    
    // Round temperature
    $temp = ceil($data['currently']['temperature']);
    
    // Create response
    $data = array(
        'time' => $time_string,
        'daylight' => $daylight,
        'temp' => $temp,
        'icon' => $data['currently']['icon'],
        'summary' => $data['currently']['summary'],
        'day' => $dayData,
        'week' => $weekData
    );
    
    return $data;
}