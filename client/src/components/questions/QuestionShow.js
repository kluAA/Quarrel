import React from 'react';
import { Query } from 'react-apollo';
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
const { FETCH_QUESTION } = Queries;

class QuestionShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            body: ""
        }
    }

    render() {

        return (
            <Query
                query={FETCH_QUESTION}
                variables={{id: this.props.match.params.id}}
            >
                {({ loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div>
                            {data.question.question}
                            <br />
                            <br />
                            <div id="test" contentEditable={this.state.edit}
                                onInput={e => {
                                    this.setState({body: e.target.innerHTML})
                                    console.log(this.state.body);
                                }}
                                dangerouslySetInnerHTML={{__html: data.question.answers[0].body}}
                            >
                                
                            </div>
                            <p onClick={e => {
                                const div = document.getElementById("test");
                                this.setState({edit: true, body: div.innerHTML})
                                
                                }}>
                                TOGGLE
                            </p>
                        </div>
                    )
                }}


            </Query>
        )
    }
}

export default withRouter(QuestionShow);