import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";
import Login from "./session/Login";
import Register from "./session/Register";
import QuestionForm from "./questions/QuestionForm";
import SessionForm from "./session/SessionForm";
// import SigninButton from "./session/SigninButton";
// import TopicShow from "./topics/TopicShow"

const Main = () => {
    return (
        <div className="main">
            <NavBar />
						{/* <SessionForm /> */}
            <div className="main-body">
                <Switch>
										{/* <Route path="/" component={NavBar} /> */}
										{/* <AuthRoute path="/" component={SigninButton} /> */}
                    <Route exact path="/" component={Feed} />
                    {/* <QuestionForm /> */}
                    {/* <Route exact path="/topic" component={TopicShow} /> */}
                </Switch>
            </div>
        </div>
    )
};

export default Main;