import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { ANSWERS_BY_USER } = Queries;

class QuestionsYouAnswered extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-results">
                <ul className="search-results-list">
                    <div className="results-for">Questions You Answered </div>
                    <Query query={ANSWERS_BY_USER} variables={{ userId: localStorage.getItem("currentUserId") }}>
                        {({ loading, error, data }) => {
                            if (loading) return "loading...";
                            if (error) return `Error! ${error.message}`;
                            if (data.answersByUser.length === 0) return <li key={0} id="no-results">You haven't answered any questions yet.</li>;
                            return data.answersByUser.map(match => {
                                return (
                                    <Link to={`/q/${match.question._id}`}>
                                        <li key={match.question._id}>
                                            <div className="search-results-match">{match.question.question}</div>
                                            <div className="search-results-answers-number">
                                                {match.body}
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                        }}
                    </Query>
                </ul>
            </div>
        )
    }
}

export default QuestionsYouAnswered;