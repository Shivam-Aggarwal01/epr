import React, { useState } from 'react';
import { useEWaste } from '../context/EWasteContext';
import CREDENTIALS from '../data/credentials';
import HOSTS from '../data/hostMapping';

export default function AdminPanel() {
  const { getAllColleges } = useEWaste();
  const colleges = getAllColleges();
  const [creds] = useState(CREDENTIALS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Admin — Demo Credentials & Host Mapping</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Credentials (frontend demo)</h3>
            <div className="space-y-2">
              {Object.keys(creds).map(colId => (
                <div key={colId} className="p-3 border rounded-lg">
                  <div className="font-medium">{colId} — { (colleges.find(c=>c.id===colId)||{}).name || '' }</div>
                  <div className="text-sm text-gray-600">Users:</div>
                  <ul className="text-sm">
                    {creds[colId].map(u => (
                      <li key={u.userId}>{u.userId} / {u.password} — {u.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Host to College token map</h3>
            <ul className="text-sm">
              {HOSTS.map(h => (
                <li key={h.token}>{h.token} → {h.collegeId}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
