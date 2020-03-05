import React from 'react';
import CommentForm from '../comment//CommentForm';
import CommentIndex from '../comment//CommentIndex';

class AnswerItem extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			edit: false
		}
	}

	render()
	{
		const { answer } = this.props;
		return (
			<div className="qns-answer-item">
				<div className="ai-user-header">
					<div className="ai-user-pic">

					</div>
				</div>
				<div
					id="test"
					contentEditable={this.state.edit}
					className="ai-content"
					dangerouslySetInnerHTML={{ __html: answer.body }}
				>
				</div>
				{/* <CommentForm /> */}

				<CommentForm answerId={this.props.answer._id} />
				<CommentIndex answerId={this.props.answer._id} />

				{/* <br />

                <p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}
			</div>
		)
	}
}

export default AnswerItem;