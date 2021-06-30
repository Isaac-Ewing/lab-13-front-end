import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./HomePage.js";
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
          </div>
          <Switch>
            <Route path='/' exact render={(routerProps) => <HomePage {...routerProps} />} />
          </Switch>
        </Router>
      )
    }
}

