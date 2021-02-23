import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import SnakeGame from "./Component/SnakeGame";
import Collapse from "./Component/Collapse";
import TicTac from "./Component/TicTac";
import NavbarMenu from "./Component/NavbarMenu";

const App = () => {
  return (
    <Router>
      <NavbarMenu />
      <Switch>
        <Route
          exact
          path="/snake"
          render={(props) => <SnakeGame {...props} />}
        />
        <Route
          exact
          path="/collapse"
          render={(props) => <Collapse {...props} />}
        />
        <Route
          exact
          path="/tictac"
          render={(props) => <TicTac {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
