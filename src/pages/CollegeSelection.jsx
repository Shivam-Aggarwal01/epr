import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, ChevronRight, Search, FileText, BarChart3, ShieldAlert, Check } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function CollegeSelection() {
  const navigate = useNavigate();
  const { getAllColleges, getDepartmentsByCollege, setActive } = useEWaste();
  const colleges = getAllColleges();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [collegeQuery, setCollegeQuery] = useState('');

  const handleCollegeSelect = (collegeId) => {
    setSelectedCollege(collegeId);
    setSelectedDept(null);
  };

  const handleProceed = () => {
    if (selectedCollege) {
      // Default to the first department if there's only one, otherwise null
      const depts = getDepartmentsByCollege(selectedCollege);
      const deptId = depts.length === 1 ? depts[0].id : selectedDept;
      setActive(selectedCollege, deptId || null);
      navigate('/dashboard');
    }
  };

  const currentCollege = selectedCollege ? colleges.find(c => c.id === selectedCollege) : null;
  const currentDepts = selectedCollege ? getDepartmentsByCollege(selectedCollege) : [];
  const filteredColleges = colleges.filter(c => c.name.toLowerCase().includes(collegeQuery.toLowerCase()));

  // Simulated metrics for the landing dashboard
  const metrics = [
    { label: 'E-Waste Logged', value: '1,420 kg', desc: 'Verified across regional institutions', color: 'emerald', icon: BarChart3 },
    { label: 'Registered Units', value: '10 Colleges', desc: 'Registered academic units', color: 'blue', icon: Building2 },
    { label: 'EPR Target Met', value: '82.4 %', desc: 'Average compliance rate 2025-26', color: 'amber', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 mb-10 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            Compliance & Stewardship Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            E-Waste Inventory & EPR Management
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Centralized registry for public universities to audit, track, and process electrical & electronic waste in compliance with E-Waste (Management) Rules, 2022.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic National E-Waste Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-slate-50 text-emerald-800 border border-slate-100 flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-1">{m.label}</span>
                  <span className="text-3xl font-extrabold text-slate-900 block leading-none mb-1.5">{m.value}</span>
                  <span className="text-xs text-slate-400 font-medium block">{m.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Directives and Notices */}
          <div className="lg:col-span-2 space-y-6">
            {/* Kind Attention Notice Card */}
            <div className="card border-l-4 border-l-emerald-700 bg-white">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1.5">Kind Attention to Affiliated Institutions</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    As per **Rule 6(2)** of the E-Waste (Management) Rules, 2022, all departments and affiliate universities are mandated to report electronic asset lifecycles, maintain the EEE Segregation Database, and clear disposal schedules through this portal.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Portal Features Guide */}
            <div className="card bg-white">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Portal Workflow Steps</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">1</span>
                  <div className="font-bold text-sm text-slate-800 mb-1">Select College</div>
                  <p className="text-xs text-slate-500">Choose your academic institute from the list.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">2</span>
                  <div className="font-bold text-sm text-slate-800 mb-1">Audit Assets</div>
                  <p className="text-xs text-slate-500">Log e-waste category items and assign locations.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">3</span>
                  <div className="font-bold text-sm text-slate-800 mb-1">Sync with CPCB</div>
                  <p className="text-xs text-slate-500">Generate compliance codes automatically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: College Selection Audit */}
          <div className="space-y-6">
            {/* SSO Alert Box */}
            <div className="bg-[#fef2f2] border border-[#fca5a5]/30 rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2.5 bg-red-100 text-red-700 rounded-xl flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-sm mb-1">Direct SSO Notice</h4>
                <p className="text-xs text-red-700 leading-normal">
                  Registered Producers must authenticate compliance certificates via the national CPCB Single Sign-On link.
                </p>
              </div>
            </div>

            {/* Selection Container */}
            <div className="card bg-white">
              <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center justify-between">
                <span>Select Institution</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Demo Mode</span>
              </h4>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input 
                  value={collegeQuery} 
                  onChange={(e) => setCollegeQuery(e.target.value)} 
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm shadow-sm" 
                  placeholder="Search by state or college name..." 
                />
              </div>

              {/* Institution Options List */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {filteredColleges.map(col => {
                  const isSelected = selectedCollege === col.id;
                  return (
                    <button 
                      key={col.id} 
                      onClick={() => handleCollegeSelect(col.id)} 
                      className={`w-full p-3.5 text-left rounded-xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-inner' 
                          : 'border-slate-100 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="pr-2">
                        <div className={`font-semibold text-sm ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                          {col.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{col.state}</div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-emerald-700 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
                {filteredColleges.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center">No institutions found matching your search</p>
                )}
              </div>

              {/* Proceed Control */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button 
                  onClick={handleProceed} 
                  disabled={!selectedCollege} 
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectedCollege 
                      ? 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-md hover:shadow-lg active:scale-[0.99]' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Proceed to Portal
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
