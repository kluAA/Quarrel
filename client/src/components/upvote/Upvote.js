import React from "react";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { Mutation } from "react-apollo";
const { UPVOTE_ANSWER } = Mutations;
const { FETCH_QUESTION } = Queries;


class Upvote extends React.Component {
    constructor (props) {
        super(props);
        this.state = { message: ""};
    }

    handleSubmit(e, upvoteAnswer) {
        e.preventDefault();
        upvoteAnswer({
            variables: { answerId: this.props.answer._id }
        })
    }

    updateCache(cache, { data }) {
        let question;
        try {
            question = cache.readQuery({
                query: FETCH_QUESTION,
                variables: { id: this.props.questionId }
            }).question;
        } catch (err) {
            console.log(err);
        }
        if (question) {
            console.log(question);
            let updatedAnswer = data.upvoteAnswer;
            cache.writeQuery({
                query: FETCH_QUESTION,
                data: { question: question }
            });
        }
    }

    render () {
        const userIds = this.props.answer.upvotes.map(upvote => {
            return upvote.user._id;
        })
        if (userIds.includes(localStorage.getItem("currentUserId"))) {
            return <h1>You upvoted this answer</h1>
        } else {
            return (
                <div>
                    <Mutation
                        mutation={UPVOTE_ANSWER}
                        onError={err => this.setState({ message: err.message })}
                        update={(cache, data) => this.updateCache(cache, data)}
                        onCompleted={data => {
                            const { answer } = data.upvoteAnswer;
                            this.setState({ message: "You upvoted this question" });
                        }}
                    >
                        {(upvoteAnswer, { data }) => (
                            <form onSubmit={e => this.handleSubmit(e, upvoteAnswer)}>
                                <button>Upvote</button>
                                <div>{this.props.answer.upvotes.length}</div>
                            </form>
                        )
                        }
                    </Mutation>
                </div>
            )
        }
    }
}

export default Upvote;