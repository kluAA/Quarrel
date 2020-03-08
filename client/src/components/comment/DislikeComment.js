import React from "react";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { Mutation, Query } from "react-apollo";
const { DISLIKE_COMMENT } = Mutations;
const { FETCH_QUESTION, CURRENT_USER } = Queries;

class DislikeComment extends React.Component {
	constructor(props) {
		super(props);
		this.state= { message: "" }
	}

	handleDislike(e, dislikeComment) {
		e.preventDefault();
		dislikeComment({
			variables: {commentId: this.props.comment._id }
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
		const userIds = this.props.comment.dislikes.map(dislike => {
			return dislike.user._id;
		})

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
								<div className="">
									You disliked this
								</div>
							)
						}}
					</Query>
				</div>
			)
		} else {
			return (
				<div className="">
					<Mutation
						mutation={DISLIKE_COMMENT}
						onError={err => this.setState({ message: err.message })}
						update={(cache, data) => this.updateCache(cache, data)}
						onCompleted={data => {
							const {answer} = data.dislikeComment;
							// this.setState({ message: "Disliked" });
						}}
					>
						{(dislikeComment, { data }) => (
							<div className="" onClick={e => this.handleDislike(e, dislikeComment)}>
								<i class="fas fa-hand-middle-finger"></i>
								Dislike
								{this.props.comment.dislikes.length}
							</div>
						)}
					</Mutation>
				</div>
			)
		}
	}
};

export default DislikeComment;