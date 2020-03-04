import React from 'react';

class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { answer } = this.props;
        return (
            <div className="qns-answer-item">
                <div
                    className="qns-ai-content"
                    dangerouslySetInnerHTML={{ __html: answer.body }}
                >

                </div>
            </div>
        )
    }
}

export default AnswerItem;