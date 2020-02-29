import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import "./questionIndex.css"
import QuestionForm from "./QuestionForm";
const { FETCH_QUESTIONS } = Queries;


class QuestionIndex extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.showModal = this.showModal.bind(this);
    }

    showModal (e) {
        e.preventDefault();
        this.setState({showModal: !this.state.showModal });
    }

    render () {
        return (
            <div className="question-index">
                <div className="add-question-item" onClick={this.showModal}>
                    <p>Username</p>
                    <p>What is your question or link?</p>
                </div>
                <Query query={FETCH_QUESTIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div>
                                {data.questions.map(question => (
                                        <div key={question._id} className="question-item">
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
                {
                    this.state.showModal && <QuestionForm />
                }
            </div>
        )
    }
};

export default QuestionIndex;