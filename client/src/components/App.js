import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';
import Signup from './Signup';

function App() {

  return (
    <div className="App">
    <h1>My App</h1>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Signup}/>
    </Switch>
    </div>
  );
}

export default App;
