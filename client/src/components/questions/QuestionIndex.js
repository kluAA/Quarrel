import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_QUESTIONS } = Queries;
import { Link } from "react-router-dom";

class QuestionIndex extends React.Component {
    render () {
        return (
            <div>
                <Query query={FETCH_QUESTIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div>
                                {data.questions.map(question => (
                                        <div key={question._id}>
                                            <div>
                                                <Link to={`/${question._id}`}>
                                                    {question.question}
                                                </Link>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        )
                    }
                    
                    }
                </Query>
            </div>
        )
    }
};

export default QuestionIndex;