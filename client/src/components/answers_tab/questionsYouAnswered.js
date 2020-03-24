import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import AnswerItem from "../answer/AnswerItem";
import FeedItem from "../main/feed_item";
import Feed from "../main/feed";
const { ANSWERS_BY_USER } = Queries;

class QuestionsYouAnswered extends React.Component {
    constructor(props) {
        super(props);
    }

    removeHTMLTags(str) {
        const pattern = /<.*?>|&nbsp;/;
        console.log(str)
        str = str.split(pattern).join(" ");
        console.log(str)
        return str;
    }   

    render() {
        return (
            <div className="answers-tab-results">
                <div className="answers-tab-header">
                    <div className="answer-tab unselected left-tab">
                        <Link to="/answer">Questions for you</Link>
                    </div>
                    <div className="answer-tab selected right-tab">
                        <Link to="/answered">Questions you answered</Link>
                    </div>
                </div>
                <ul className="feed-container">
                    <Query query={ANSWERS_BY_USER} variables={{ userId: localStorage.getItem("currentUserId") }}>
                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            if (data.answersByUser.length === 0) return <li key={0} id="no-results" className="feed-item">You haven't answered any questions yet.</li>;
                            return data.answersByUser.map(match => {
                                return (
                                        <li key={match.question._id} className="questions-you-answered-item">
                                            <Link to={`/q/${match.question._id}`}>
                                                <div className="answers-tab-question">{match.question.question}</div>
                                            </Link>
                                            <AnswerItem
                                                key={match._id}
                                                answer={match}
                                                questionId={match.question._id}
                                            />
                                        </li>
                                )
                            })
                        }}
                    </Query>
                </ul>
                {/* <Feed /> */}
            </div>
        )
    }
}

export default QuestionsYouAnswered;