import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
// import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Main from "./Main";
import SessionForm from "./session/SessionForm";
import TopicShow from "./topics/TopicShow"
import Show from "./Show";
import CommentItem from "./comment/CommentItem";
import CommentForm from "./comment/CommentForm";
import CommentIndex from "./comment/CommentIndex";
import QuestionIndex from "./questions/QuestionIndex";

const App = () => {
	return (
		<div>
			{/* <SessionForm /> */}
			{/* <CommentForm /> */}
			<CommentIndex />
			{/* <QuestionIndex /> */}
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SessionForm} />
				<Route path="/q/:id" component={Show} />
				<Route path="/comments" component={CommentIndex} />
				<Route path="/comment/:id" component={CommentItem} />

				<AuthRoute exact path="/session" component={SessionForm} routeType="auth"/>
				<AuthRoute path="/" component={Main} />

			</Switch>
		</div>
	);
};

export default App;