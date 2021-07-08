import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';

function App() {

  return (
    <div className="App">
    <h1>My App</h1>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
    </div>
  );
}

export default App;
