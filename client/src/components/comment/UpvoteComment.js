import React from "react";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { Mutation, Query } from "react-apollo";
const { UPVOTE_COMMENT, DELETE_UPVOTE } = Mutations;
const { FETCH_QUESTION, CURRENT_USER } = Queries;

class UpvoteComment extends React.Component {
	constructor(props) {
		super(props);
		this.state= { message: "" }
	}

	handleUpvote(e, upvoteComment) {
		e.preventDefault();
		upvoteComment({
			variables: {commentId: this.props.comment._id}
		})
	}

	handleUnupvote(e, deleteUpvote) {
		e.preventDefault();
		deleteUpvote({
			variables: {commentId: this.props.comment._id}
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
			cache.writeQuery({
				query: FETCH_QUESTION,
				data: { question: question }
			});
		}
	}

	render() {
		const userIds = this.props.comment.upvotes.map(upvote => {
			return upvote.user._id;
		})
		const { comment } = this.props;

		if (userIds.includes(localStorage.getItem("currentUserId"))) {
			return (
				<div className="">
					<Query 
						query={CURRENT_USER} 
						variables={{ token: localStorage.getItem("auth-token") }}
					>
						{ ({ loading, error, data }) => {
							if (loading) return "Loading...";
							if (error) return `Error! ${error.message}`
							return (
								<div className="comment-upvoted">
									<div className="comment-item-icon"><i class="fas fa-poo"></i></div>
									<div className="comment-upvoted-text">Poo'ed {this.props.comment.upvotes.length} </div> 

								</div>
							)
						}}
					</Query>

					<Mutation
						mutation={DELETE_UPVOTE}
						onError={err => this.setState({ message: err.message })}
						update={(cache, data) => this.updateCache(cache, data)}
						onCompleted={data => {
							const { answer } = data.deleteUpvote;
							this.setState({ message: "" });
						}}
					>
						{(deleteUpvote, { data }) => (
							<div className="comment-upvote" onClick={e => this.handleUnupvote(e, deleteUpvote)}>
								<div className="comment-item-icon"><i className="fas fa-poo"></i></div>
								<div className="comment-item-text">Poos {this.props.comment.upvotes.length}</div>
							</div>
						)}
					</Mutation>
				</div>
			)
		} else {
			return (
				<div className="comment-upvote">
					<Mutation
						mutation={UPVOTE_COMMENT}
						onError={err => this.setState({ message: err.message })}
						update={(cache, data) => this.updateCache(cache, data)}
						onCompleted={data => {
							const {answer} = data.upvoteComment;
							// this.setState({ message: "Upvoted" });
						}}
					>
						{(upvoteComment, { data }) => (
							<div className="comment-upvote" onClick={e => this.handleUpvote(e, upvoteComment)}>
								<div className="comment-item-icon"><i className="fas fa-poo"></i></div>
								<div className="comment-item-text">Poos {this.props.comment.upvotes.length}</div>
								
							</div>
						)}
					</Mutation>
				</div>
			)
		}
	}
};

export default UpvoteComment;