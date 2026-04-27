import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEWaste } from '../context/EWasteContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const { getAllColleges, items } = useEWaste();

  useEffect(() => {
    if (!token) navigate('/admin/login');
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  const colleges = getAllColleges();

  return (
    <div className="min-h-screen bg-eco-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-eco-700">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <p className="text-sm text-gray-600">Colleges</p>
            <p className="text-2xl font-bold text-gray-900">{colleges.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600">Inventory Items</p>
            <p className="text-2xl font-bold text-gray-900">{items.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600">Departments (approx)</p>
            <p className="text-2xl font-bold text-gray-900">{colleges.reduce((s, c) => s + (c.departments?.length || 0), 0)}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Colleges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {colleges.map(col => (
              <div key={col.id} className="p-3 border rounded bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{col.name}</p>
                    <p className="text-sm text-gray-600">{(col.departments || []).length} departments</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
