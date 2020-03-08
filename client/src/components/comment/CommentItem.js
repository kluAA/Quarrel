import React from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_COMMENT, FETCH_QUESTION } = Queries;
const { DELETE_COMMENT } = Mutations;

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            comment: ""
        }
		}
		
		handleDelete(e, deleteComment) {
			e.preventDefault();
			deleteComment({
				variables: { 
					commentId: this.state.commentId,
					// answerId: this.state.answerId
				}
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
				// question.answer.comments.map((comment) => {
				// 	if (comment._id === deleteComment.comment._id) {
				// 		answer.comments = answer.comments.concat(deleteComment)
				// 	}
				// });
				cache.writeQuery({
					query: FETCH_QUESTION,
					data: { quesstion: question }
				})
			}
		}

    render() {
        const { comment } = this.props;
        return (
            <Query
                query={FETCH_COMMENT}
                variables={{ id: this.props.match.params.commentId }}
            >
                {({ loading, error, data, comment }) => {
                    if (loading) return <h1>Loading...</h1>;
                    return (
                        <div onClick={() => this.setState({ edit: true })} className="comment-item-container">
                            {/* <h1>Details About {data.comment.comment}</h1> */}
                            <div className="comment-item-header">
                                <div className="comment-item-user-icon">Profile picture</div>
                                <div className="comment-item-user-info">First name, Last name</div>
                            </div>
                            <div className="comment-item-content">Comment: {this.props.comment.comment}</div>
                            {/* <CommentEdit
								commment={data.comment}
								history={this.props.history}
								edit={this.state.edit}
							/> */}
                            <div className="comment-item-footer"></div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default CommentItem;