import React, {Component, PropTypes} from 'react';
import Forecast from '../components/Forecast';
import ForecastDetails from '../components/ForecastDetails';
import SideNav from '../components/SideNav';
import {getLngLat, getForecast} from '../utilities/api';

class ForecastContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            forecastData: {
                time: 0,
                timezone: '',
                icon: '',
                offset: '',
                temp: 0,
            },
            visibleDetail: 'none',
            isLoading: true,
            isError: false,
            expanded: false,
        };
    }

    componentDidMount() {
        this.getForecast(this.props.routeParams.location);
    }

    getForecast(location) {
        return getLngLat(location)
            .then(getForecast)
            .then(forecastData => {
                return this.setState({
                    forecastData,
                    location,
                    isLoading: false,
                });
            })
            .catch(() => {
                return this.setState({
                    isError: true,
                    isLoading: false,
                });
            });
    }

    handleToggleDetails(type) {
        const newType = this.state.visibleDetail === type ? 'none' : type;
        this.setState({
            visibleDetail: newType,
        });
    }

    render() {
        return (
            <div>
                <Forecast
                    location={this.state.location}
                    isError={this.state.isError}
                    isLoading={this.state.isLoading}
                    forecastData={this.state.forecastData}
                    visibleDetail={this.state.visibleDetail}
                />
                <SideNav
                    onToggleDetails={type => this.handleToggleDetails(type)}
                    isLoading={this.state.isLoading}
                    visibleDetail={this.state.visibleDetail}
                />
                <ForecastDetails
                    forecastData={this.state.forecastData}
                    visibleDetail={this.state.visibleDetail}
                />
            </div>
        );
    }
}

ForecastContainer.propTypes = {
    routeParams: PropTypes.object,
};

ForecastContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default ForecastContainer;
