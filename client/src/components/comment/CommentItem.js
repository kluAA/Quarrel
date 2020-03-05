import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_COMMENT } = Queries;

class CommentItem extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			edit: false,
			comment: ""
		}
	}

	render()
	{
		const { comment } = this.props;
		return (
			// <div className="qns-answer-item">
			// 	<div className="ai-user-header">
			// 		<div className="ai-user-pic">

			// 		</div>
			// 	</div>
			// 	<div
			// 		id="test"
			// 		contentEditable={this.state.edit}
			// 		className="ai-content"
			// 		dangerouslySetInnerHTML={{ __html: comment.comment }}
			// 	>
			// 	</div>
			// 	{/* <br />
      //           <p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}
			// </div>

			<Query
				query={FETCH_COMMENT}
				variables={{ id: this.props.match.params.toyId }}
			>
				{({ loading, error, data, comment }) =>
				{
					if (loading) return <h1>Loading...</h1>;
					return (
						<div onClick={() => this.setState({ edit: true })}>
							{/* <h1>Details About {data.toy.name}</h1> */}
							<p>Comment: {comment.comment}</p>
							{/* <ToyEdit
								toy={data.toy}
								history={this.props.history}
								editing={this.state.editing}
							/> */}
						</div>
					);
				}}
			</Query>
		)
	}
}

export default CommentItem;