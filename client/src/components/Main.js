import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";
import Login from "./session/Login";
import Register from "./session/Register";
import QuestionForm from "./questions/QuestionForm";
import SessionForm from "./session/SessionForm";

import TopicShow from "./topics/TopicShow";

const Main = () => {
    return (
        <div className="main">
            <NavBar />
						{/* <SessionForm /> */}
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Feed} />
                    {/* <QuestionForm /> */}
                    <Route path="/topics" component={TopicShow} />
										{/* <AuthRoute path="/topics" component={TopicShow} routeType="auth"/> */}

                </Switch>
            </div>
        </div>
    )
};

export default Main;