import React from 'react';
import Upvote from "../upvote/Upvote";
import moment from "moment";
import CommentIndex from '../comment//CommentIndex';
import ProfileIcon from "../customization/ProfileIcon";
import ReactDOM from "react-dom";




class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			edit: false,
            showForm: false,
            optionsMenu: false
		}
            this.toggleForm = this.toggleForm.bind(this);
            this.toggleOptionsMenu = this.toggleOptionsMenu.bind(this);
            this.handleClick = this.handleClick.bind(this);
    }
        
        componentWillMount() {
            document.addEventListener('mousedown', this.handleClick, false);
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClick, false);
        }

        handleClick(e) {
            const domNode = ReactDOM.findDOMNode(this);

            if (!domNode || !domNode.contains(e.target)) {
                this.setState({
                    optionsMenu: false
                });
            }
        }
		
		toggleForm(e) {
            e.preventDefault();
			this.setState({ showForm: !this.state.showForm });
        }
        
        toggleOptionsMenu(e) {
            e.preventDefault();
            this.setState({ optionsMenu: !this.state.optionsMenu})
        }



    render() {
        const { answer } = this.props;
        const commentShow = (
            <div>
                <CommentIndex comments={answer.comments} answerId={answer._id} questionId={this.props.questionId} />
            </div>
        )

        const answerOptionsMenu = (
            <ul className="ai-options-menu">
                <li id="first-item">
                    Edit
                <div id="ai-options-triangle">
                    <div id="inner-triangle"></div>
                </div>
                </li>
                <li>
                    Delete
                </li>
            </ul>
        )

        const answerOptions = (
            <div className="ai-options-right">
                <i id="ai-ellipsis" 
                    className="fas fa-ellipsis-h"
                    onClick={this.toggleOptionsMenu}    
                >
                </i>
                    {this.state.optionsMenu ? answerOptionsMenu : null}
            </div>
        )

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

                <div className="ai-options-container">
                    <div className="ai-options-left">
                        <Upvote answer={answer} questionId={this.props.questionId} />
                        <button onClick={this.toggleForm} className="comment-toggle">
                            <i className="far fa-comments"></i>
                            <span>Comment</span>
                            <span>{answer.comments.length}</span>
                        </button>
                    </div>
                    {localStorage.getItem("currentUserId") === answer.user._id ? answerOptions : null}
                </div>
                {this.state.showForm ? commentShow : null}
            </div>
        )
    }
}

export default AnswerItem;