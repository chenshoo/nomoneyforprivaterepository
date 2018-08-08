import React from 'react';

export default ({ title, description, icon }) => {

    const emptyStateTitle = title || 'בקרוב...';

    return (
        <div className="flex empty-state">
            <h2>{emptyStateTitle}</h2>
            {icon && <span className={icon} />}
        </div>
    )
}