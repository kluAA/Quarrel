import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
// import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";
import SessionForm from "./session/SessionForm";

const App = () => {
	return (
		<div>
			{/* <SessionForm /> */}
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SessionForm} />
				<AuthRoute exact path="/session" component={SessionForm} routeType="auth" />
				<AuthRoute path="/" component={Main} />
			</Switch>
		</div>
	);
};

export default App;