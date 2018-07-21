import React, {Component, Fragment} from 'react';
import {addTodo, deleteTodo, getTodos, updateTodo} from "../TodoRequests/TodoRequests";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Footer from "./Footer";
import Busy from "./Busy";

export const SHOW_STATE = {
    ALL: 1,
    COMPLETED: 2,
    ACTIVE: 3
}

export default class TodoListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            isLoaded: false,
            show: SHOW_STATE.ALL
        }

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        this.handleRefresh();
    }

    handleRefresh() {
        return getTodos(this.state.show).then(j => {
            this.setState({todos: j, isLoaded: true})
        });
    }

    handleAddTodo(value) {
        this.setState({isLoaded: false});
        addTodo(value).then(this.handleRefresh);
    }

    // update todo without refreshing the list
    handleUpdateTodo(id, newTodo) {
        updateTodo(id, newTodo).then(() => {
            let newTodos = this.state.todos.map(todo => {
                return todo.id !== id ? todo : {...todo, ...newTodo}
            });
            if (this.state.show !== SHOW_STATE.ALL) {
                newTodos = newTodos.filter(todo => {
                    return (todo.isComplete && this.state.show === SHOW_STATE.COMPLETED) ||
                    (!todo.isComplete && this.state.show === SHOW_STATE.ACTIVE)
                });
            }
            this.setState({todos: newTodos});
        });
    }

    handleDeleteTodo(id) {
        this.setState({isLoaded: false});
        deleteTodo(id).then(this.handleRefresh);
    }

    handleFilter(showState) {
        if (showState !== this.state.show) {
            this.setState({ isLoaded : false, show : showState}, this.handleRefresh);
        }
    }


    render() {
        const {isLoaded, todos, show} = this.state;
        return (
            <Fragment>
                <AddTodo onAddTodo={this.handleAddTodo}/>
                <Busy minHidingTime={300} isLoading={!isLoaded} delayMs={750}>
                    <TodoList todos={todos} onUpdateTodo={this.handleUpdateTodo} onDeleteTodo={this.handleDeleteTodo}/>
                </Busy>
                <Footer currentFilter={show} onFilter={this.handleFilter}/>
            </Fragment>
        )
    }


}