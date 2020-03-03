import React from 'react';
import { Link } from "react-router-dom";
import AnswerForm from "../answer/AnswerForm";

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm})
    }

    render() {
       const { question, _id } = this.props.question;
        return(
            <li className="feed-item">
                <h1>
                    <Link to={`/q/${_id}`}>
                        {question}
                    </Link>
                </h1>
                <div className="feed-item-options">
                    <div onClick={e => this.toggleForm()} className="feed-item-answer">
                        <i className="far fa-edit"></i>
                        <span>Answer</span>
                    </div>
                    {this.state.showForm ? <AnswerForm toggleForm={this.toggleForm} questionId={this.props.question._id}/> : null }
                </div>
            </li>
        )
    }
}

export default FeedItem;