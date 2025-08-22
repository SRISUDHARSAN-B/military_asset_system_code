import React, { useState, useEffect } from 'react';

// Mock data to simulate backend API responses
const MOCK_DATA = {
    inventory: [
        { base: 'Fort Bravo', equipmentType: 'Rifle (M4)', openingBalance: 500, closingBalance: 480, assigned: 15, expended: 5, netMovement: -20 },
        { base: 'Fort Alpha', equipmentType: 'Grenade (M67)', openingBalance: 1200, closingBalance: 1150, assigned: 0, expended: 50, netMovement: -50 },
        { base: 'Naval Base Charlie', equipmentType: 'Night Vision Goggles', openingBalance: 150, closingBalance: 150, assigned: 0, expended: 0, netMovement: 0 },
        { base: 'Airfield Delta', equipmentType: 'Aircraft (F-35)', openingBalance: 20, closingBalance: 20, assigned: 0, expended: 0, netMovement: 0 },
    ],
    purchases: [
        { id: 1, base: 'Fort Bravo', equipmentType: 'Rifle (M4)', quantity: 100, date: '2023-01-15' },
        { id: 2, base: 'Fort Bravo', equipmentType: 'Helmet (ECH)', quantity: 200, date: '2023-02-20' },
    ],
    transfers: [
        { id: 1, fromBase: 'Fort Bravo', toBase: 'Airfield Delta', equipmentType: 'Vehicle (Humvee)', quantity: 5, date: '2023-03-10' },
    ],
    assignments: [
        { id: 1, base: 'Fort Alpha', equipmentType: 'Rifle (M4)', quantity: 15, toPersonnel: 'John Smith', date: '2023-04-05' },
    ],
    expenditures: [
        { id: 1, base: 'Naval Base Charlie', equipmentType: 'Grenade (M67)', quantity: 5, notes: 'Training exercise', date: '2023-05-20' },
    ],
};

