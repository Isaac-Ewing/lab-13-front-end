import React from 'react'
import { login } from './utils.js';

export default class LoginPage extends React.Component {
    state = {
        email: '',
        password: ''
    }
    handleSubmit = async e => {
        e.preventDefault();
        
        const token = await login(this.state.email, this.state.password);
        this.props.login(token)
        this.props.history.push('/todolist')
    }

    handleEmail = e => {
        this.setState({ email: e.target.value })
    }
    handlePW = e => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: <input type="email" onChange={this.handleEmail}/></label>
                    <label>Password: <input type="password" onChange={this.handlePW}/></label>
                    <button>Log in</button>
                </form>
            </div>
        )
    }
}