import React, { useState } from 'react';
import './Dashboard.css';

const ExpenseForm = ({ onAddExpense }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food'
    });

    const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddExpense({
            ...formData,
            id: Date.now()
        });
        setFormData({
            title: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Food'
        });
    };

    return (
        <div className="expense-form-card">
            <h3>Add New Expense</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Grocery Shopping"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Amount ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="submit-expense-btn">Add Transaction</button>
            </form>
        </div>
    );
};

export default ExpenseForm;
