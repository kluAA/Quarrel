import React from 'react';
import { Query } from 'react-apollo';
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import AnswerForm from "../answer/AnswerForm";
import AnswerItem from "../answer/AnswerItem";
const { FETCH_QUESTION } = Queries;

class QuestionShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            body: "",
            showForm: false
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.numAnswers = this.numAnswers.bind(this);
    }

    toggleForm() {
        this.setState({ showForm: !this.state.showForm })
    }

    numAnswers(question) {
        const num = question.answers.length;
        if (num === 1) {
            return "1 Answer";
        } else {
            return `${num} Answers`;
        }
    }

    render() {
        return (
            <Query
                query={FETCH_QUESTION}
                variables={{ id: this.props.match.params.id || this.props.id }}
            >
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    const { question } = data;
                    const answers = question.answers.map(answer => {
                        return (
                            <AnswerItem
                                key={answer._id}
                                answer={answer}
                                questionId={question._id}
                            />
                        )
                    })
                    return (
                        <div className="qns-container">
                            {/* {data.question.question}
                            <br />
                            <br />
                            <div id="test" contentEditable={this.state.edit}
                                onInput={e => {
                                    this.setState({body: e.target.innerHTML})
                                    console.log(this.state.body);
                                }}
                                dangerouslySetInnerHTML={{__html: data.question.answers[0].body}}
                            >
                                
                            </div>
                            <p onClick={e => {
                                const div = document.getElementById("test");
                                this.setState({edit: true, body: div.innerHTML})
                                
                                }}>
                                TOGGLE
                            </p> */}
                            <h1>{question.question}</h1>
                            <div className="qns-actions">
                                <div className="qns-answer"
                                    onClick={this.toggleForm}
                                >
                                    <i className="far fa-angry"></i>
                                    <span>Quarrel</span>
                                </div>
                                <div className="qns-follow">
                                    <i className="fas fa-user-secret"></i>
                                    <span>Track</span>
                                </div>
                            </div>
                            {this.state.showForm ? <AnswerForm toggleForm={this.toggleForm} questionId={question._id} /> : null}
                            <h2>{this.numAnswers(question)}</h2>
                            {answers}
                        </div>
                    )
                }}


            </Query>
        )
    }
}

export default withRouter(QuestionShow);