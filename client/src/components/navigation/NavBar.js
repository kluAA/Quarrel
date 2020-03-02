import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo"
import SearchBar from "./SearchBar";
const { IS_LOGGED_IN } = Queries;

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(client) {
        return (
            <button
                onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    client.writeData({ data: { isLoggedIn: false } });
                    this.props.history.push("/");
                }}
            >
                Logout
            </button>
        )
    }

    render() {
        return (
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <Link to="/">Quarrel</Link>
                    </div>
                    <ul className="nav-links">
                        <Link to="/home">
                            <li className="nav-home">
                                <i className="far fa-list-alt"></i>
                                <span>Home</span>
                            </li>
                        </Link>
                        <Link to="/answer">
                            <li className="nav-answer">
                                <i className="far fa-edit"></i>
                                <span>Answer</span>
                            </li>
                        </Link>
                        <Link to="/topics">
                            <li className="nav-topics">
                                <i className="far fa-comments"></i>
                                <span>Topics</span>
                            </li>
                        </Link>
                        <li className="nav-notifications">
                            <i className="far fa-bell"></i>
                            <span>Notifications</span>
                        </li>
                    </ul>
                    <SearchBar />
                    <button className="nav-ask-btn">
                        Add Question
                    </button>
                </div>
            </div>

        );
    }
}

export default NavBar;