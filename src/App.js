import React, { Component } from 'react';
import './App.css';
import TodoListContainer from "./Components/TodoListContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TodoList</h1>
        <TodoListContainer/>
      </div>
    );
  }
}

export default App;
