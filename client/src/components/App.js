import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";
import SessionForm from "./session/SessionForm";

const App = () => {
  return (
		<div>
			<Switch>
				<Route exact path="/login" component={Login} routeType="auth" />
				<Route exact path="/signup" component={Register} routeType="auth" />
				{/* <Route path="/" component={SessionForm} /> */}
				<Route path="/" component={Main} />
			</Switch>
		</div>
	);
};

export default App;