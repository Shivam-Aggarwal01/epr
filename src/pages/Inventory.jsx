import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, Trash2, Filter, Pencil } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function Inventory() {
  const { selectedCollege, selectedDepartment, getItemsByDepartment, deleteItem, updateItem, getCollege, getAllColleges } = useEWaste();
  const allColleges = getAllColleges();
  // Keep inventory broad by default: selected college (all departments) or full PU.
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
    <div className="min-h-screen bg-gradient-to-b from-eco-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <PackageOpen className="w-6 sm:w-8 h-6 sm:h-8 text-eco-600 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">E-Waste Inventory</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            College: <span className="font-semibold">{collegeData?.name || 'All Panjab University'}</span>
          </p>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Department: <span className="font-semibold">{selectedCollege ? (deptData?.name || 'All Departments') : 'All Departments'}</span>
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <p className="text-xs text-gray-600 mb-1">Total Entries</p>
            <p className="text-2xl font-bold text-gray-900">{filteredItems.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-600 mb-1">Total Quantity</p>
            <p className="text-2xl font-bold text-eco-700">{totalQuantity}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-600 mb-1">Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Waste Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-eco-500 focus:ring-1 focus:ring-eco-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-eco-500 focus:ring-1 focus:ring-eco-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department/Unit</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-eco-500 focus:ring-1 focus:ring-eco-500"
              >
                <option value="All">All</option>
                {departmentOptions.filter((deptId) => deptId !== 'All').map((deptId) => (
                  <option key={deptId} value={deptId}>
                    {allColleges.flatMap((college) => college.departments).find((dept) => dept.id === deptId)?.name || deptId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="card text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">No items found in this department</p>
            <Link to="/add" className="mt-4 inline-block px-6 py-2 bg-eco-600 text-white font-semibold rounded-lg hover:bg-eco-700 transition-colors">
              Add First Item
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(itemsByDepartment).map(([bucketKey, departmentItems]) => {
              const [collegeId, departmentId] = bucketKey.split('::');
              return (
              <section key={bucketKey} className="card">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-eco-100">
                  <h3 className="text-lg font-bold text-eco-800">
                    {getDepartmentName(collegeId, departmentId)}
                  </h3>
                  <span className="text-xs font-semibold bg-eco-100 text-eco-700 px-3 py-1 rounded-full">
                    {departmentItems.length} entries
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {departmentItems.map((item) => (
                    <div key={item.id} className="rounded-xl border border-eco-100 bg-white p-4 shadow-sm group hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{item.eeeCode}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                          title="Delete item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditOpen(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-eco-700 hover:bg-eco-50 rounded-lg flex-shrink-0"
                          title="Update item"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-2 mb-4 text-xs sm:text-sm border-b border-gray-200 pb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">College:</span>
                          <span className="font-semibold text-gray-900 truncate ml-2">{getCollegeName(collegeId)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold text-gray-900">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-semibold text-gray-900 truncate ml-2">{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">EPR Code:</span>
                          <span className="font-mono font-semibold text-eco-700 text-xs">{item.eprCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date Added:</span>
                          <span className="font-semibold text-gray-900">{item.dateAdded}</span>
                        </div>
                        {item.serialNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Serial:</span>
                            <span className="font-semibold text-gray-900 truncate ml-2">{item.serialNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'Near Expiry'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )})}
          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 border border-eco-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Update E-Waste Item</h3>
            <div className="space-y-3">
              <input
                className="input-field"
                value={editForm.name}
                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Item name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="input-field"
                  type="number"
                  min="1"
                  value={editForm.quantity}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  placeholder="Quantity"
                />
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
              <input
                className="input-field"
                value={editForm.location}
                onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Location"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="input-field"
                  value={editForm.serialNumber}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, serialNumber: e.target.value }))}
                  placeholder="Serial Number"
                />
                <input
                  className="input-field"
                  value={editForm.modelNumber}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, modelNumber: e.target.value }))}
                  placeholder="Model Number"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="btn-primary flex-1" onClick={handleEditSave}>Save Changes</button>
              <button className="btn-secondary flex-1" onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
