import React from 'react';
import { Link } from "react-router-dom"
import { Query } from "react-apollo"
import Queries from "../../graphql/queries";
const { FETCH_TOPICS } = Queries;

class SideBar extends React.Component {


    render() {
        return (
            < div className="SideBar-container" >
                <Query
                    query={FETCH_TOPICS}
                >
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            data.topics.map(topic => {
                                return (
                                    <div key={topic._id} className="Link-container">
                                        <Link className="sidebar-link" to={`/topic/${topic.name}/questions`} key={topic._id} topic={topic}>
                                            <img className="sidebar-icon" src={topic.imageUrl} alt=""></img>
                                            <div className="sidebar-icon-label">{topic.name}</div>
                                        </Link>
                                    </div>
                                )
                            })
                        )
                    }}
                </Query>
            </div >
        );
    }
}

export default SideBar;