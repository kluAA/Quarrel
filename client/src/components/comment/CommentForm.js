import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);
const clean = DOMPurify.sanitize;

const { NEW_COMMENT } = Mutations;
const { FETCH_COMMENTS } = Queries;

class CommentForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			// answerId: this.props.match.params.id,
			comment: "",
			bold: false,
			italic: false
		}
		this.update = this.update.bind(this);
	}

	// componentDidMount()
	// {
	// 	this.setState({
	// 		answerId: this.props.answerId,
	// 		comment: "",
	// 	});
	// }

	update(e)
	{
		this.setState({ comment: e.target.value })
	}

	updateCache(cache, { data: { newComment } }) {
		// let comments;
		// try { 
		// 	comments = cache.readQuery({ query: FETCH_COMMENTS });
		// } catch (err) {
		// 	return;
		// }
		// if (comments) {
		// 	let commentArray = comments.comments;
		// 	cache.writeQuery({
		// 		query: FETCH_COMMENTS,
		// 		data: { comments: commentArray.concat(newComment) }
		// 	});
		// }
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
		const cleanBody = clean(this.state.comment)
		newComment({
			variables: {
				comment: this.state.comment,
				// comment: cleanBody,
				answerId: this.state.answerId
			}
		})
			.then(() =>
			{
				this.props.history.push(`/a`)
				// this.props.history.push(`/a/${this.state.answerId}`)
			})
	}

	// componentWillReceiveProps()
	// {

	// }

	format(type)
	{
		return e =>
		{
			e.preventDefault();
			e.stopPropagation();
			document.execCommand(type, false, null);
			this.setState({ [type]: document.queryCommandState(type) });
		}
	}

	render() {
		const { bold, italic } = this.state;
		return (
			<Mutation
				mutation={NEW_COMMENT}
				// update={(cache, data) => this.updateCache(cache, data)}
				// onCompleted={data =>
				// {
				// 	this.props.toggleForm();
				// }}
			>
				{(newComment, {data}) => {
					return (
						<div className="answer-form">
							<div className="answer-header">
								<div className="user-icon">

								</div>
							</div>
							<div className="answer-format">
								<button className="format" id={bold ? "btn-active" : null} onClick={this.format("bold")}>
									<i className="fas fa-bold"></i>
								</button>
								<button className="format" id={italic ? "btn-active" : null} onClick={this.format("italic")}>
									<i className="fas fa-italic"></i>
								</button>
							</div>
							<form onSubmit={e => this.handleSubmit(e, newComment)}>
								<textarea
									onChange={this.update}
									// onInput={this.update}
									// value={this.state.comment}
									placeholder="Your comment"
								/>
								<div className="answer-footer">

									<div className="answer-submit"
										onClick={e => this.handleSubmit(e, newComment)}>
										Submit
                </div>
								</div>
								{/* <button type="submit">Submit</button> */}
							</form>
							{/* <div
								id="editable"
								// className="answer-content"
								contentEditable="true"
								spellCheck="false"
								onInput={this.update}
							>
							</div> */}

							
						</div>
					)
				}}

			</Mutation>
		)
	}
}

export default CommentForm;