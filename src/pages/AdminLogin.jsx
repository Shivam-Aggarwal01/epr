import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
      const res = await fetch(`${backend}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('admin_token', data.token);
      const dest = location.state?.from?.pathname || '/admin/dashboard';
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-eco-50">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold text-eco-700 mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} className="input-field mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field mt-1" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button className="btn-primary" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
