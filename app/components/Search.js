import React, {PropTypes} from 'react';
import Icon from './Icon';

const Search = ({location, onSubmitLocation, onChangeLocation}) => {
    return (
        <form className="search" onSubmit={onSubmitLocation}>
            <div className="search__inner">
                <input
                    className="search__input"
                    placeholder="enter location"
                    type="text"
                    onChange={onChangeLocation}
                    value={location}
                />
                <button className="search__btn" onClick={onSubmitLocation}>
                    <Icon viewBox="0 0 32 32" size="small" icon="submit" />
                </button>
            </div>
        </form>
    );
};

Search.propTypes = {
    location: PropTypes.string,
    onChangeLocation: PropTypes.func.isRequired,
    onSubmitLocation: PropTypes.func.isRequired,
};

export default Search;
