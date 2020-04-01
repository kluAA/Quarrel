import React from "react";
// import { Query } from "react-apollo";
// import Queries from "../../graphql/queries";
// import { Link } from "react-router-dom";
import moment from "moment";
import CommentForm from "./CommentForm";
import DislikeComment from "./DislikeComment";
import ProfileIcon from "../customization/ProfileIcon";
// const { FETCH_COMMENTS, FETCH_ANSWER } = Queries;

class CommentIndex extends React.Component {
    constructor(props) {
				super(props);
				this.state = {
					showForm: this.props.showForm,
					showCommentForm: true,
					showCommentButton: false,
				}
				this.closeCommentForm = this.closeCommentForm.bind(this);
		}

	componentDidMount() {
		const commentToggle = document.getElementById('comment-toggle');
		commentToggle.addEventListener('click', 
		this.setState({ 
			showCommentForm: !this.state.showCommentForm, 
			showCommentButton: false 
		}), console.log("comment toggle", 
		"showCommentForm :", this.state.showCommentForm, 
		"showCommentButton :", this.state.showCommentButton ))
		// const input = document.getElementById('comment-input');
		// input.addEventListener('click', this.setState({showCommentForm: true}));
		// input.addEventListener('click', );

	}

	componentWillUnmount(){
		const commentToggle = document.getElementById('comment-toggle');
		commentToggle.removeEventListener('click', 
		this.setState({ 
			showCommentForm: !this.state.showCommentForm,
			showCommentButton: !this.state.showCommentButton 
		}),
			console.log("comment toggle", this.state.showCommentForm, this.state.showCommentButton,))

		// const input = document.getElementById('comment-input');
		// input.removeEventListener('click');
	}
		
		handleDelete(e, deleteComment)
		{
			e.preventDefault();
			deleteComment({
				variables: {
					commentId: this.state.commentId,
					// answerId: this.state.answerId
				}
			})
		}

		closeCommentForm(e) {
			e.preventDefault();
			this.setState({showCommentForm: false, showCommentButton: false});
		}

    render() {
        return (
            <div className="">
								<div className="">
									<CommentForm answerId={this.props.answerId} questionId={this.props.questionId} />
								</div>
                {this.props.comments.map(comment => (
                    <div key={comment._id} className="comment-item-container">
                        <div className="comment-item-header">
														<div className="comment-item-user-icon">
															<ProfileIcon
																profileUrl={comment.user.profileUrl}
																fname={comment.user.fname}
																size={40}
																fsize={18}
															/>
														</div>
                            <div className="comment-item-user-info">{comment.user.fname} {comment.user.lname}
														<br/>
															{moment(new Date(parseInt(comment.date)), "YYYY-MM-DD").fromNow()}
														</div>
                        </div>

                        <div className="comment-item-content">
														{comment.comment}
                        </div>

                        <div className="comment-item-footer">
                            {/* <div className="comment-item-icon">
                                <i className="fas fa-reply"></i>
                            </div>
                            <div className="comment-item-text">Reply</div> */}
                            
														<DislikeComment comment={comment} questionId={this.props.questionId} />

                        </div>
                    </div>
                ))}
            </div>
        )
    }
};

export default CommentIndex;