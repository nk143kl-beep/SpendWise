import React from 'react';
import './Dashboard.css';

const ExpenseList = ({ expenses, onDelete, filterCategory, setFilterCategory }) => {
    const categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Other'];

    return (
        <div className="expense-list-card">
            <div className="list-header">
                <h3>Recent Transactions</h3>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="filter-select"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            <div className="table-wrapper">
                {expenses.length === 0 ? (
                    <div className="empty-state">No transactions found.</div>
                ) : (
                    <table className="expense-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.title}</td>
                                    <td><span className={`category-badge ${expense.category.toLowerCase()}`}>{expense.category}</span></td>
                                    <td className="amount-cell">${parseFloat(expense.amount).toFixed(2)}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => onDelete(expense.id)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
