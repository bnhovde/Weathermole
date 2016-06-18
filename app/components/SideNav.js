import React, {PropTypes} from 'react';
import Icon from './Icon';

const SideNav = props => {
    const {onToggleDetails, visibleDetail, isLoading} = props;

    const navEl = (
        <div className={`side-nav side-nav--${visibleDetail}`}>
            <button className="side-nav__btn side-nav__btn--day" onClick={() => onToggleDetails('day')}>
                <Icon viewBox="0 0 32 32" size="small" icon="clock" />
            </button>
            <button className="side-nav__btn side-nav__btn--week" onClick={() => onToggleDetails('week')}>
                <Icon viewBox="0 0 32 32" size="small" icon="calendar" />
            </button>
        </div>
    );

    return (
        <div>
            {isLoading ? false : navEl}
        </div>
    );
};

SideNav.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onToggleDetails: PropTypes.func.isRequired,
    visibleDetail: PropTypes.string.isRequired,
};

export default SideNav;

