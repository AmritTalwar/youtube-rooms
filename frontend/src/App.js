import React from "react";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Room from "./components/Room";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/room/:roomId" component={Room}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
