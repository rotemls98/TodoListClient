import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onAddTodo : PropTypes.func.isRequired,
};

class AddTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    hanldeAddTodo(value) {
        if (value.trim().length) {
            this.props.onAddTodo(value);
            this.setState({ value : '' });
        }
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.hanldeAddTodo(this.state.value);
        }
    }

    handleChange(e) {
        this.setState({ value : e.target.value });
    }

    render() {
        return (
            <input type='text'
                   value={this.state.value}
                   onChange={this.handleChange}
                   placeholder='what you need to do'
                   onKeyDown={this.handleKeyDown}
            />
        );
    }
}

AddTodo.propTypes = propTypes;

export default AddTodo;
