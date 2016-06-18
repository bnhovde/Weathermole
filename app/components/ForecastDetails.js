import React, {PropTypes} from 'react';
import Icon from './Icon';

const ForecastDetails = props => {
    const {week = [], day = []} = props.forecastData;
    const visibleDetail = props.visibleDetail;
    const details = visibleDetail === 'week' ? week : day;

    // Find lowpoint for chart height calculation
    const min = Math.min(...details.map(item => item.temp));

    const items = details.map((item, i) => {

        const chartStyle = {
            height: `${item.temp * 2 - min}px`,
        };

        return (
            <div key={i} className="forecast-details__item">
                <div className="chart" style={chartStyle}>
                    <div className="chart__dot"></div>
                    <div className="chart__line"></div>
                </div>
                <div className="card">
                    <div className="card__header">{item.time}</div>
                    <div className="card__icon">
                        <Icon icon={item.icon} size="medium" />
                    </div>
                    <div className="card__footer">{item.temp}&deg;</div>
                </div>
            </div>
        );
    });

    return (
        <div className={`forecast-details forecast-details--${visibleDetail}`}>
            {items}
        </div>
    );
};

ForecastDetails.propTypes = {
    forecastData: PropTypes.object.isRequired,
    visibleDetail: PropTypes.string.isRequired,
};

export default ForecastDetails;
