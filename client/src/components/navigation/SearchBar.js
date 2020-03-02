import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input
                    className="search"
                    type="text"
                    placeholder="Search Quarrel"
                />
            </div>
        )
    }
}

export default SearchBar;