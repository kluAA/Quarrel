import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentForm from "./CommentForm";
const { FETCH_COMMENTS } = Queries;
const { FETCH_ANSWER } = Queries;

class CommentIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { answer, comment, user } = this.props;
        return (
            <div className="">
							<div className="">
								<CommentForm answerId={this.props.answerId} questionId={this.props.questionId} />
							</div>
                {this.props.comments.map(comment => (
                    <div key={comment._id} className="comment-item-container">

                        <div className="comment-item-header">
                            {/* <div className="comment-item-user-icon"> */}
                            <img className="comment-item-user-icon" src={comment.user.profileUrl} />
                            {/* </div> */}
                            <div className="comment-item-user-info">{comment.user.fname} {comment.user.lname}
														<br/>
															Commented {moment(new Date(parseInt(comment.date)), "YYYY-MM-DD").fromNow()}
														</div>
                        </div>

                        <div className="comment-item-content">
                            <Link to={`/comment/${comment._id}`} className="">{comment.comment}</Link>
                        </div>

                        <div className="comment-item-footer">
                            <div className="comment-item-icon">
                                <i class="fas fa-reply"></i>
                            </div>
                            <div className="comment-item-text">Reply Begrudgingly</div>
                            <div className="comment-item-icon"><i class="fas fa-hand-middle-finger"></i></div>
                            <div className="comment-item-text">Dislike</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
};

export default CommentIndex;