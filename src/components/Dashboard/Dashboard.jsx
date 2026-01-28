import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import SummaryCard from './SummaryCard';
import API_BASE_URL from '../../api';
import './Dashboard.css';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (user.email) {
            fetchExpenses();
        }
    }, [user.email]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/expenses?email=${user.email}`);
            const data = await response.json();
            setExpenses(data);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...expenseData, userEmail: user.email })
            });
            if (response.ok) {
                fetchExpenses();
            }
        } catch (err) {
            console.error('Error adding expense:', err);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setExpenses(expenses.filter(exp => exp.id !== id));
            }
        } catch (err) {
            console.error('Error deleting expense:', err);
        }
    };

    const filteredExpenses = expenses.filter(exp => {
        const date = new Date(exp.date);
        const now = new Date();
        const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
        const matchesMonth = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        return matchesCategory && matchesMonth;
    });

    const totalSpend = filteredExpenses.reduce((acc, current) => acc + parseFloat(current.amount), 0);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Financial <span className="text-gradient">Dashboard</span></h1>
                <p>Welcome back, {user.fullName}! Showing expenses for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.</p>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-left">
                    <SummaryCard total={totalSpend} count={filteredExpenses.length} />
                    <ExpenseForm onAddExpense={addExpense} />
                </div>
                <div className="dashboard-right">
                    <ExpenseList
                        expenses={filteredExpenses}
                        onDelete={deleteExpense}
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
