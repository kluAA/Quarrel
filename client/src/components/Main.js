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
<<<<<<< HEAD
import CommentItem from "./comment/CommentItem";
=======
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
import SearchResults from "./search/SearchResults";

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            {/* <SessionForm /> */}
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/topics" component={TopicShow} />
<<<<<<< HEAD
										<Route path="/a" component={CommentItem} />
=======
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
                    <Route exact path="/search/:query" component={SearchResults} />
                </Switch>
            </div>
        </div>
    )
};

export default Main;