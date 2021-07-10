import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';
import Signup from './Signup';
import Login from './Login';
import RecipientList from './containers/RecipientList';
import Recipient from './Recipient';


class App extends Component {

  state = {
    loggedIn: null,
    name: ''
  }

  getUser = () => {
    fetch('/me')
    .then(res => res.json())
    .then(data => data.id ? this.setState({loggedIn: true, name: data.name}) : this.setState({loggedIn: false}))
  }

  componentDidMount() {
    this.getUser()
  }

  manageLogin = () => {
    this.setState({loggedIn: true})
    this.props.history.push("/")
  }

  manageLogout = () => {
    this.setState({loggedIn: false})
    this.props.history.push("/")
  }

  render() {
      return (
      <div className="App">
      <NavBar loggedIn={this.state.loggedIn} manageLogout={this.manageLogout}/>
      <Switch>
        <Route exact path="/">{this.state.loggedIn ? <Redirect to="/recipientlist" /> : <Home />}</Route>
        <Route exact path="/recipientlist" render={() => <RecipientList loggedIn={this.state.loggedIn} username={this.state.name}/>}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" render={() => <Login manageLogin={this.manageLogin}/>}/>
        <Route exact path="/recipientlist/:recipientId" component={Recipient} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
