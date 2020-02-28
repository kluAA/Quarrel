import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";


const App = () => {
  return (
    <div>
      <NavBar />
      <h1>Template</h1>
      <Switch>
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
      </Switch>
    </div>
  )
};

export default App;