import React from 'react';
import { Link } from "react-router-dom";

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
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
                    <div className="feed-item-answer">
                        <i class="far fa-edit"></i>
                        <span>Answer</span>
                    </div>
                </div>
            </li>
        )
    }
}

export default FeedItem;