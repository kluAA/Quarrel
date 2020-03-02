import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";




const App = () => {
  return (
    <div>
      <Switch>
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/signup" component={Register} routeType="auth" />
          <Route path="/" component={Main} />
      </Switch>
    </div>
  )
};

export default App;