import React from 'react';
import CommentForm from '../comment//CommentForm';
import CommentIndex from '../comment//CommentIndex';

class AnswerItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false
		};
	}

<<<<<<< HEAD
	// commentSection() {
	// 	const { comments, answer } = this.props;
	// 	if (comments.length > 0) {
	// 		return (
	// 			<div>
	// 				<CommentForm answerId={this.props.answer._id} questionId={this.props.questionId} /> 
	// 			</div>

	// 		);
	// 	} else {
	// 		return (
	// 			<div>
	// 				<CommentIndex answerId={this.props.answer._id} comments={answer.comments} />
	// 			</div>
	// 		);
	// 	}
	// }

	render() {
			const { answer } = this.props;
			return (
					<div className="qns-answer-item">
							<div className="ai-user-header">
									<img className="ai-user-pic" src={answer.user.profileUrl} />
									<div className="ai-user-details">
											<span className="ai-user-name">{answer.user.fname} {answer.user.lname}</span>
									</div>
							</div>
							<div
									id="test"
									contentEditable={this.state.edit}
									className="ai-content edit-style"
									dangerouslySetInnerHTML={{ __html: answer.body }}
							>
							</div>

							{/* <br />
							<p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}

					{/* <CommentForm answerId={this.props.answer._id} questionId={this.props.questionId} />
					<CommentIndex answerId={this.props.answer._id} comments={answer.comments} /> */}

					{/* {this.commentSection()} */}
=======
    render() {
        const { answer } = this.props;
        return (
            <div className="qns-answer-item">
                <div className="ai-user-header">
                    <img className="ai-user-pic" src={answer.user.profileUrl} />
                    <div className="ai-user-details">
                        <span className="ai-user-name">{answer.user.fname} {answer.user.lname}</span>
                    </div>
                </div>
                <div
                    id="test"
                    contentEditable={this.state.edit}
                    className="ai-content"
                    dangerouslySetInnerHTML={{ __html: answer.body }}
                >
                </div>

							<CommentForm answerId={this.props.answer._id} questionId={this.props.questionId}/>
							<CommentIndex answerId={this.props.answer._id} comments={answer.comments} />
                {/* <br />
                <p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}
>>>>>>> parent of 8055fa1... add comment to cache
			</div>
		)
	}
}

export default AnswerItem;