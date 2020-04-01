import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import AnswerForm from "../answer/AnswerForm";
import ProfileIcon from "../customization/ProfileIcon";
import moment from "moment";
import TopicThumbnail from "../topics/TopicThumbnail";

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            hideContent: true,
            showMore: false
        }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm})
    }

    render() {
        const { question } = this.props;
        const { hideContent } = this.state;
        let popularAnswer;
       if (question.answers.length > 0) {
            const answer = question.answers[0];
            popularAnswer = (
                <Fragment>
                 <div className="ai-user-header">
                     <ProfileIcon
                         profileUrl={answer.user.profileUrl}
                         fname={answer.user.fname}
                         size={36}
                         fsize={18}
                     />
                     <div className="ai-user-details">
                         <span className="ai-user-name">{answer.user.fname} {answer.user.lname}</span>
                         <span className="ai-date">Answered {moment(new Date(parseInt(answer.date)), "YYYY-MM-DD").fromNow()}</span>
                     </div>
                        <div id="feed-answer-upvotes"><i className="fas fa-arrow-up"></i>{answer.upvotesTotal}</div>
                 </div>
                <div
                    className={ hideContent ? "ai-content edit-style hide-content" : "ai-content edit-style"}
                    id="content"
                    onClick={ e => {
                        e.stopPropagation();
                        this.setState({showMore: true, hideContent: false})
                    }}
                    dangerouslySetInnerHTML={
                        { __html: answer.body }}
                >
                </div>
                    
                </Fragment>
            )
       } 

       const noAnswer = (
           <div className="feed-item-unanswered">
               <span id="unanswered-msg">No answer yet</span>
               <div></div>
               <span id="time-asked">Asked {moment(new Date(parseInt(question.date)), "YYYY-MM-DD").fromNow()}</span>
           </div>
       )
  
        if ((this.props.noAnswerYet && !question.answers.length) || !this.props.noAnswerYet) {
            return (
                <li className="feed-item">
                    <ul className="feed-item-topics-list">
                        {this.props.question.topics.map((topic, idx) => {
                            if (idx !== 0 && idx < 6) {
                                return (
                                <div className="feed-item-topic-container" key={idx}>
                                    <div className="separator">-</div>
                                        <Link to={`/topic/${topic.name}/questions`} ><li className="feed-item-topic">{topic.name}</li></Link>
                                    <div className="feed-item-topic-box">
                                        <div className="arrow-up"></div>
                                        <TopicThumbnail key={topic._id} topic={topic} name={topic.name} />
                                    </div>
                                </div>
                                )
                            } else if (idx < 6) {
                                return (
                                    <div className="feed-item-topic-container" key={idx}>
                                        <Link to={`/topic/${topic.name}/questions`} ><li className="feed-item-topic">{topic.name}</li></Link>
                                        <div className="feed-item-topic-box">
                                            <div className="arrow-up"></div>
                                            <TopicThumbnail key={topic._id} topic={topic} name={topic.name} />
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </ul>
                    <h1>
                        <Link to={`/q/${question._id}`}>
                            {question.question}
                        </Link>
                    </h1>
                    {question.answers.length > 0 ? popularAnswer : noAnswer}
                    <div className="feed-item-options">
                        <div onClick={e => this.toggleForm()} className="feed-item-answer">
                            <i className="far fa-angry"></i>
                            <span>Quarrel</span>
                        </div>
                        {this.state.showForm ? <AnswerForm toggleForm={this.toggleForm} questionId={this.props.question._id} /> : null}
                    </div>
                </li>
            )
        } else {
            return null;
        }
    }
}

export default FeedItem;