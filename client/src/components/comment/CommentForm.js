import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
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
			history: this.props.history,
			// showForm: this.props.showForm,
			showCommentForm: this.props.showCommentForm,
			// showCommentForm: false,
			showCommentButton: false,
			cursor: false,
			input: 0,
		};
		this.update = this.update.bind(this);
		this.closeCommentForm = this.closeCommentForm.bind(this);
		this.showButton = this.showButton.bind(this);
		this.hideButton = this.hideButton.bind(this);
		this.toggleButton = this.toggleButton.bind(this);
	}

	componentDidMount() {
			const input = document.getElementById('comment-input');
			// input.addEventListener('click', this.setState({showCommentButton: false}));
			input.addEventListener('click', this.showButton(), console.log(this.showButton, false, "component did mount"));
			// document.getElementById('comment-input').onclick = function () {
			// 		document.getElementById('comment-submit-button').hidden = false;
			// 	}
	}

	componentWillUnmount() {
		const input = document.getElementById('comment-input');
		input.removeEventListener('mouseclick', this.setState({showCommentButton: false}));
		// input.removeEventListener('click', this.hideButton());
		// document.getElementById('comment-input').onclick = function () {
		// 			document.getElementById('comment-submit-button').hidden = false;
		// 		}
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
				this.closeCommentForm();
			})
	}

	closeCommentForm() {
		this.setState({showCommentForm: false, showCommentButton: false});
	}

	showButton() {
		// e.preventDefault();
		console.log("show button works");
		this.setState({ showCommentButton: true });
		// document.getElementById('comment-input').onclick = function ()
		// {
		// 	document.getElementById('comment-submit-button').hidden = false;
		// }
	}

	hideButton() {
		console.log("hide button works");
			this.setState({ showCommentButton: false });
			// document.getElementById('comment-input').onclick = function () {
			// 	document.getElementById('comment-submit-button').hidden = true;
			// }
	}

		toggleButton() {
			const input = document.getElementById('comment-input');
			if (this.state.input > 0 && !this.state.cursor) {
				this.showButton();
				// this.setState({ showCommentButton: false });
				// commentInput.onclick = function () {
				// 	document.getElementById('comment-submit-button').hidden = true;
					console.log(this.state.input)
				// }
			} else if (this.state.input === 0 && this.state.cursor) {
				// this.setState({ showCommentButton: true });
				// document.getElementById('comment-input').onclick = function () {
				// 	document.getElementById('comment-submit-button').hidden = false;
				// }
				console.log(this.state.input);

				this.showButton();
			} else if (!this.state.cursor) {
				this.hideButton();
			}
		
		}
	render() {
		const button = document.getElementById('comment-submit-button');
		const show = (
			<div className="comment-form-button">
				<input type="submit" className="comment-form-button" id="comment-submit-button" value="Add Comment" hidden={false} />
				</div>
		)
		const hide = (
					<div className="comment-form-button">
						<input type="submit" className="comment-form-button" id="comment-submit-button" value="Add Comment" hidden={true} />
			</div>

		)

		return (
			<Mutation
				mutation={NEW_COMMENT}
				update={(cache, data) => {this.updateCache(cache, data)}}
				onCompleted={data => {
					// this.props.closeCommentForm();
					this.setState({comment: "", showCommentForm: false, showCommentButton: false});
				}}
			>
				{(newComment, { comment }) => {
					return (
						<div className="comment-form-container">
							<div className="comment-item-user-icon">
								<Query query={CURRENT_USER} variables={{ token: localStorage.getItem("auth-token") }}>
									{({ loading, error, data }) =>
									{
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
							<form onSubmit={e => this.handleSubmit(e, newComment)} className="comment-form">
								{/* <div className="comment-form-input-box"  */}
									
									<input
										onChange={this.update("comment")}
										value={this.state.comment}
										placeholder="Add a comment..."
										className="comment-form-input"
										id="comment-input"
										onFocus={e => this.setState({ cursor: true })}
										onInput={
									e => this.setState({ input: this.input.value.length })}
										onClick={e => this.setState({ cursor: true })}
										onBlur={e => this.setState({ cursor: false })}

									/>
								{/* </div> */}
								{this.state.showCommentButton ? show : hide }
								{/* <div className="comment-form-button">
									<input type="submit" className="comment-form-button" id="comment-submit-button" value="Add Comment" hidden={true} /> */}

							</form>
						</div>
					)
				}}
			</Mutation>
		)
	}
}

export default CommentForm;