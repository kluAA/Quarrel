import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const {NEW_ANSWER } = Mutations;

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            bold: false,
            italic: false
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({body: e.target.innerHTML})
    }

    updateCache(cache, { data }) {

    }

    handleSubmit(e, newAnswer) {
        e.preventDefault();
        newAnswer({
            variables: {
                body: this.state.body,
                questionId: this.props.questionId
            }
        })
    }

    format(type) {
        return e => {
            e.preventDefault();
            e.stopPropagation();
            document.execCommand(type, false, null);
            this.setState({[type]: !this.state[type]})
        }
    }

    render() {
        const { bold, italic } = this.state;
        return (
            <Mutation 
                mutation={NEW_ANSWER}
                // update={(cache, data) => this.updateCache(cache, data)}
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

export default AnswerForm;