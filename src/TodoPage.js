import React from 'react'
import { getTodos, addTodo, completeTodo } from './utils.js'

export default class TodoPage extends React.Component {
    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetch()
    }

    fetch = async () => {
        const todos = await getTodos(this.props.token);
        this.setState({ todos: todos })
    }

    handleSubmit = async e => {
        e.preventDefault();
        await addTodo(this.state.todo, this.props.token); 
        await this.fetch()
    }

    handleTodoNameChange = e => {
        this.setState({ todo: e.target.value })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name<input onChange={this.handleTodoNameChange}/></label>
                    <button>Add Todo</button>
                </form>
                <div>
                    {
                        this.state.todos.map(todo => 
                        <p className={ todo.completed ? 'done' : 'not-done'} key={`${todo.todo}${todo.id}`} 
                            onClick={async () => {
                                await completeTodo(todo.id, this.props.token)
                                await this.fetch()
                            }}>{todo.todo}</p>)
                    }
                </div>
            </div>
        )
    }
}