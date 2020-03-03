import React from "react";
import { Mutation, Query } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

const Validator = require("validator");
const { ANSWER_COMMENTS, FETCH_QUESTIONS, CURRENT_USER, SIMILAR_QUESTIONS } = Queries;
const { NEW_COMMENT } = Mutations;


class CommentForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			comment: "",
			message: "",
			showModal: false,
			success: "",
			link: "",
			successfulQuestion: "",
			successfulQId: ""
		};
		this.handleModal = this.handleModal.bind(this);
		this.closeMessage = this.closeMessage.bind(this);
	}


	handleModal(e)
	{
		e.preventDefault();
		this.setState({
			showModal: !this.state.showModal,
			message: "",
			success: "",
			question: "",
			link: "",
			successfulQuestion: "",
			successfulQId: ""
		});
	}

	closeMessage(e)
	{
		this.setState({ message: "" })
	}

	update(field)
	{
		return e => this.setState({ [field]: e.currentTarget.value })
	}

	updateCache(cache, { data })
	{
		let comments;
		try {
			comments = cache.readQuery({ query: ANSWER_COMMENTS });
		} catch (err) {
			return;
		}
		if (comments) {
			let commentArray = comments.comments;
			let newComment = data.newComment;
			cache.writeQuery({
				query: FETCH_QUESTIONS,
				data: { comments: commentArray.concat(newComment) }
			});
		}
	}

	handleSubmit(e, newComment)
	{
		e.preventDefault();
		const comment = this.state.comment;
		const link = this.state.link;
		if (comment.split(" ").length < 3) {
			this.setState({
				message: "This comment needs more detail. " +
					"Add more information to ask a clear comment, " +
					"written as a complete sentence."
			});
			setTimeout(this.closeMessage, 5001)
		} else if (link.length === 0 || Validator.isURL(link)) {
			newComment({
				variables: {
					comment: comment,
					link: link
				}
			});
			setTimeout(this.closeMessage, 5001)
		} else {
			this.setState({ message: "The source should be a valid link." })
			setTimeout(this.closeMessage, 5001)
		}
	}

	render()
	{
		let matchesList = "";
		let commentLength = this.state.comment.length;
		if (commentLength > 1) {
			matchesList = (
				<Query query={SIMILAR_QUESTIONS} variables={{ comment: this.state.comment }}>
					{({ loading, error, data }) =>
					{
						if (loading) return "loading...";
						if (error) return `Error! ${error.message}`;
						return data.answerQuestions.map(match =>
						{
							return <Link to={`${match._id}`}><li className="matches-item">{`${match.comment}`}</li></Link>
						})
					}}
				</Query>
			)
		}
		const button = (
			<div className="modal-background" onClick={this.handleModal}>
				<div className="modal-child" onClick={e => e.stopPropagation()}>
					<Mutation
						mutation={NEW_COMMENT}
						onError={err => this.setState({ message: err.message })}
						update={(cache, data) => this.updateCache(cache, data)}
						onCompleted={data =>
						{
							const { comment } = data.newComment;
							this.setState({
								message: `You asked: `,
								success: 'success',
								showModal: false,
								comment: "",
								link: "",
								successfulQuestion: `${question}`,
								successfulQId: data.newComment._id
							});
						}}
					>
						{(newComment, { data }) => (
							<div className="add-question-modal">
								<div className="modal-header">
									<div className="add-question-modal-header">
										<div className="tab selected">Add Comment</div>
										{/* <div className="tab">Share Link</div> */}
									</div>
									<div className="add-question-modal-x">
										<span onClick={this.handleModal}>X</span>
									</div>
								</div>
								<form onSubmit={e => this.handleSubmit(e, newComment)}>
									<div className="add-question-modal-content">
										<Query
											query={CURRENT_USER} variables={{ token: localStorage.getItem("auth-token") }}>
											{({ loading, error, data }) =>
											{
												if (loading) return "Loading...";
												if (error) return `Error! ${error.message}`
												return (
													<div className="add-question-modal-user">
														{`${data.currentUser.name} asked`}
													</div>
												)
											}}
										</Query>
										<div className="add-question-modal-question">
											<textarea
												onChange={this.update("comment")}
												value={this.state.comment}
												placeholder='Comment'
											/>
											<ul className="matches-list">
												{matchesList}
											</ul>
										</div>
										<div className="add-question-modal-link">
											<span><FaLink /></span>
											<input
												onChange={this.update("link")}
												value={this.state.link}
												placeholder="Optional: include a link that gives context"
											/>
										</div>
									</div>
									<div className="add-question-modal-footer">
										<p onClick={this.handleModal}>Cancel</p>
										<button type="submit">Add Comment</button>
									</div>
								</form>
							</div>
						)}
					</Mutation>
				</div>
			</div>
		)
		return (
			<div>
				{
					this.state.message.length > 0 &&
					<div className={`modal-message hide-me ${this.state.success}`}>
						<div className="hidden">x</div>
						<p>{this.state.message}<Link to={`${this.state.successfulQId}`}>{this.state.successfulQuestion}</Link></p>
						<div className="close-message" onClick={this.closeMessage}>x</div>
					</div>
				}
				{/* <div className="add-question-item" onClick={this.handleModal}>
                    <p className="add-question-item-user">Username</p>
                    <p className="add-question-item-prompt">What is your question or link?</p>
                </div> */}
				<button className="nav-ask-btn" onClick={this.handleModal}>Add Comment</button>
				{this.state.showModal && button}
			</div>
		)
	}
}

export default CommentForm;