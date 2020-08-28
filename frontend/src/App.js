import React from "react";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Room from "./components/Room";
import Home from "./components/Home";

import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_HOST);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/room/:roomId"
            render={(routeProps) => <Room {...routeProps} socket={socket} />}
          />

          <Route
            path="/home"
            render={(routeProps) => <Home {...routeProps} socket={socket} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
