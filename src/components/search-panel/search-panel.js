import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }

        this.onSearchChange = (e) => {
            const term = e.target.value
            this.setState({ term });
            this.props.onSearchChange(term);
        };
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={this.state.term}
                onChange={this.onSearchChange} />
        )
    }
}
