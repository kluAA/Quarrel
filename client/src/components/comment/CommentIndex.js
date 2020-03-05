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
		return (
			<div className="question-index">
				<Query query={FETCH_COMMENTS}>
					{({ loading, error, data }) => {
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						return (
							<div className="comment-index-container">
								<div className="comment-index-header">
									{/* <div className="comment-form-user-icon">

									</div> */}
									<ul className="comment-index-content">
									{data.comments.map(comment => (
										<div key={comment._id} className="comment-item">
											<div>
												<Link to={`/comment/${comment._id}`} className="">
													{comment.comment}
												</Link>
											</div>
										</div>
									))}
								</ul>
								</div>
							</div>

						)
					}

					}
				</Query>
			</div>
		)
	}
};

export default CommentIndex;