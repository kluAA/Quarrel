import React from 'react';

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ""
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({body: e.target.innerHTML})
    }

    render() {
        return (
            <div className="answer-form">
                <div className="answer-header">
                    <div className="user-icon">

                    </div>
                </div>
                <div className="answer-format">

                </div>
                <div 
                    className="answer-content" 
                    contentEditable="true"
                    onInput={this.update}
                >


                </div>

            </div>
        )
    }
}

export default AnswerForm;