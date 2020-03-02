import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Login from "./session/Login";
import Register from "./session/Register";
import QuestionForm from "./questions/QuestionForm";
import TopicShow from "./topics/TopicShow"

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            <div className="main-body">
                <Switch>
                    {/* <QuestionForm /> */}
                    <TopicShow />
                </Switch>
            </div>
        </div>
    )
};

export default Main;