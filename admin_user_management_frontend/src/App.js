import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import UsersPage from './pages/UsersPage';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="op-page">
      <header className="op-page-header">
        <div>
          <h1 className="op-title">Admin Console</h1>
          <p className="op-subtitle">Manage your application users</p>
        </div>
        <nav className="op-actions" aria-label="Navigation">
          <Link to="/users" className="op-link-btn">Users</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<div className="op-card">Not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
