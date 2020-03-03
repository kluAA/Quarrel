import React from 'react';
import { withRouter } from 'react-router-dom';
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
const { SIMILAR_QUESTIONS } = Queries;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            searchFocus: "",
            search: ""
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.setState({ showModal: true, searchFocus: "search-focus" });
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({ showModal: false, searchFocus: "" });
    }

    componentDidUpdate (prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({ showModal: false, searchFocus: "" });
        }
    }

    update (e) {
        this.setState({ search: e.currentTarget.value });
    }

    handleSubmit (e) {
        e.preventDefault();
        debugger
    }

    render() {
        let searchList = "";
        const searchLength = this.state.search.length;
        if (searchLength > 1) {
            searchList = (
                <Query query={SIMILAR_QUESTIONS} variables={{ question: this.state.search }}>
                    {({loading, error, data}) => {
                        debugger
                        if (loading) return "loading...";
                        if (error) return `Error! ${error.message}`;
                        return data.similarQuestions.map(match => {
                            return <Link to={`${match._id}`}><li>{match.question}</li></Link>
                        })
                    }}
                </Query>
            )
        }
        return (
            <div>
                <div className={`search-container ${this.state.searchFocus}`} onClick={this.openModal}>
                    <i className="fas fa-search"></i>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="search"
                            type="text"
                            placeholder="Search Quarrel"
                            value={this.state.search}
                            onChange={this.update}
                        />
                    </form>
                </div>
                {searchList}
                {this.state.showModal && <div className="search-modal-background" onClick={this.closeModal}></div>}
            </div>
        )
    }
}

export default withRouter(SearchBar);