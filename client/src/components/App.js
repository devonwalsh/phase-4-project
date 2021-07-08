import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';
import Signup from './Signup';


class App extends Component {

  state = {
    loggedIn: null
  }

  getUser = () => {
    fetch('/me')
    .then(res => res.json())
    .then(data => data.id ? this.setState({loggedIn: true}) : this.setState({loggedIn: false}))
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
      return (
      <div className="App">
      <NavBar loggedIn={this.state.loggedIn}/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
      </div>
    );
  }
}

export default App;
