import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Todo.css';

const propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    onEdit : PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEdit: false
        }

        this.editField = React.createRef();
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDoubleClick() {
        this.setState({isEdit: true}, () => this.editField.current.focus());
    }

    handleNameChange(newName) {
        const {id} = this.props;
        if (newName.trim().length) {
            const { name } = this.props
            if ( newName !== name) {
                const {onEdit, isComplete} = this.props;
                onEdit(id, {
                    name: newName,
                    isComplete: isComplete
                });
            }
        }
        // If the new name is empty or contain only space delete it
        else {
            this.props.onDelete(id)
        }
    }

    handleBlur() {
        this.setState({isEdit: false});
        this.handleNameChange(this.editField.current.value)
    }

    handleToggle() {
        const {id, onToggle, isComplete, name } = this.props;
        onToggle(id, {
            name : name,
            isComplete : !isComplete
        });
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.setState({isEdit: false}); // call the blur event
        }
        else if (e.keyCode === 27) {
            this.editField.current.value = this.props.name; // when escape is pressed return the intial value
            this.setState({isEdit: false});
        }

    }

    handleClick() {
        this.props.onDelete(this.props.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name ||
            nextState.isEdit !== this.state.isEdit ||
            nextProps.isComplete !== this.props.isComplete;
    }

    render() {
        const {name, isComplete} = this.props;
        const {isEdit} = this.state;
        return (
            <div className={classNames('todo-wrapper', !isEdit ? 'view' : 'edit')}>
                <input
                    type='checkbox'
                    className='todo-checkbox'
                    checked={isComplete}
                    onChange={this.handleToggle}
                />
                <div
                    className={classNames('todo-name', isComplete ? 'completed' : '')}
                    onDoubleClick={this.handleDoubleClick}>
                    {name}
                </div>
                <input
                    defaultValue={name}
                    ref={this.editField}
                    type='text'
                    className='todo-edit'
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown}
                />
                <button className='delete-todo' onClick={this.handleClick}/>
            </div>
        );
    }
}

Todo.propTypes = propTypes;

export default Todo;
