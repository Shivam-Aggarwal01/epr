import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, Trash2, Filter, Pencil, Search, ShieldAlert, Plus } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function Inventory() {
  const { selectedCollege, selectedDepartment, getItemsByDepartment, deleteItem, updateItem, getCollege, getAllColleges } = useEWaste();
  const allColleges = getAllColleges();
  const items = getItemsByDepartment(selectedCollege, null);
  const collegeData = getCollege(selectedCollege);
  const deptData = collegeData?.departments.find(d => d.id === selectedDepartment);

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    quantity: 1,
    location: '',
    status: 'Active',
    serialNumber: '',
    modelNumber: '',
  });

  useEffect(() => {
    const validDepartments = new Set(items.map((item) => item.departmentId));
    if (selectedDepartment && validDepartments.has(selectedDepartment)) {
      setFilterDepartment(selectedDepartment);
      return;
    }
    setFilterDepartment('All');
  }, [selectedDepartment, selectedCollege, items]);

  const categories = ['All', ...new Set(items.map(item => item.eeeCode))];
  const statuses = ['All', 'Active', 'Near Expiry', 'Expired'];
  const departmentOptions = ['All', ...new Set(items.map(item => item.departmentId))];

  let filteredItems = items;

  if (filterCategory !== 'All') {
    filteredItems = filteredItems.filter(item => item.eeeCode === filterCategory);
  }

  if (filterStatus !== 'All') {
    filteredItems = filteredItems.filter(item => item.status === filterStatus);
  }

  if (filterDepartment !== 'All') {
    filteredItems = filteredItems.filter(item => item.departmentId === filterDepartment);
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  const handleEditOpen = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name || '',
      quantity: item.quantity || 1,
      location: item.location || '',
      status: item.status || 'Active',
      serialNumber: item.serialNumber || '',
      modelNumber: item.modelNumber || '',
    });
  };

  const handleEditSave = () => {
    if (!editingItem) return;
    if (!editForm.name || !editForm.location || Number(editForm.quantity) <= 0) {
      alert('Please fill valid name, quantity, and location.');
      return;
    }
    updateItem(editingItem.id, {
      name: editForm.name.trim(),
      quantity: Number(editForm.quantity),
      location: editForm.location.trim(),
      status: editForm.status,
      serialNumber: editForm.serialNumber.trim(),
      modelNumber: editForm.modelNumber.trim(),
    });
    setEditingItem(null);
  };

  const totalQuantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsByDepartment = filteredItems.reduce((acc, item) => {
    const bucketKey = `${item.collegeId}::${item.departmentId}`;
    if (!acc[bucketKey]) {
      acc[bucketKey] = [];
    }
    acc[bucketKey].push(item);
    return acc;
  }, {});
  
  const getCollegeName = (collegeId) =>
    allColleges.find((college) => college.id === collegeId)?.name || collegeId;
  const getDepartmentName = (collegeId, departmentId) =>
    allColleges
      .find((college) => college.id === collegeId)
      ?.departments.find((d) => d.id === departmentId)?.name || departmentId;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center">
                <PackageOpen className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">E-Waste Inventory</h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-2.5 flex items-center gap-2">
              <span>Institution: {collegeData?.name || 'All Regional Systems'}</span>
              <span className="text-slate-300">|</span>
              <span>Dept: {selectedCollege ? (deptData?.name || 'All Units') : 'All'}</span>
            </p>
          </div>
          <Link to="/add" className="btn-primary flex items-center gap-2 py-2">
            <Plus className="w-4 h-4" />
            Add E-Waste Record
          </Link>
        </div>

        {/* Summary Statistics Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="card bg-white border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Records</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">{filteredItems.length}</span>
          </div>
          <div className="card bg-white border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Quantity</span>
            <span className="text-3xl font-black text-emerald-800 block leading-none">{totalQuantity} <span className="text-sm font-semibold text-slate-400">units</span></span>
          </div>
          <div className="card bg-white border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">EPR Categories</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">{Math.max(0, categories.length - 1)}</span>
          </div>
        </div>

        {/* Toolbar Filters Panel */}
        <div className="card bg-white border border-slate-100 mb-8 p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Filter className="w-4 h-4 text-emerald-800" />
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Audit Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="label-title">E-Waste Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="label-title">Lifecycle Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="label-title">Department/Unit</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">All Departments</option>
                {departmentOptions.filter((deptId) => deptId !== 'All').map((deptId) => (
                  <option key={deptId} value={deptId}>
                    {allColleges.flatMap((college) => college.departments).find((dept) => dept.id === deptId)?.name || deptId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items List */}
        {filteredItems.length === 0 ? (
          <div className="card text-center py-16 bg-white border border-slate-100 flex flex-col items-center">
            <PackageOpen className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-slate-500 text-sm font-semibold">No equipment records found matching the filters</p>
            <Link to="/add" className="btn-primary mt-4 py-2">
              Log E-Waste Item
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(itemsByDepartment).map(([bucketKey, departmentItems]) => {
              const [collegeId, departmentId] = bucketKey.split('::');
              return (
                <section key={bucketKey} className="card bg-white border border-slate-100">
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                      {getDepartmentName(collegeId, departmentId)}
                    </h3>
                    <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100/50 px-2.5 py-0.5 rounded-full">
                      {departmentItems.length} records
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {departmentItems.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-100 bg-[#fafafa]/50 p-5 shadow-sm hover:shadow transition-shadow group flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-base leading-tight truncate" title={item.name}>{item.name}</h4>
                              <p className="text-xs font-semibold text-slate-500 mt-1">{item.eeeCode}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditOpen(item)}
                                className="p-1.5 text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Update record"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4 text-xs font-medium text-slate-600 border-b border-slate-100 pb-4">
                            <div className="flex justify-between">
                              <span>College:</span>
                              <span className="font-semibold text-slate-800 truncate ml-2 max-w-[150px]">{getCollegeName(collegeId)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span className="font-extrabold text-slate-900">{item.quantity} units</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span className="font-semibold text-slate-800 truncate ml-2 max-w-[150px]">{item.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>EPR Code:</span>
                              <span className="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded text-[10px]">{item.eprCode}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Audit Date:</span>
                              <span className="font-semibold text-slate-800">{item.dateAdded}</span>
                            </div>
                            {item.serialNumber && (
                              <div className="flex justify-between">
                                <span>Serial No:</span>
                                <span className="font-mono font-semibold text-slate-800 truncate ml-2 max-w-[150px]">{item.serialNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold tracking-wider uppercase ${
                            item.status === 'Active'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : item.status === 'Near Expiry'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Update Edit Dialog Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
                <Pencil className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Update E-Waste Record</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="label-title">Item Name</label>
                <input
                  className="input-field"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Dell Monitor LCD"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Quantity (Units)</label>
                  <input
                    className="input-field"
                    type="number"
                    min="1"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="label-title">Lifecycle Status</label>
                  <select
                    className="input-field"
                    value={editForm.status}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="Active">Active</option>
                    <option value="Near Expiry">Near Expiry</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-title">Storage / Lab Location</label>
                <input
                  className="input-field"
                  value={editForm.location}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Physics Lab 3, Block A"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Serial Number</label>
                  <input
                    className="input-field font-mono text-sm"
                    value={editForm.serialNumber}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, serialNumber: e.target.value }))}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="label-title">Model Number</label>
                  <input
                    className="input-field font-mono text-sm"
                    value={editForm.modelNumber}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, modelNumber: e.target.value }))}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3 justify-end">
              <button className="btn-secondary py-2 text-sm" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="btn-primary py-2 text-sm" onClick={handleEditSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
