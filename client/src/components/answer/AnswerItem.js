import React from 'react';
import Upvote from "../upvote/Upvote";
import moment from "moment";
import CommentIndex from '../comment//CommentIndex';
import ProfileIcon from "../customization/ProfileIcon";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { CURRENT_USER } = Queries;



class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			edit: false,
			showForm: false
		}
			this.toggleForm = this.toggleForm.bind(this);
		}
		
		toggleForm(e) {
            e.preventDefault();
			this.setState({ showForm: !this.state.showForm });
		}


		// commentSection() {
		// 	const { answer } = this.props;
		// 	if (this.props.answer.comments.length === 0) {
		// 		return (
		// 			<div>
		// 			<CommentForm answerId={this.props.answer._id} questionId={this.props.questionId} />
		// 			</div>
		// 		);
		// 	} else {
		// 		return (
		// 			<div>
		// 				<div className="comments-link-container" onClick={this.toggleForm}>
		// 					<span className="comments-link-text">{this.numComments(answer)}</span>
		// 				</div>
		// 				{this.state.showForm ? <CommentIndex questionId={this.props.questionId} answerId={this.props.answer._id} comments={answer.comments} /> : null }
		// 			</div>
		// 		);
		// 	}
		// }

    render() {
        const { answer } = this.props;
        const commentShow = (
            <div>
                <CommentIndex comments={answer.comments} answerId={answer._id} questionId={this.props.questionId} />
            </div>
        )

        const answerOptions = (
            <div className="ai-options-right">
                <i id="ai-ellipsis" className="fas fa-ellipsis-h">

                </i>
            </div>
        )

        return (
            <div className="qns-answer-item">
                <div className="ai-user-header">
                    {/* <img className="ai-user-pic" src={answer.user.profileUrl} /> */}
                    <ProfileIcon 
                        profileUrl={answer.user.profileUrl}
                        fname={answer.user.fname}
                        size={40}
                        fsize={18}
                    />
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

                <div className="ai-options-container">
                    <div className="ai-options-left">
                        <Upvote answer={answer} questionId={this.props.questionId} />
                        <button onClick={this.toggleForm} className="comment-toggle">
                            <i className="far fa-comments"></i>
                            <span>Comment</span>
                            <span>{answer.comments.length}</span>
                        </button>
                    </div>
                <Query 
                    query={CURRENT_USER}
                    variables={ {token: localStorage.getItem("auth-token")} }
                >
                    {({loading, error, data}) => {
                        if (loading) return null;
                        if (error) return null;
                        if (data.currentUser._id === answer.user._id) {
                           return answerOptions;
                        } else {
                            return null;
                        }
                    }}
                </Query>
                </div>
                {this.state.showForm ? commentShow : null}
            </div>
        )
    }
}

export default AnswerItem;