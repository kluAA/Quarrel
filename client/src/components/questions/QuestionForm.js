import React from "react";
import { Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { FaLink } from "react-icons/fa";

const { FETCH_QUESTIONS } = Queries;
const { NEW_QUESTION } = Mutations;


class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            message: "",
            showModal: false
        };
        this.handleModal = this.handleModal.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }


    handleModal(e) {
        e.preventDefault();
        this.setState({ 
            showModal: !this.state.showModal,
            message: "" 
        });
    }

    closeMessage (e) {
        this.setState({ message: "" })
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    updateCache(cache, { data }) {
        let questions;
        try {
            questions = cache.readQuery({ query: FETCH_QUESTIONS });
        } catch (err) {
            return;
        }
        if (questions) {
            let questionArray = questions.questions;
            let newQuestion = data.newQuestion;
            cache.writeQuery({
                query: FETCH_QUESTIONS,
                data: { questions: questionArray.concat(newQuestion) }
            });
        }
    }

    handleSubmit(e, newQuestion) {
        e.preventDefault();
        const question = this.state.question;
        if (question.split(" ").length < 3 ) {
            this.setState({ message: "This question needs more detail. " + 
                                "Add more information to ask a clear question, " +
                                "written as a complete sentence."});
            setTimeout(this.closeMessage, 5001)
        } else {
            newQuestion({
                variables: {
                    question: question
                }
            });
        }
    }

    render () {
        return (
            <div>
                {
                    this.state.message.length > 0 &&
                    <div className="modal-message hide-me">
                        <div className="hidden">x</div>
                        <p>{this.state.message}</p>
                        <div className="close-message" onClick={this.closeMessage}>x</div>
                    </div>
                }
                <div className="add-question-item" onClick={this.handleModal}>
                    <p className="add-question-item-user">Username</p>
                    <p className="add-question-item-prompt">What is your question or link?</p>
                </div>
                    {
                        this.state.showModal &&
                        <div className="modal-background" onClick={this.handleModal}>
                            <div className="modal-child" onClick={e => e.stopPropagation()}>
                                <Mutation
                                    mutation={NEW_QUESTION}
                                    onError={err => this.setState({ message: err.message })}
                                    update={(cache, data) => this.updateCache(cache, data)}
                                    onCompleted={data => {
                                        const { question } = data.newQuestion;
                                        this.setState({
                                            message: `New question ${question} created successfully`
                                        });
                                    }}
                                >
                                    {(newQuestion, { data }) => (
                                        <div className="add-question-modal">
                                            <div className="modal-header">
                                                <div className="add-question-modal-header">
                                                    <div className="tab selected">Add Question</div>
                                                    {/* <div className="tab">Share Link</div> */}
                                                </div>
                                                <div className="add-question-modal-x">
                                                    <span onClick={this.handleModal}>X</span>
                                                </div>
                                            </div>
                                            <form onSubmit={e => this.handleSubmit(e, newQuestion)}>
                                                <div className="add-question-modal-content">
                                                    <div className="add-question-modal-user">
                                                        User asked
                                                    </div>
                                                    <div className="add-question-modal-question">
                                                        <textarea
                                                            onChange={this.update("question")}
                                                            value={this.state.question}
                                                            placeholder='Start your question with "What", "How", "Why", etc.'
                                                        />
                                                    </div>
                                                    <div className="add-question-modal-link">
                                                        <span><FaLink /></span>
                                                        <input
                                                            placeholder="Optional: include a link that gives context"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="add-question-modal-footer">
                                                    <p onClick={this.handleModal}>Cancel</p>
                                                    <button type="submit">Add Question</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    }
            </div>
        )
    }
}

export default QuestionForm;