import React, { Fragment } from 'react';
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import ProfileIcon from "../customization/ProfileIcon";
const { NEW_COMMENT } = Mutations;
const { CURRENT_USER, FETCH_QUESTION } = Queries;

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answerId: this.props.answerId,
			comment: "",
			// bold: false,
			// italic: false,
			history: this.props.history,
			showCommentForm: true
		}
		this.update = this.update.bind(this);
		this.closeCommentForm = this.closeCommentForm.bind(this);
	}

	update(field) {
		return (e) => {
			this.setState({
				[field]: e.target.value
			});
		};
	}

	updateCache(cache, { data: { newComment } }) {
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
			// console.log(question);
			// console.log("newComment", newComment);
			question.answers.map((answer) => {
				if (answer._id === newComment.answer._id) {
					answer.comments = answer.comments.concat(newComment)
				}
			});
			cache.writeQuery({
				query: FETCH_QUESTION,
				data: { question: question }
			})
		}
	}

	handleSubmit(e, newComment) {
		e.preventDefault();
		const comment = this.state.comment;
		newComment({
			variables: {
				comment: this.state.comment,
				answerId: this.state.answerId
			}
		})
			.then(() => {
				// this.props.history.push(`/q/${this.state.questionId}`)
				this.closeCommentForm();
			})
	}

	format(type) {
		return e => {
			e.preventDefault();
			e.stopPropagation();
			document.execCommand(type, false, null);
			this.setState({ [type]: document.queryCommandState(type) });
		}
	}

	loginAndRedirectTo(url, data) {
		this.props.history.push(url);
	}

	closeCommentForm() {
		this.setState({showCommentForm: false});
	}

	render() {
		// const { bold, italic } = this.state;
		return (
			<Mutation
				mutation={NEW_COMMENT}
				update={(cache, data) => {this.updateCache(cache, data)}}
				onCompleted={data => {
					this.props.closeCommentForm();
					// this.setState({comment: ""});
				}}
			>
				{(newComment, { comment }) => {
					return (
						<div className="comment-form-container">
							<form onSubmit={e => this.handleSubmit(e, newComment)} className="comment-form">
								<div className="comment-item-user-icon">
									{/* <img className="comment-item-user-icon" src={user.profileUrl} /> */}
									<Query query={CURRENT_USER} variables={{token : localStorage.getItem("auth-token") }}>
										{({loading, error, data}) => {
											if (loading) return null;
											if (error) return null;
											if (data.currentUser.profileUrl) {
												return (
												<Fragment>
													<ProfileIcon 
														profileUrl={data.currentUser.profileUrl}
														fname={data.currentUser.fname}
														size={40}
														fsize={18}
													/>
												</Fragment>
												)
											}
										}}
									</Query>
								</div>
								{/* <div className="comment-form-input-box"> */}
								<div className="comment-form-input-box">
									<input
										onChange={this.update("comment")}
										value={this.state.comment}
										placeholder="Add a comment..."
										className="comment-form-input"
									/>
								</div>
								<div className="comment-form-button">
									<input type="submit" className="comment-form-button" value="" />
								</div>

							</form>
						</div>
					)
				}}

			</Mutation>
		)
	}
}

export default CommentForm;