import React from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Credit Card Management</h1>
        <div className="welcome-message">
          Welcome {user?.lastName} | {user?.firstName}
        </div>
      </header>
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <ul>
            <li><a href="#transactions">View Top 10 Transactions</a></li>
            <li><a href="#credit-cards">View List Of Credit Cards</a></li>
            <li><a href="#add-credit-card">Add Credit Card</a></li>
            <li><a href="#expenses">View Expenses</a></li>
          </ul>
        </aside>
        <main className="dashboard-content">
          <p>Select an option from the left menu to proceed.</p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
