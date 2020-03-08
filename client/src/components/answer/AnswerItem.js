import React from 'react';
import Upvote from "../upvote/Upvote";
import moment from "moment";
import CommentForm from '../comment//CommentForm';
import CommentIndex from '../comment//CommentIndex';

class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						edit: false,
						showForm: false
				}
				this.numComments = this.numComments.bind(this);
				this.toggleForm = this.toggleForm.bind(this);
		}
		
		toggleForm() {
			this.setState({ showForm: !this.state.showForm })
		}

		numComments(answer) {
			const num = answer.comments.length;
			const user = answer.comments.user;
			if (num === 1) {
				return `1 Comment from ${ user }`;
			} else {
				return `${num} Comments from ${user}`;
			}
		}

		commentSection() {
			const { answer } = this.props;
			if (this.props.answer.comments.length === 0) {
				return (
					<div>
					<CommentForm answerId={this.props.answer._id} questionId={this.props.questionId} />
					</div>
				);
			} else {
				return (
					<div>
						<div className="comments-link-container" onClick={this.toggleForm}>
							<span className="comments-link-text">{this.numComments(answer)}</span>
						</div>
						{this.state.showForm ? <CommentIndex questionId={this.props.questionId} answerId={this.props.answer._id} comments={answer.comments} /> : null }
					</div>
				);
			}
		}

    render() {
        const { answer } = this.props;
        return (
            <div className="qns-answer-item">
                <div className="ai-user-header">
                    <img className="ai-user-pic" src={answer.user.profileUrl} />
                    <div className="ai-user-details">
                        <span className="ai-user-name">{answer.user.fname} {answer.user.lname}</span>
                        <span className="ai-date">Answered {moment(new Date(parseInt(answer.date)), "YYYY-MM-DD").fromNow()}</span>
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
                <Upvote answer={answer} questionId={this.props.questionId} />

								{this.commentSection()}
            </div>
        )
    }
}

export default AnswerItem;