import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import toast from 'react-hot-toast';
import './AdminLogin.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-bg" />
      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.png" alt="A-Team" />
          <div>
            <div className="login-brand">A-Team Constructions</div>
            <div className="login-sub">Admin Panel</div>
          </div>
        </div>
        <div className="login-divider" />
        <h2 className="login-title">Sign In</h2>
        <p className="login-desc">Enter your admin credentials to access the dashboard</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-group">
            <label>Username</label>
            <input
              type="text" placeholder="admin"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required autoFocus
            />
          </div>
          <div className="login-group">
            <label>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
        <div className="login-hint">
          Default: admin / ATeam@2025 <span>(change in .env)</span>
        </div>
      </div>
    </div>
  );
}
