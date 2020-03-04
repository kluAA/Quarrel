import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
// import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";
import SessionForm from "./session/SessionForm";
import Show from "./Show";

const App = () => {
	return (
		<div>
			{/* <SessionForm /> */}
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SessionForm} />
				<Route path="/q/:id" component={Show} />
				<AuthRoute exact path="/session" component={SessionForm} routeType="auth" />
				<AuthRoute path="/" component={Main} />
			</Switch>
		</div>
	);
};

export default App;