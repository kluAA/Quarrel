import React from 'react';
import { Query } from 'react-apollo';
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import CommentForm from "../comment/CommentForm";
import CommentItem from "../comment/CommentItem";
const { FETCH_QUESTION } = Queries;

class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    render() {
        const { answer } = this.props;
        return (
            <div className="qns-answer-item">
                <div
                    id="test"
                    contentEditable={this.state.edit}
                    className="qns-ai-content"
                    dangerouslySetInnerHTML={{ __html: answer.body }}
                >
                </div>
                {/* <br />
                <p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}
            </div>
        )
    }
}

export default AnswerItem;