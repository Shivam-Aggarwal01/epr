import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, ShieldCheck, HelpCircle } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';
import COLLEGE_CREDENTIALS from '../data/credentials';
import HOST_TOKEN_MAP from '../data/hostMapping';

export default function Login() {
  const navigate = useNavigate();
  const { getAllColleges, setActive } = useEWaste();
  const colleges = getAllColleges();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Preselect by hostname if available
    try {
      const host = window.location.hostname.toLowerCase();
      for (const m of HOST_TOKEN_MAP) {
        if (host.includes(m.token)) {
          setSelectedCollege(m.collegeId);
          break;
        }
      }
    } catch (e) {}
  }, []);

  // When a college is selected, pre-fill the userId with the first demo user to make login frictionless
  useEffect(() => {
    if (!selectedCollege) return;
    const creds = COLLEGE_CREDENTIALS[selectedCollege] || [];
    if (creds.length > 0) {
      setUserId(creds[0].userId);
    }
  }, [selectedCollege]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!selectedCollege) return setError('Select a college');
    if (!userId || !password) return setError('Enter user ID and password');

    const creds = COLLEGE_CREDENTIALS[selectedCollege] || [];
    const found = creds.find(c => c.userId === userId && c.password === password);
    if (!found) return setError('Invalid credentials for selected college');

    setActive(selectedCollege, null);
    try { localStorage.setItem('epr_demo_token', JSON.stringify({ college: selectedCollege, user: userId })); } catch (e) {}
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="card bg-white border border-slate-100 p-8 shadow-xl rounded-3xl">
          
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
              GOI
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Institutional Login</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">Sign in to report inventory to the National E-Waste Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Select College */}
            <div>
              <label className="label-title">Select Institution / Regional Center *</label>
              <div className="mt-1.5 relative">
                <select 
                  value={selectedCollege || ''} 
                  onChange={(e) => setSelectedCollege(e.target.value)} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  <option value="">-- Choose Institution --</option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name} — {c.state || ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* User ID */}
            <div>
              <label className="label-title">User ID / Administrative ID *</label>
              <div className="mt-1.5">
                <input 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  className="input-field" 
                  placeholder="Enter username" 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label-title">Password *</label>
              <div className="mt-1.5 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10 font-mono text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute right-3.5 top-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => { setSelectedCollege(null); setUserId(''); setPassword(''); setError(''); }} 
                className="btn-secondary py-2.5 text-sm flex-1"
              >
                Reset Fields
              </button>
              <button type="submit" className="btn-primary py-2.5 text-sm flex-1">
                Authenticate
              </button>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Demo User Portal Accounts</span>
            </div>
            
            {selectedCollege && COLLEGE_CREDENTIALS[selectedCollege] ? (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <div className="text-xs font-bold text-emerald-800 mb-2.5">Available accounts for selected college:</div>
                <div className="space-y-2">
                  {COLLEGE_CREDENTIALS[selectedCollege].map(u => (
                    <div key={u.userId} className="text-xs font-medium text-slate-600 flex justify-between bg-white border border-slate-100 px-3 py-1.5 rounded-lg">
                      <span>ID: <strong className="text-slate-800 font-mono">{u.userId}</strong></span>
                      <span>PW: <strong className="text-slate-800 font-mono">{u.password}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 leading-normal font-medium">
                Choose an institution to inspect its preconfigured mock audit credentials. Passwords are frontend simulated tokens.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
