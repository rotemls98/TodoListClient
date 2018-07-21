import React, {Component} from "react";
import PropTypes from 'prop-types';
import Todo from "./Todo/Todo";
import './TodoList.css';

const propTypes = {
    todos: PropTypes.array.isRequired,
    onUpdateTodo : PropTypes.func.isRequired,
    onDeleteTodo : PropTypes.func.isRequired
}

export default class TodoList extends Component {


    render() {
        return (
            <div className="todolist-container">
                {this.props.todos.map(todo =>
                    <Todo key={todo.id}
                          id={todo.id}
                          name={todo.name}
                          isComplete={todo.isComplete}
                          onToggle={this.props.onUpdateTodo}
                          onEdit={this.props.onUpdateTodo}
                          onDelete={this.props.onDeleteTodo}
                    />
                )}
            </div>
        )
    }
}

TodoList.propTypes = propTypes;