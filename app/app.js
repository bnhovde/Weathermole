import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

// Stylesheets
require('./styles/app.scss');

ReactDOM.render(routes, document.getElementById('app'));
