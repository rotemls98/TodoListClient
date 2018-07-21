import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value : PropTypes.string,
    onKeyDown : PropTypes.func,
    onBlur : PropTypes.func,
    onChange : PropTypes.func,
    placeholder : PropTypes.string,
}


class TextField extends Component {


    render() {
        const { onKeyDown, onBlur, placeholder, value, onChange } = this.props;
        return (
            <input type='text'
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   onBlur={onBlur}
                   value={value}
                   placeholder={placeholder}
            />
        );
    }
}

TextField.propTypes = propTypes;

export default TextField;
