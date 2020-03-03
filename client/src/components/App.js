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
			{/* <SessionForm /> */}
			<Switch>
<<<<<<< HEAD
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SessionForm} />
				<AuthRoute exact path="/session" component={SessionForm} routeType="auth" />
				<AuthRoute exact path="/" component={Main} />
=======
				<Route exact path="/login" component={Login} routeType="auth" />
				<Route exact path="/signup" component={Register} routeType="auth" />
				{/* <Route path="/" component={SessionForm} /> */}
				<Route path="/" component={Main} />
>>>>>>> app & main conflict w/ merge
			</Switch>
		</div>
	);
};

export default App;