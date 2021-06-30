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
        const done = this.state.todos.filter(todo => todo.completed);
        const notDone = this.state.todos.filter(todo => !(todo.completed));
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Todo: <input onChange={this.handleTodoNameChange}/></label>
                    <button>Add</button>
                </form>
                <div id='todos'>
                    <div id='notDone'>
                    <p><u>Not Done</u></p>
                    {
                        notDone.map(todo => 
                        <p className='notDone' key={`${todo.todo}${todo.id}`} 
                            onClick={async () => {
                                await completeTodo(todo.id, this.props.token)
                                await this.fetch()
                            }}>{todo.todo}</p>)
                    }
                    </div>
                    <div>
                    <p><u>Done</u></p>
                    {
                        done.map(todo => <p className='done' key={`${todo.todo}${todo.id}`} >{todo.todo}</p>)
                    }
                    </div>
                </div>
            </div>
        )
    }
}