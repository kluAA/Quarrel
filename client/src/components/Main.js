import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";


const Main = () => {
    return (
        <div className="main">
            <NavBar />
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Feed} />
                </Switch>
            </div>
        </div>
    )
};

export default Main;