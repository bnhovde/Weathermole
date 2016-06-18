import React from 'react';
import {Link} from 'react-router';
import Icon from './Icon';

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">
                <h1 className="navbar__title">weathermole</h1>
            </Link>
            <Link to="/">
                <Icon viewBox="0 0 32 32" size="small" icon="search" />
            </Link>
        </div>
    );
};

export default NavBar;
