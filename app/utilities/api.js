import 'whatwg-fetch';

const getLngLat = function (location) {
    return fetch(`/api/index.php/location/${encodeURIComponent(location)}`)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
};

const getForecast = function ({lat, lng}) {
    return fetch(`/api/index.php/forecast/${lat},${lng}`)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
};

export {
    getLngLat,
    getForecast,
};
