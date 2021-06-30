import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomePage from "./HomePage.js";
import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import TodoPage from "./TodoPage.js";
import './App.css'

const KEY = 'TOKEN';

export default class App extends React.Component {
    state = {
      token: localStorage.getItem(KEY)
    }

    login = (userToken) => {
      this.setState({ token: userToken })
      localStorage.setItem(KEY, userToken) 
    }

    logout = () => {
      this.setState({ token: '' })
      localStorage.setItem('TOKEN', '')
    }

    render() {
      return (
        <Router>
          <div>
            <Link to='/'>Home Page</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/todolist'>Todo Page</Link>
            <Link to='/'><span onClick={this.logout}>Logout</span></Link>
          </div>
          <Switch>
            <Route path='/' exact render={(routerProps) => <HomePage {...routerProps} />} />
            <Route path='/login' exact render={(routerProps) => <LoginPage login={this.login} {...routerProps} />} />
            <Route path='/signup' exact render={(routerProps) => <SignUpPage login={this.login} {...routerProps} />} />
            <Route path='/todolist' exact render={(routerProps) => this.state.token ? <TodoPage {...routerProps} token={this.state.token} /> : <Redirect to='/' /> } />
          </Switch>
        </Router>
      )
    }
}

