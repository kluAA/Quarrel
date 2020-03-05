import React from "react";
import { Route, Switch } from "react-router-dom";
// import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";
// import Login from "./session/Login";
// import Register from "./session/Register";
// import QuestionForm from "./questions/QuestionForm";
import TopicShow from "./topics/TopicShow"
import QuestionShow from "./questions/QuestionShow";
import CommentItem from "./comment/CommentItem";

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            {/* <SessionForm /> */}
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/topics" component={TopicShow} />
										<Route path="/a" component={CommentItem} />
                </Switch>
            </div>
        </div>
    )
};

export default Main;