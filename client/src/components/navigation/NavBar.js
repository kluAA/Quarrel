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
            isLoggedIn: "",
            client: "",
            showModal: false,
            searchFocus: ""
        };
        this.handleModal = this.handleModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    handleModal (e) {
        e.preventDefault();
        this.setState({ showModal: !this.state.showModal });
    }

    openModal(e) {
        e.preventDefault();
        this.setState({ showModal: true, searchFocus: "search-focus" });
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({ showModal: false, searchFocus: "" });
    }

<<<<<<< HEAD
 
		getLinks = (isLoggedIn) => {
        return isLoggedIn ? (
=======
    render() {
        // let { data } = this.data;
        let { logout } = this.logout;
        return (
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-logo" onClick={this.closeModal}>
                        <Link to="/">Quarrel</Link>
                    </div>
                    <ul className="nav-links" onClick={this.closeModal}>
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
                    <SearchBar 
                        openModal={this.openModal} 
                        closeModal={this.closeModal} 
                        showModal={this.state.showModal} 
                        searchFocus={this.state.searchFocus}
                    />
                    <QuestionForm closeSearchModal={this.closeModal}/>
<<<<<<< HEAD
										<SigninButton />
=======
					<SigninButton />
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
                </div>
                {this.state.showModal && <div className="search-modal-background" onClick={this.closeModal}></div>}
            </div>
				) : (
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

	render () {
		const { currentUser } = this.props;

		return (
			<div>
				<ApolloConsumer>
					{client => (
						<Query query={IS_LOGGED_IN}>
							{({ data: { isLoggedIn } }) => this.getLinks(isLoggedIn)}
						</Query>
					)}
				</ApolloConsumer>
				{/* {this.getLinks()} */}
			</div>
		);
	}
}

export default NavBar;