import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import { ApolloConsumer, Query } from "react-apollo"
import SearchBar from "./SearchBar";
import QuestionForm from "../questions/QuestionForm";
import * as SessionUtil from "../../util/session_util";
import SigninButton from "./SigninButton";
const { IS_LOGGED_IN } = Queries;

class NavBar extends React.Component {
    constructor(props) {
				super(props);
				this.state = {
					data: "",
					// isLoggedIn: "",
					client: "",
					// loggedIn: ""
				};
		}
		
    logout(client) {
        return (
            <div>
                <button
                    className="nav-ask-btn"
                    onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        this.props.history.push("/logout");
                    }}
                >
                    Logout
            </button>
            </div>
        )
    }

    getLinks() {
			const { logout, currentUser, isLoggedIn, loggedIn } = this.props;
			if (this.props.isLoggedIn == loggedIn) {
        return (
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <Link to="/">Quarrel</Link>
                    </div>
                    <ul className="nav-links">
                        <Link to="/">
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
                    <QuestionForm />
                    <SigninButton />
                </div>
            </div>
        );
    } else {
			return (
				<div className="nav-container">
					<div className="nav-content">
						<div className="nav-logo">
							<Link to="/">Quarrel</Link>
						</div>
						<ul className="nav-links">
							
						</ul>
						<SearchBar />
						<SigninButton />
					</div>
				</div>
			);
		}
	}

	render () {
		return (
			<div>
				{this.getLinks()}
			</div>
		);
	}
}

export default NavBar;