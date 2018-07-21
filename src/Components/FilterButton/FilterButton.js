import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FilterButton.css';

const propTypes = {
    filterId : PropTypes.number.isRequired,
    currentFilter : PropTypes.number.isRequired,
    onClick : PropTypes.func.isRequired,
    children : PropTypes.node
};

class FilterButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.filterId);
    }

    render() {
        return (
            <button
                className={classNames(this.props.filterId === this.props.currentFilter ? 'selected-filter' : '')}
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}

FilterButton.propTypes = propTypes;

export default FilterButton;
