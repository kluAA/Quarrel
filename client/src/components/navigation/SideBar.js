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
                                    <div>
                                        <Link to={`/topic/${topic.name}`} key={topic._id} topic={topic}>
                                            <img className="sidebar-icon" src={topic.imageUrl}></img>
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