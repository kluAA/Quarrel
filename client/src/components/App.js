import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";
import SessionForm from "./session/SessionForm";

const App = () => {
  return (
<<<<<<< HEAD
		<div>
			<Switch>
				<Route exact path="/login" component={Login} routeType="auth" />
				<Route exact path="/signup" component={Register} routeType="auth" />
				<Route exact path="/#" component={SessionForm} />
				<AuthRoute exact path="/" component={Main} />
			</Switch>
		</div>
	);
=======
    <div>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  )
>>>>>>> master
};

export default App;