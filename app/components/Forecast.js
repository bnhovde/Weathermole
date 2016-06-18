import React, {PropTypes} from 'react';
import Icon from './Icon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Forecast = props => {
    const {time, icon, temp, daylight} = props.forecastData;
    const state = props.visibleDetail === 'none' ? 'none' : 'expanded';
    const stateClass = `forecast--${state}`;

    const loadingEl = (
        <div key="loading" className="forecast__inner l-screen">
            <div className="loader">
                <Icon icon="loader" viewBox="0 0 32 32" size="medium" />
            </div>
        </div>
    );

    const errorEl = (
        <div key="error" className="forecast__inner l-screen">
            <p>Location not found..</p>
        </div>
    );

    const forecastEl = (
        <div key="forecast" className="forecast__inner l-screen">
            <div className="forecast__icon">
                <Icon icon={icon} size="large" />
            </div>
            <div className="forecast__details">
                <time className="forecast__time">{time}</time>
                <h2 className="forecast__location">{props.location}</h2>
                <span className="forecast__temp">{temp}</span>
            </div>
        </div>
    );

    const results = props.isError ? errorEl : forecastEl;

    return (
        <div className={`forecast l-screen forecast--${daylight} ${stateClass}`}>
            <ReactCSSTransitionGroup transitionName="forecast-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {props.isLoading ? loadingEl : results}
            </ReactCSSTransitionGroup>
        </div>
    );
};

Forecast.propTypes = {
    forecastData: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    visibleDetail: PropTypes.string.isRequired,
};

export default Forecast;
