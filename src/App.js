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

const App = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [data, setData] = useState({
    inventory: [],
    purchases: [],
    transfers: [],
    assignments: [],
    expenditures: [],
  });

  const [form, setForm] = useState({
    purchase: { base: '', equipmentType: '', quantity: '', date: '' },
    transfer: { fromBase: '', toBase: '', equipmentType: '', quantity: '', date: '' },
    assignment: { base: '', equipmentType: '', quantity: '', toPersonnel: '', date: '' },
    expenditure: { base: '', equipmentType: '', quantity: '', notes: '', date: '' },
  });
  const [message, setMessage] = useState(null);

  // Use mock data to populate the app on load
  useEffect(() => {
    setData(MOCK_DATA);
  }, []);

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

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

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
        /* Custom properties for a professional color palette */
        :root {
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

        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          background-color: var(--background-color);
          color: var(--text-color);
          line-height: 1.6;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
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

export default App;
