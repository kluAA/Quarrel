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
const { FETCH_ANSWER } = Queries;

class CommentForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			comment: "",
			bold: false,
			italic: false
		}
		this.update = this.update.bind(this);
	}

	update(e)
	{
		this.setState({ body: e.target.innerHTML })
	}

	updateCache(cache, { data })
	{
		// let comments;
		// try { 
		//     comments = cache.readQuery({ FETCH_ANSWERS })
		// }
	}

	handleSubmit(e, newComment)
	{
		e.preventDefault();
		const cleanBody = clean(this.state.comment)
		newComment({
			variables: {
				comment: cleanBody,
				answerId: this.props.answerId
			}
		})
	}

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
				onCompleted={data =>
				{
					this.props.toggleForm();
				}}
			>
				{newComment => {
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
							<div
								id="editable"
								// className="answer-content"
								contentEditable="true"
								spellCheck="false"
								onInput={this.update}
							>
							</div>

							<div className="answer-footer">

								<div className="answer-submit"
									onClick={e => this.handleSubmit(e, newComment)}>
									Submit
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