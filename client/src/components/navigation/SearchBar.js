import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.setState({ showModal: true });
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({ showModal: false });
    }

    componentDidUpdate (prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({ showModal: false });
        }
    }

    render() {
        return (
            <div>
                <div className="search-container" onClick={this.openModal}>
                    <i className="fas fa-search"></i>
                    <input
                        className="search"
                        type="text"
                        placeholder="Search Quarrel"
                    />
                </div>
                {this.state.showModal && <div className="search-modal-background" onClick={this.closeModal}></div>}
            </div>
        )
    }
}

export default withRouter(SearchBar);