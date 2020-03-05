import React from 'react';
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import CommentIndex from "./CommentItem";
const { NEW_COMMENT } = Mutations;
const { FETCH_COMMENTS, CURRENT_USER } = Queries;

class CommentForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			answerId: this.props.answerId,
			comment: "",
			bold: false,
			italic: false,
			history: this.props.history
		}
		this.update = this.update.bind(this);
	}

	update(field)
	{
		return (e) =>
		{
			this.setState({
				[field]: e.target.value
			});
		};
	}

	updateCache(cache, { data: { newComment } }) {
		let comments;
		try { 
			comments = cache.readQuery({ query: FETCH_COMMENTS });
		} catch (err) {
			return;
		}
		if (comments) {
			let commentArray = comments.comments;
			cache.writeQuery({
				query: FETCH_COMMENTS,
				data: { comments: commentArray.concat(newComment) }
			});
		}
	}

	// updateState(comment)
	// {
	// 	return () => this.setState({
	// 		comment: comment.comment,
	// 	})
	// }

	// updateComment() {
	// 	return e => {
	// 		this.setState({ comment: e.target.value })
	// 	}
	// }

	handleSubmit(e, newComment)
	{
		e.preventDefault();
		const comment = this.state.comment;
		newComment({
			variables: {
				comment: this.state.comment,
				answerId: this.state.answerId
			}
		})
			.then(() =>
			{
				// this.props.history.push(`/q/${this.state.questionId}`)
			})
	}

	format(type) {
		return e =>
		{
			e.preventDefault();
			e.stopPropagation();
			document.execCommand(type, false, null);
			this.setState({ [type]: document.queryCommandState(type) });
		}
	}

	loginAndRedirectTo(url, data) {
		this.props.history.push(url);
	}
		
	render() {
		const { bold, italic } = this.state;
		return (
			<Mutation
				mutation={NEW_COMMENT}
				update={(cache, data) => this.updateCache(cache, data)}
				onCompleted={data => {
					const { comment } = data.newComment;
					// this.props.history.push(`c/${this.state.questionId}`)
					this.loginAndRedirectTo("/", data)

				}}
			>
				{(newComment, {comment}) => {
					return (
						// <div className="comment-form">
						// 	<div className="comment-header">
						// 		<div className="user-icon">

						// 		</div>
						// 	</div>
						// 	<div className="comment-format">
						// 		<button className="format" id={bold ? "btn-active" : null} onClick={this.format("bold")}>
						// 			<i className="fas fa-bold"></i>
						// 		</button>
						// 		<button className="format" id={italic ? "btn-active" : null} onClick={this.format("italic")}>
						// 			<i className="fas fa-italic"></i>
						// 		</button>
						// 	</div>

						<div className="comment-container">
							<div className="comment-box">
							<div className="comment-header">
							<form onSubmit={e => this.handleSubmit(e, newComment)} className="comment-form">
								<div className="user-icon">

								</div>
								<input
									onChange={this.update("comment")}
									value={this.state.comment}
									placeholder="Your comment"
									className="comment-input-box"
								/>
								<div className="comment-footer">

								</div>
								<button type="submit" className="comment-submit-button">Add Comment</button>
							</form>
							</div>
							</div>
						</div>
					)
				}}

			</Mutation>
		)
	}
}

export default CommentForm;