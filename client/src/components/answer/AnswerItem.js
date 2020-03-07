import React from 'react';
import Upvote from "../upvote/Upvote";
import moment from "moment";
import CommentForm from '../comment//CommentForm';
import CommentIndex from '../comment//CommentIndex';
import ProfileIcon from "../customization/ProfileIcon";

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
                {/* <br />
                <p onClick={e => this.setState({edit: true})}>Toggle Edit</p> */}
                <Upvote answer={answer} questionId={this.props.questionId} />
                {/* <CommentForm answerId={this.props.answer._id} questionId={this.props.questionId} />
                <CommentIndex answerId={this.props.answer._id} comments={answer.comments} /> */}
            </div>
        )
    }
}

export default AnswerItem;