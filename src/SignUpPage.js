  import React from 'react'
import { signup } from './utils.js';

export default class SignUpPage extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        const token = await signup(this.state.email, this.state.password);
        this.props.login(token)
        this.props.history.push('/todolist')
    }

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                        <input type="email" onChange={this.handleEmailChange}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={this.handlePasswordChange}/>
                    </label>
                    <button>Create account</button>
                </form>
            </div>
        )
    }
}