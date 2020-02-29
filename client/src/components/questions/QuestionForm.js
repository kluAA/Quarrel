import React from "react";
import { Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_QUESTIONS } = Queries;
const { NEW_QUESTION } = Mutations;

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            message: ""
        };
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
        newQuestion({
            variables: {
                question: this.state.question
            }
        });
    }

    render () {
        return (
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
                    <div>
                        <form onSubmit={e => this.handleSubmit(e, newQuestion)}>
                            <textarea
                                onChange={this.update("question")}
                                value={this.state.question}
                                placeholder='Start your question with "What", "How", "Why", etc.'
                            />
                            <button type="submit">Cancel</button>
                            <button type="submit">Add Question</button>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default QuestionForm;