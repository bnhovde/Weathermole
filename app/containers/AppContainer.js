import React, {Component, PropTypes} from 'react';
import NavBar from '../components/NavBar';

class AppContainer extends Component {
    render() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default AppContainer;
