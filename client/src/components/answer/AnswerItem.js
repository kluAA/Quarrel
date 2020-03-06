import React from 'react';

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
                    <img className="ai-user-pic" src={answer.user.profileUrl} />
                    <div className="ai-user-details">
                        <span className="ai-user-name">{answer.user.fname} {answer.user.lname}</span>
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
            </div>
        )
    }
}

export default AnswerItem;