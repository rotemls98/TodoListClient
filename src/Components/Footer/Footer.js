import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterButton from "./FilterButton";
import { SHOW_STATE} from "./TodoListContainer";



const propTypes = {
    currentFilter : PropTypes.number.isRequired,
    onFilter : PropTypes.func.isRequired,
};

class Footer extends Component {



    render() {
        const {onFilter, currentFilter} = this.props;
        return (
            <div>
                <FilterButton
                    filterId={SHOW_STATE.ALL}
                    onClick={onFilter}
                    currentFilter = {currentFilter}>
                    All
                </FilterButton>
                <FilterButton
                    filterId={SHOW_STATE.COMPLETED}
                    onClick={onFilter}
                    currentFilter = {currentFilter}>
                    Completed
                </FilterButton>
                <FilterButton
                    filterId={SHOW_STATE.ACTIVE}
                    onClick={onFilter}
                    currentFilter = {currentFilter}>
                    Active
                </FilterButton>
            </div>
        );
    }
}

Footer.propTypes = propTypes;

// Footer.defaultProps = {
//     currentfilter : SHOW_STATE.ALL
// }

export default Footer;
