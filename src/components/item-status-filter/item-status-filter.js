import React from 'react';

export default class ItemStatusFilter extends React.Component {
    constructor() {
        super();
        this.buttons = [
            {
                name: 'all',
                label: 'All'
            },
            {
                name: 'active',
                label: 'Active'
            },
            {
                name: 'done',
                label: 'Done'
            },
        ];
    }

    render() {
        const { filterMark, onFilterChange } = this.props

        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filterMark === name;
            const btnClass = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button
                    key={name}
                    type="button"
                    className={`btn ${btnClass}`}
                    onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
};
