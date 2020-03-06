import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import Feed from "./main/feed";
// import QuestionForm from "./questions/QuestionForm";
import TopicsShow from "./topics/TopicsShow"
import TopicShow from "./topics/TopicShow"
import QuestionShow from "./questions/QuestionShow";
import CommentItem from "./comment/CommentItem";
import SearchResults from "./search/SearchResults";

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            {/* <SessionForm /> */}
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/topics" component={TopicsShow} />
                    <Route exact path="/topic/:name" component={TopicShow} />
                    <Route exact path="/search/:query" component={SearchResults} />
										<Route path="/a" component={CommentItem} />
                </Switch>
            </div>
        </div>
    )
};

export default Main;