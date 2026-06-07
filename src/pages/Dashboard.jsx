import React, { useMemo, useState } from 'react';
import { ArrowLeft, Building2, ChevronRight, Globe, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

export function Dashboard() {
  const {
    items,
    selectedCollege,
    selectedDepartment,
    getAllColleges,
    getCollege,
    getDepartmentsByCollege,
  } = useEWaste();

  const [viewMode, setViewMode] = useState('overview');
  const [activeScope, setActiveScope] = useState(null); // 'pu' | 'college'
  const [selectedItemName, setSelectedItemName] = useState('');

  const allColleges = getAllColleges();
  const collegeData = getCollege(selectedCollege);
  const collegeDepartments = selectedCollege ? getDepartmentsByCollege(selectedCollege) : [];
  const puTotalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const collegeItems = selectedCollege ? items.filter((item) => item.collegeId === selectedCollege) : [];
  const selectedScopeItems = selectedDepartment
    ? collegeItems.filter((item) => item.departmentId === selectedDepartment)
    : collegeItems;
  const collegeTotalQuantity = selectedScopeItems.reduce((sum, item) => sum + item.quantity, 0);

  const activeItems = activeScope === 'college' ? selectedScopeItems : items;

  // Chart data calculations
  const collegeChartData = useMemo(() => {
    return allColleges.map(col => {
      const qty = items.filter(i => i.collegeId === col.id).reduce((sum, item) => sum + item.quantity, 0);
      return {
        // Shorten name for chart rendering
        name: col.name
          .replace('Indian Institute of Technology ', 'IIT ')
          .replace('National Institute of Technology ', 'NIT ')
          .replace('Indian Institute of Information Technology ', 'IIIT ')
          .replace('Thapar Institute of Engineering and Technology', 'Thapar')
          .replace('Lovely Professional University', 'LPU')
          .replace('Chandigarh University', 'Chandigarh Univ'),
        Quantity: qty
      };
    }).filter(c => c.Quantity > 0);
  }, [allColleges, items]);

  const categoryChartData = useMemo(() => {
    const stats = {};
    const itemsList = selectedCollege ? selectedScopeItems : items;
    itemsList.forEach(item => {
      const key = item.eeeCode || 'Other';
      if (!stats[key]) {
        stats[key] = 0;
      }
      stats[key] += item.quantity;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [items, selectedCollege, selectedScopeItems]);

  const COLORS = ['#0f766e', '#b45309', '#0369a1', '#4338ca', '#be123c', '#581c87', '#15803d'];

  const itemWiseTotals = useMemo(() => {
    const stats = activeItems.reduce((acc, item) => {
      const key = item.name?.trim() || 'Unknown Item';
      if (!acc[key]) {
        acc[key] = { quantity: 0, records: 0 };
      }
      acc[key].quantity += item.quantity;
      acc[key].records += 1;
      return acc;
    }, {});
    return Object.entries(stats).sort((a, b) => b[1].quantity - a[1].quantity);
  }, [activeItems]);

  const selectedItemDistribution = useMemo(() => {
    if (!selectedItemName) return [];

    const filtered = activeItems.filter((item) => (item.name?.trim() || 'Unknown Item') === selectedItemName);
    const grouped = filtered.reduce((acc, item) => {
      const key = activeScope === 'college' ? item.departmentId : item.collegeId;
      if (!acc[key]) {
        acc[key] = { quantity: 0, records: 0 };
      }
      acc[key].quantity += item.quantity;
      acc[key].records += 1;
      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => b[1].quantity - a[1].quantity);
  }, [activeItems, selectedItemName, activeScope]);

  const getCollegeName = (collegeId) => allColleges.find((college) => college.id === collegeId)?.name || collegeId;
  const getDepartmentName = (departmentId) => collegeDepartments.find((dept) => dept.id === departmentId)?.name || departmentId;
  const selectedDepartmentName = selectedDepartment ? getDepartmentName(selectedDepartment) : null;

  const hour = new Date().getHours();
  const greetingText = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const universityName = collegeData?.name || 'Central Portal';

  const openItemsView = (scope) => {
    setActiveScope(scope);
    setSelectedItemName('');
    setViewMode('items');
  };

  const openItemDetails = (itemName) => {
    setSelectedItemName(itemName);
    setViewMode('distribution');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Dashboard Banner */}
        <div className="mb-8 card border-l-4 border-l-emerald-800 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{greetingText}</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{universityName}</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Institutional E-waste compliance portal dashboard
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider">
            {selectedCollege ? 'Authorized Access' : 'General View'}
          </div>
        </div>

        {viewMode === 'overview' && (
          <div className="space-y-8">
            {/* 1. Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => openItemsView('pu')}
                className="card text-left border border-slate-100 bg-white hover:border-emerald-700/50 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total E-Waste - Entire PU System</p>
                    <p className="text-4xl font-black text-slate-900 leading-none mb-2">{puTotalQuantity} <span className="text-base font-semibold text-slate-500">units</span></p>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-4 group-hover:underline">
                      Drill down by category <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100/50">
                    <Globe className="w-7 h-7" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openItemsView('college')}
                disabled={!selectedCollege}
                className={`card text-left border transition-all duration-300 group relative overflow-hidden ${
                  selectedCollege
                    ? 'border-slate-100 bg-white hover:border-emerald-700/50 hover:shadow-lg'
                    : 'border-slate-200/60 bg-slate-50 opacity-70 cursor-not-allowed'
                }`}
              >
                {selectedCollege && (
                  <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Scope: {selectedDepartmentName || collegeData?.name || 'Select College First'}
                    </p>
                    <p className="text-4xl font-black text-slate-900 leading-none mb-2">{collegeTotalQuantity} <span className="text-base font-semibold text-slate-500">units</span></p>
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1 mt-4 group-hover:underline">
                      {selectedCollege ? 'Drill down by department' : 'No college selected'} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
                    <Building2 className="w-7 h-7" />
                  </div>
                </div>
              </button>
            </div>

            {/* 2. Visualizations / Recharts Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Chart: Institution Breakdown */}
              <div className="card bg-white border border-slate-100 lg:col-span-2">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-800" />
                  E-Waste Distribution by Affiliate College
                </h3>
                <div className="h-[300px] w-full">
                  {collegeChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={collegeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Bar dataKey="Quantity" fill="#0f766e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">No institutional metrics logged</div>
                  )}
                </div>
              </div>

              {/* Right Chart: Category Breakdown */}
              <div className="card bg-white border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-emerald-800" />
                  Category Composition
                </h3>
                <div className="h-[230px] w-full flex items-center justify-center">
                  {categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">No items logged</div>
                  )}
                </div>
                {/* Category Legend list */}
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {categoryChartData.map((entry, idx) => (
                    <span key={entry.name} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                      {entry.name} ({entry.value})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'items' && (
          <div className="card bg-white border border-slate-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {activeScope === 'college'
                    ? `${selectedDepartmentName || collegeData?.name} — Item Wise Breakdown`
                    : 'Entire PU System — Item Wise Breakdown'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Click on any equipment item to inspect regional distribution.</p>
              </div>
              <button
                onClick={() => setViewMode('overview')}
                className="btn-secondary inline-flex items-center gap-1.5 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Overview
              </button>
            </div>

            <div className="space-y-3">
              {itemWiseTotals.length > 0 ? (
                itemWiseTotals.map(([itemName, stat]) => (
                  <button
                    key={itemName}
                    onClick={() => openItemDetails(itemName)}
                    className="w-full p-4 rounded-xl border border-slate-100 bg-white hover:border-emerald-600 hover:bg-emerald-50/10 transition-all text-left flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-900">{itemName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{stat.records} audit records</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full">
                        {stat.quantity} quantity
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-slate-400 py-12 text-center text-sm">No asset data found.</p>
              )}
            </div>
          </div>
        )}

        {viewMode === 'distribution' && (
          <div className="card bg-white border border-slate-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-950">{selectedItemName}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {activeScope === 'college'
                    ? selectedDepartment
                      ? 'Item census count for chosen unit.'
                      : 'Inventory breakdown across departments.'
                    : 'Inventory distribution breakdown by college.'}
                </p>
              </div>
              <button
                onClick={() => setViewMode('items')}
                className="btn-secondary inline-flex items-center gap-1.5 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            <div className="overflow-hidden border border-slate-100 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="py-3 px-4 font-bold text-slate-600 text-xs uppercase tracking-wider">
                      {activeScope === 'college' ? 'Department' : 'Institution'}
                    </th>
                    <th className="py-3 px-4 font-bold text-slate-600 text-xs uppercase tracking-wider w-[120px]">Records</th>
                    <th className="py-3 px-4 font-bold text-slate-600 text-xs uppercase tracking-wider w-[120px]">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedItemDistribution.length > 0 ? (
                    selectedItemDistribution.map(([id, stat]) => (
                      <tr key={id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 text-slate-800 font-semibold text-sm">
                          {activeScope === 'college'
                            ? selectedDepartment ? selectedDepartmentName || getDepartmentName(id) : getDepartmentName(id)
                            : getCollegeName(id)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-medium">{stat.records}</td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">{stat.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-12 px-4 text-center text-slate-400 text-sm">
                        No distribution data found for this equipment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
