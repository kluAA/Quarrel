import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);
const clean = DOMPurify.sanitize;

const { NEW_ANSWER } = Mutations;
const { FETCH_QUESTION, FETCH_QUESTIONS } = Queries;

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            bold: false,
            italic: false,
            insertOrderedList: false
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({body: e.target.innerHTML})
    }

    updateCache(cache, { data }) {
        let question;
        try { 
            question = cache.readQuery({ 
                query: FETCH_QUESTION,
                variables: { id: this.props.questionId } 
            }).question;
        } catch (err) {
            return;
        }
        if (question) {
            console.log(question);
            let newAnswer = data.newAnswer;
            question.answers.push(newAnswer)
            cache.writeQuery({
                query: FETCH_QUESTION,
                data: { question: question }
            });
        }
    }

    updateFeedCache(cache, { data}) {
        let questions;
        try {
            questions = cache.readQuery({
                query: FETCH_QUESTIONS,
            }).questions;
        } catch (err) {
            console.log(err);
        }
        if (questions) {
            console.log(questions)
        }
    }

    handleSubmit(e, newAnswer) {
        e.preventDefault();
        const cleanBody = clean(this.state.body)
        newAnswer({
            variables: {
                body: cleanBody,
                questionId: this.props.questionId
            }
        }).then(({data}) => this.props.history.push(`/q/${data.newAnswer.question._id}`))
    }

    format(type) {
        return e => {
            e.preventDefault();
            e.stopPropagation();
            document.execCommand(type, false, null);
            this.setState({[type]: document.queryCommandState(type)});
        }
    }

    render() {
        const { bold, italic, insertOrderedList } = this.state;
        return (
            <Mutation 
                mutation={NEW_ANSWER}
                update={(cache, data) => {
                    // if (this.props.match.path === "/") {
                    //     this.updateFeedCache(cache, data);
                    //     return null;
                    // };
                    this.updateCache(cache, data);
                
                }}
                onCompleted={data => {
                    this.props.toggleForm();
                }}
            >
                {newAnswer => {
                    return (
                        <div className="answer-form">
                            <div className="answer-header">
                                <div className="user-icon">

                                </div>
                            </div>
                            <div className="answer-format">
                                <button className="format" id={bold ? "btn-active" : null}onClick={this.format("bold")}>
                                    <i className="fas fa-bold"></i>
                                </button>
                                <button className="format" id={italic ? "btn-active" : null}onClick={this.format("italic")}>
                                    <i className="fas fa-italic"></i>
                                </button>
                                <button className="format" id={insertOrderedList ? "btn-active" : null} onClick={this.format("insertOrderedList")}>
                                    <i className="fas fa-list-ol"></i>
                                </button>
                            </div>
                            <div
                                id="editable"
                                className="answer-content"
                                contentEditable="true"
                                spellCheck="false"
                                onInput={this.update}
                            >
                            </div>

                            <div className="answer-footer">

                                <div className="answer-submit" 
                                    onClick={e => this.handleSubmit(e, newAnswer)}>
                                    Submit
                                </div>
                            </div>
                        </div>
                    )
                }}

            </Mutation>
        )
    }
}

export default withRouter(AnswerForm);