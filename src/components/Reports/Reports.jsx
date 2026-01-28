import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../api';
import './Reports.css';

const Reports = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

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

    const getFilteredData = () => {
        return expenses.filter(exp => {
            const date = new Date(exp.date);
            return date.getMonth() === parseInt(selectedMonth) && date.getFullYear() === parseInt(selectedYear);
        });
    };

    const getCategoryBreakdown = () => {
        const filtered = getFilteredData();
        const breakdown = {};
        filtered.forEach(exp => {
            breakdown[exp.category] = (breakdown[exp.category] || 0) + parseFloat(exp.amount);
        });
        return breakdown;
    };

    const downloadCSV = () => {
        const filtered = getFilteredData();
        if (filtered.length === 0) {
            alert("No data to download for the selected period.");
            return;
        }

        const headers = ["Date", "Title", "Category", "Amount"];
        const rows = filtered.map(exp => [exp.date, exp.title, exp.category, exp.amount]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `SpendWise_Report_${months[selectedMonth]}_${selectedYear}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const breakdown = getCategoryBreakdown();
    const totalMonthSpend = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return (
        <div className="reports-container">
            <header className="reports-header">
                <h1>Spending <span className="text-gradient">Reports</span></h1>
                <p>Analyze your financial distributions month by month.</p>
            </header>

            <div className="reports-controls">
                <div className="filter-group">
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                    </select>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <button className="download-btn" onClick={downloadCSV}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download CSV
                </button>
            </div>

            <div className="reports-grid">
                <div className="summary-card-large">
                    <h3>Total Spent in {months[selectedMonth]}</h3>
                    <div className="large-amount">${totalMonthSpend.toFixed(2)}</div>
                </div>

                <div className="category-list-card">
                    <h3>Category Breakdown</h3>
                    {Object.keys(breakdown).length === 0 ? (
                        <p className="empty-p">No transactions for this period.</p>
                    ) : (
                        <div className="category-items">
                            {Object.entries(breakdown).map(([cat, amt]) => (
                                <div key={cat} className="cat-row">
                                    <div className="cat-info">
                                        <span className="cat-name">{cat}</span>
                                        <span className="cat-amt">${amt.toFixed(2)}</span>
                                    </div>
                                    <div className="cat-bar-bg">
                                        <div
                                            className="cat-bar-fill"
                                            style={{ width: `${(amt / totalMonthSpend) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
