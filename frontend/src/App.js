import React from "react";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Room from "./components/Room";
import Home from "./components/Home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/room/:roomId" component={Room}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
