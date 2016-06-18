import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import AppContainer from './containers/AppContainer';
import SearchContainer from './containers/SearchContainer';
import ForecastContainer from './containers/ForecastContainer';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={SearchContainer} />
            <Route path="forecast/:location" component={ForecastContainer} />
        </Route>
    </Router>
);
