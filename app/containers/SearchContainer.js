import React, {Component, PropTypes} from 'react';
import Search from '../components/Search';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
        };
    }

    handleChangeLocation(ev) {
        this.setState({
            location: ev.target.value,
        });
    }

    handleSubmitLocation(ev) {
        ev.preventDefault();
        this.context.router.push(`/forecast/${this.state.location}`);
    }

    render() {
        return (
            <div className="l-screen">
                <Search
                    onChangeLocation={ev => this.handleChangeLocation(ev)}
                    onSubmitLocation={ev => this.handleSubmitLocation(ev)}
                    location={this.state.location}
                />
                <ReactCSSTransitionGroup
                    transitionName="mole"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear
                    transitionAppearTimeout={600}
                >
                    <div className="mole">
                        <img src="assets/images/mole-body.svg" />
                        <div className="mole__hand">
                            <img src="assets/images/mole-hand.svg" />
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

SearchContainer.propTypes = {
    query: PropTypes.string,
};

SearchContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default SearchContainer;
