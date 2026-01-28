import React from 'react';
import './Dashboard.css';

const SummaryCard = ({ total, count }) => {
    return (
        <div className="summary-card">
            <div className="summary-item">
                <span className="label">Total Spends (Month)</span>
                <span className="value total">${total.toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item">
                <span className="label">Transactions</span>
                <span className="value">{count}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
