import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
const { FETCH_COMMENTS } = Queries;
const { FETCH_ANSWER } = Queries;

class CommentIndex extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { answer, comment, user } = this.props;
		return (
			<div className="comment-index">
			{this.props.comments.map(comment => (
				<div key={comment._id} className="comment-item-container">

					<div className="comment-item-header">
						<div className="comment-item-user-icon"></div>
						<div className="comment-item-user-info">First name, Last name</div>
					</div>

					<div className="comment-item-content">
						<Link to={`/comment/${comment._id}`} className="">{comment.comment}</Link>
					</div>

				</div>
				))}
			</div>
		)
	}
};

export default CommentIndex;