import React from "react";
import { Route, Switch } from "react-router-dom";
// import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";
// import Login from "./session/Login";
// import Register from "./session/Register";
// import QuestionForm from "./questions/QuestionForm";
import TopicsShow from "./topics/TopicsShow"
import TopicShow from "./topics/TopicShow"
import SideBar from "./navigation/SideBar"
import QuestionShow from "./questions/QuestionShow";
import SearchResults from "./search/SearchResults";

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            {/* <SessionForm /> */}
            <div className="main-body">
                <Route exact path="/" component={SideBar} />
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/topics" component={TopicsShow} />
                    <Route exact path="/topic/:name" component={TopicShow} />
                    <Route exact path="/search/:query" component={SearchResults} />
                </Switch>
            </div>
        </div>
    )
};

export default Main;