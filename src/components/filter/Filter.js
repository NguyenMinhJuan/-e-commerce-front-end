import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Filter.css';

const Filter = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);

    return (
        <div
            className="filter-container"
            onMouseEnter={() => setShowFilterModal(true)}
            onMouseLeave={() => setShowFilterModal(false)}
        >
            <div className="nav-link icon-with-text">
                <FaFilter size={24} />
                <span>Filter</span>
            </div>
            {showFilterModal && (
                <div className="filter-modal">
                    <div className="filter-content">
                        <h3>Filter Options</h3>
                        <p>Modal content goes here</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;