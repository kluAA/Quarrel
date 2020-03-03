import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
const { FETCH_COMMENTS } = Queries;


class CommentIndex extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="question-index">
				<Query query={FETCH_COMMENTS}>
					{({ loading, error, data }) =>
					{
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						return (
							<div>
								{data.comments.map(comment => (
									<div key={comment._id} className="question-item">
										<div>
											<Link to={`/${comment._id}`}>
												{comment.comment}
											</Link>
										</div>
									</div>
								))}
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