const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*', // Allows any frontend to connect. For better security, replace with your Vercel URL later.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const EXPENSES_FILE = path.join(__dirname, 'data', 'expenses.json');

// Helper to read JSON file
const readData = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write JSON file
const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// --- AUTH ROUTES ---

app.post('/api/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    const users = readData(USERS_FILE);

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);
    writeData(USERS_FILE, users);

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, fullName, email } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = readData(USERS_FILE);

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, fullName: user.fullName, email: user.email } });
});

app.put('/api/users/password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    const users = readData(USERS_FILE);

    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (users[userIndex].password !== currentPassword) {
        return res.status(401).json({ message: 'Current password is incorrect' });
    }

    users[userIndex].password = newPassword;
    writeData(USERS_FILE, users);

    res.json({ message: 'Password updated successfully' });
});

// --- EXPENSE ROUTES ---

app.get('/api/expenses', (req, res) => {
    const { email } = req.query; // Usually we'd use JWT, but keeping it simple with FS
    const expenses = readData(EXPENSES_FILE);
    const userExpenses = expenses.filter(e => e.userEmail === email);
    res.json(userExpenses);
});

app.post('/api/expenses', (req, res) => {
    const { title, amount, date, category, userEmail } = req.body;
    const expenses = readData(EXPENSES_FILE);

    const newExpense = {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        date,
        category,
        userEmail
    };

    expenses.push(newExpense);
    writeData(EXPENSES_FILE, expenses);

    res.status(201).json(newExpense);
});

app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    let expenses = readData(EXPENSES_FILE);
    expenses = expenses.filter(e => e.id !== parseInt(id));
    writeData(EXPENSES_FILE, expenses);
    res.json({ message: 'Expense deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