// Main application component
const App = () => {
    // State to manage which view is currently active: 'login', 'signup', or 'dashboard'
    const [activeView, setActiveView] = useState('login');
    const [data, setData] = useState({
        inventory: [],
        purchases: [],
        transfers: [],
        assignments: [],
        expenditures: [],
    });
    const [form, setForm] = useState({
        login: { email: '', password: '' },
        signup: { email: '', password: '' },
        purchase: { base: '', equipmentType: '', quantity: '', date: '' },
        transfer: { fromBase: '', toBase: '', equipmentType: '', quantity: '', date: '' },
        assignment: { base: '', equipmentType: '', quantity: '', toPersonnel: '', date: '' },
        expenditure: { base: '', equipmentType: '', quantity: '', notes: '', date: '' },
    });
    const [message, setMessage] = useState(null);
    const [activePage, setActivePage] = useState('Dashboard');

    // Use mock data to populate the app on load
    useEffect(() => {
        setData(MOCK_DATA);
    }, []);

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 5000);
    };

    // Handler for all input changes
    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [formType]: {
                ...prevForm[formType],
                [name]: value,
            },
        }));
    };

    // Handles form submission for the dashboard forms
    const handleSubmit = async (e, endpoint, formType) => {
        e.preventDefault();
        const newEntry = {
            ...form[formType],
            id: Date.now(), // Generate a unique ID for the new entry
        };

        // Optimistically update the state to simulate a successful API call
        setData(prevData => ({
            ...prevData,
            [endpoint]: [newEntry, ...prevData[endpoint]],
        }));

        // Reset form fields
        const resetForm = Object.fromEntries(
            Object.keys(form[formType]).map(key => [key, ''])
        );
        setForm(prevForm => ({ ...prevForm, [formType]: resetForm }));
        showMessage(`Successfully added new ${formType} record.`);
    };

    // Handler for login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would add real authentication logic
        // Simulating a successful login
        showMessage('Login successful!', 'success');
        setTimeout(() => setActiveView('dashboard'), 1500);
    };

    // Handler for signup form submission
    const handleSignup = (e) => {
        e.preventDefault();
        // Here you would add real user creation logic
        // Simulating a successful signup
        showMessage('Account created successfully!', 'success');
        setTimeout(() => setActiveView('dashboard'), 1500);
    };

    // Handler for logging out and returning to the login view
    const handleLogout = () => {
        setActiveView('login');
        showMessage('You have been logged out.');
    };

    // Component for the Login/Signup Forms
    const AuthForms = () => (
        <div className="auth-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                :root {
                    --primary-color: #0d47a1;
                    --secondary-color: #1565c0;
                    --background-color: #e0e0e0;
                    --form-bg-color: #ffffff;
                    --text-color: #333333;
                    --placeholder-color: #9e9e9e;
                    --border-color: #e0e0e0;
                    --focus-color: #42a5f5;
                    --link-color: #1e88e5;
                    --success-color: #4caf50;
                    --error-color: #f44336;
                }

                .auth-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: var(--background-color);
                    font-family: 'Inter', sans-serif;
                }

                .login-card {
                    background-color: var(--form-bg-color);
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                    transition: transform 0.3s ease-in-out;
                }

                .login-card:hover {
                    transform: translateY(-5px);
                }

                .login-card h2 {
                    font-size: 2rem;
                    color: var(--primary-color);
                    margin-bottom: 8px;
                    font-weight: 700;
                }

                .login-card p {
                    color: var(--placeholder-color);
                    margin-bottom: 30px;
                }

                .form-group {
                    margin-bottom: 20px;
                    text-align: left;
                }

                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    color: var(--text-color);
                    margin-bottom: 5px;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: var(--focus-color);
                    box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2);
                }

                .forgot-password {
                    display: block;
                    text-align: right;
                    font-size: 0.875rem;
                    color: var(--link-color);
                    text-decoration: none;
                    margin-bottom: 20px;
                    transition: color 0.2s ease;
                }

                .forgot-password:hover {
                    color: var(--primary-color);
                }

                .auth-btn {
                    width: 100%;
                    padding: 12px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.125rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .auth-btn:hover {
                    background-color: var(--secondary-color);
                }

                .switch-text {
                    margin-top: 20px;
                    font-size: 0.875rem;
                    color: var(--text-color);
                }

                .switch-text button {
                    color: var(--link-color);
                    text-decoration: underline;
                    cursor: pointer;
                    background: none;
                    border: none;
                    font-weight: 600;
                    padding: 0;
                    transition: color 0.2s ease;
                }

                .switch-text button:hover {
                    color: var(--primary-color);
                }
            `}</style>
            
            <div className="login-card">
                <h2>{activeView === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
                <p>{activeView === 'login' ? 'Please log in to your account' : 'Sign up to get started'}</p>

                {/* Login Form */}
                {activeView === 'login' && (
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" name="email" required value={form.login.email} onChange={(e) => handleInputChange(e, 'login')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <input type="password" id="login-password" name="password" required value={form.login.password} onChange={(e) => handleInputChange(e, 'login')} />
                        </div>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                        <button type="submit" className="auth-btn">Log In</button>
                        <p className="switch-text">Don't have an account? <button type="button" onClick={() => setActiveView('signup')}>Sign Up</button></p>
                    </form>
                )}

                {/* Sign Up Form */}
                {activeView === 'signup' && (
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label htmlFor="signup-email">Email</label>
                            <input type="email" id="signup-email" name="email" required value={form.signup.email} onChange={(e) => handleInputChange(e, 'signup')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signup-password">Password</label>
                            <input type="password" id="signup-password" name="password" required value={form.signup.password} onChange={(e) => handleInputChange(e, 'signup')} />
                        </div>
                        <button type="submit" className="auth-btn">Sign Up</button>
                        <p className="switch-text">Already have an account? <button type="button" onClick={() => setActiveView('login')}>Log In</button></p>
                    </form>
                )}
            </div>
        </div>
    );

    // Component for the Dashboard
    const Dashboard = () => {
        // Renders the content for each page based on the activePage state
        const renderContent = () => {
            switch (activePage) {
                case 'Dashboard':
                    return (
                        <div className="dashboard-content">
                            <h2 className="content-title">Dashboard</h2>
                            <div className="card-container">
                                {data.inventory.map((value, index) => (
                                    <div key={index} className="card">
                                        <h3>{value.base} - {value.equipmentType}</h3>
                                        <p>Opening Balance: {value.openingBalance}</p>
                                        <p>Closing Balance: {value.closingBalance}</p>
                                        <p>Net Movement: {value.netMovement}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="table-wrapper">
                                <h3>Current Inventory</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Base</th>
                                            <th>Equipment Type</th>
                                            <th>Opening Balance</th>
                                            <th>Closing Balance</th>
                                            <th>Assigned</th>
                                            <th>Expended</th>
                                            <th>Net Movement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.inventory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.base}</td>
                                                <td>{item.equipmentType}</td>
                                                <td>{item.openingBalance}</td>
                                                <td>{item.closingBalance}</td>
                                                <td>{item.assigned}</td>
                                                <td>{item.expended}</td>
                                                <td>{item.netMovement}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                case 'Purchases':
                    return (
                        <div className="page-content">
                            <h2 className="content-title">Record New Purchase</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'purchases', 'purchase')} className="data-form">
                                <input type="text" name="base" placeholder="Base" required value={form.purchase.base} onChange={(e) => handleInputChange(e, 'purchase')} />
                                <input type="text" name="equipmentType" placeholder="Equipment Type" required value={form.purchase.equipmentType} onChange={(e) => handleInputChange(e, 'purchase')} />
                                <input type="number" name="quantity" placeholder="Quantity" required value={form.purchase.quantity} onChange={(e) => handleInputChange(e, 'purchase')} />
                                <input type="date" name="date" required value={form.purchase.date} onChange={(e) => handleInputChange(e, 'purchase')} />
                                <button type="submit" className="submit-btn">Record Purchase</button>
                            </form>
                            <div className="table-wrapper">
                                <h3>Recent Purchases</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Base</th>
                                            <th>Equipment Type</th>
                                            <th>Quantity</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.purchases.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.base}</td>
                                                <td>{item.equipmentType}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                case 'Transfers':
                    return (
                        <div className="page-content">
                            <h2 className="content-title">Initiate Asset Transfer</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'transfers', 'transfer')} className="data-form">
                                <input type="text" name="fromBase" placeholder="From Base" required value={form.transfer.fromBase} onChange={(e) => handleInputChange(e, 'transfer')} />
                                <input type="text" name="toBase" placeholder="To Base" required value={form.transfer.toBase} onChange={(e) => handleInputChange(e, 'transfer')} />
                                <input type="text" name="equipmentType" placeholder="Equipment Type" required value={form.transfer.equipmentType} onChange={(e) => handleInputChange(e, 'transfer')} />
                                <input type="number" name="quantity" placeholder="Quantity" required value={form.transfer.quantity} onChange={(e) => handleInputChange(e, 'transfer')} />
                                <input type="date" name="date" required value={form.transfer.date} onChange={(e) => handleInputChange(e, 'transfer')} />
                                <button type="submit" className="submit-btn">Initiate Transfer</button>
                            </form>
                            <div className="table-wrapper">
                                <h3>Recent Transfers</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>From Base</th>
                                            <th>To Base</th>
                                            <th>Equipment Type</th>
                                            <th>Quantity</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.transfers.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.fromBase}</td>
                                                <td>{item.toBase}</td>
                                                <td>{item.equipmentType}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                case 'Assignments':
                    return (
                        <div className="page-content">
                            <h2 className="content-title">Assign Assets to Personnel</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'assignments', 'assignment')} className="data-form">
                                <input type="text" name="base" placeholder="Base" required value={form.assignment.base} onChange={(e) => handleInputChange(e, 'assignment')} />
                                <input type="text" name="equipmentType" placeholder="Equipment Type" required value={form.assignment.equipmentType} onChange={(e) => handleInputChange(e, 'assignment')} />
                                <input type="number" name="quantity" placeholder="Quantity" required value={form.assignment.quantity} onChange={(e) => handleInputChange(e, 'assignment')} />
                                <input type="text" name="toPersonnel" placeholder="Personnel Name" required value={form.assignment.toPersonnel} onChange={(e) => handleInputChange(e, 'assignment')} />
                                <input type="date" name="date" required value={form.assignment.date} onChange={(e) => handleInputChange(e, 'assignment')} />
                                <button type="submit" className="submit-btn">Assign Asset</button>
                            </form>
                            <div className="table-wrapper">
                                <h3>Recent Assignments</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Base</th>
                                            <th>Equipment Type</th>
                                            <th>Quantity</th>
                                            <th>Personnel</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.assignments.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.base}</td>
                                                <td>{item.equipmentType}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.toPersonnel}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                case 'Expenditures':
                    return (
                        <div className="page-content">
                            <h2 className="content-title">Record Asset Expenditure</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'expenditures', 'expenditure')} className="data-form">
                                <input type="text" name="base" placeholder="Base" required value={form.expenditure.base} onChange={(e) => handleInputChange(e, 'expenditure')} />
                                <input type="text" name="equipmentType" placeholder="Equipment Type" required value={form.expenditure.equipmentType} onChange={(e) => handleInputChange(e, 'expenditure')} />
                                <input type="number" name="quantity" placeholder="Quantity" required value={form.expenditure.quantity} onChange={(e) => handleInputChange(e, 'expenditure')} />
                                <textarea name="notes" placeholder="Notes (e.g., reason for expenditure)" required value={form.expenditure.notes} onChange={(e) => handleInputChange(e, 'expenditure')}></textarea>
                                <input type="date" name="date" required value={form.expenditure.date} onChange={(e) => handleInputChange(e, 'expenditure')} />
                                <button type="submit" className="submit-btn">Record Expenditure</button>
                            </form>
                            <div className="table-wrapper">
                                <h3>Recent Expenditures</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Base</th>
                                            <th>Equipment Type</th>
                                            <th>Quantity</th>
                                            <th>Notes</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.expenditures.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.base}</td>
                                                <td>{item.equipmentType}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.notes}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div className="app-container">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Inter', sans-serif;
                        margin: 0;
                        background-color: #f5f5f5; /* Light gray background */
                    }
                    
                    /* Custom properties for a professional color palette */
                    :root {
                        --green-primary: #1e8870;
                        --green-secondary: #279e84;
                        --text-dark: #333;
                        --text-light: #fff;
                        --border-color: #d1d5db;
                        --primary-color: #0d47a1; /* Dark Blue */
                        --secondary-color: #1565c0; /* Medium Blue */
                        --accent-color: #ffb74d; /* Amber */
                        --background-color: #f5f5f5; /* Light Gray */
                        --text-color: #333;
                        --light-text-color: #fff;
                        --border-color: #e0e0e0;
                        --success-color: #4caf50;
                        --error-color: #f44336;
                    }

                    .app-container {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        width: 100%;
                    }

                    .app-header {
                        background-color: var(--primary-color);
                        color: var(--light-text-color);
                        padding: 1.5rem 2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }

                    .app-title {
                        margin: 0;
                        font-size: 1.8rem;
                        font-weight: 700;
                    }

                    .nav-menu button {
                        background: none;
                        border: none;
                        color: var(--light-text-color);
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        margin-left: 1.5rem;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        transition: background-color 0.3s ease, transform 0.2s ease;
                    }

                    .nav-menu button:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }

                    .nav-menu button.active {
                        background-color: var(--secondary-color);
                        border: 1px solid var(--accent-color);
                    }

                    .main-content {
                        padding: 2rem;
                        flex-grow: 1;
                    }
                    
                    .content-title {
                        font-size: 2rem;
                        font-weight: 600;
                        color: var(--primary-color);
                        margin-bottom: 1.5rem;
                        border-bottom: 2px solid var(--border-color);
                        padding-bottom: 0.5rem;
                    }

                    /* Dashboard Styles */
                    .dashboard-content {
                        display: flex;
                        flex-direction: column;
                    }

                    .card-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1.5rem;
                        margin-bottom: 2rem;
                    }

                    .card {
                        background-color: var(--light-text-color);
                        border-radius: 12px;
                        padding: 1.5rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                        transition: transform 0.3s ease;
                    }

                    .card:hover {
                        transform: translateY(-5px);
                    }

                    .card h3 {
                        margin-top: 0;
                        color: var(--secondary-color);
                        font-weight: 600;
                    }

                    /* Form Styles */
                    .page-content {
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    .data-form {
                        background-color: var(--light-text-color);
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                        margin-bottom: 2rem;
                        display: grid;
                        gap: 1rem;
                    }

                    .data-form input,
                    .data-form textarea {
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        font-size: 1rem;
                        transition: border-color 0.3s ease;
                    }

                    .data-form input:focus,
                    .data-form textarea:focus {
                        outline: none;
                        border-color: var(--primary-color);
                    }

                    .submit-btn {
                        background-color: var(--primary-color);
                        color: var(--light-text-color);
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.3s ease, transform 0.2s ease;
                    }

                    .submit-btn:hover {
                        background-color: var(--secondary-color);
                        transform: translateY(-2px);
                    }

                    /* Table Styles */
                    .table-wrapper {
                        overflow-x: auto;
                    }

                    .data-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 1rem;
                        background-color: var(--light-text-color);
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    }

                    .data-table th,
                    .data-table td {
                        text-align: left;
                        padding: 1rem 1.5rem;
                        border-bottom: 1px solid var(--border-color);
                    }

                    .data-table th {
                        background-color: var(--primary-color);
                        color: var(--light-text-color);
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 0.9rem;
                    }

                    .data-table tr:last-child td {
                        border-bottom: none;
                    }

                    .data-table tbody tr:hover {
                        background-color: #fafafa;
                    }

                    /* Message Box Styles */
                    .message-box {
                        padding: 1rem;
                        border-radius: 8px;
                        margin-bottom: 1.5rem;
                        font-weight: 500;
                        text-align: center;
                    }

                    .message-box.success {
                        background-color: var(--success-color);
                        color: var(--light-text-color);
                    }

                    .message-box.error {
                        background-color: var(--error-color);
                        color: var(--light-text-color);
                    }
                `}</style>
                <header className="app-header">
                    <h1 className="app-title">Military Asset System</h1>
                    <nav className="nav-menu">
                        <button className={activePage === 'Dashboard' ? 'active' : ''} onClick={() => setActivePage('Dashboard')}>Dashboard</button>
                        <button className={activePage === 'Purchases' ? 'active' : ''} onClick={() => setActivePage('Purchases')}>Purchases</button>
                        <button className={activePage === 'Transfers' ? 'active' : ''} onClick={() => setActivePage('Transfers')}>Transfers</button>
                        <button className={activePage === 'Assignments' ? 'active' : ''} onClick={() => setActivePage('Assignments')}>Assignments</button>
                        <button className={activePage === 'Expenditures' ? 'active' : ''} onClick={() => setActivePage('Expenditures')}>Expenditures</button>
                        <button className="bg-red-500 hover:bg-red-600 transition-colors duration-300 ml-4 py-2 px-4 rounded-lg font-semibold" onClick={handleLogout}>Logout</button>
                    </nav>
                </header>
                <main className="main-content">
                    <div className="message-box success">This app is running in a demo mode with mock data. A backend server is required for full functionality.</div>
                    {message && <div className={`message-box ${message.type}`}>{message.text}</div>}
                    {renderContent()}
                </main>
            </div>
        );
    };

    // Conditional rendering based on the activeView state
    return (
        <div className="auth-container">
            {/* Render the appropriate view based on activeView state */}
            {activeView === 'login' || activeView === 'signup' ? <AuthForms /> : <Dashboard />}
            
            {/* Message Box */}
            {message && (
                <div className={`message-box fixed top-4 right-4 z-50 ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default App;
