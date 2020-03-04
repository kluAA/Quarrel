import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import NavBar from "./navigation/NavBar";
import QuestionShow from "./questions/QuestionShow";

const Show = () => {
    return (
        <div className="show">
            <NavBar />
            <div className="show-body">
                <Switch>
                    <Route path="/q/:id" component={QuestionShow} />
                </Switch>
            </div>
        </div>
    );
};

export default Show;