import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Lock, Compass } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8fafc] py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white border border-slate-100 p-8 shadow-xl rounded-3xl">
          
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
              ADM
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">System Registry Login</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">Access central e-waste database metrics and parameters</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="label-title">Administrator Username *</label>
              <div className="mt-1.5">
                <input 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  className="input-field" 
                  placeholder="e.g. root_admin" 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label-title">Security Key / Password *</label>
              <div className="mt-1.5 relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-10 font-mono text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute right-3.5 top-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-700 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-2.5 text-sm">
              Verify Administrator Credentials
            </button>
          </form>

          {/* Guidelines info */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-medium leading-normal flex items-center justify-center gap-1">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              Authorized security tokens only. Access is tracked under GoI auditing rules.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
