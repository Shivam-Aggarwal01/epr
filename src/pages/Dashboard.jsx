import React, { useMemo, useState } from 'react';
import { ArrowLeft, Building2, ChevronRight, Globe } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

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
  const universityName = 'Panjab University';

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
    <div className="min-h-screen bg-gradient-to-b from-eco-50/60 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 card border-l-4 border-l-eco-600">
          <div className="mb-3">
            <p className="text-sm text-gray-600">{greetingText}</p>
            <p className="text-lg font-semibold text-gray-900">{universityName}</p>
            {collegeData?.name && (
              <p className="text-sm text-gray-700 mt-1">College: {collegeData.name}</p>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Click totals to drill down into details.</p>
        </div>

        {viewMode === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button
              onClick={() => openItemsView('pu')}
              className="card text-left border-2 border-eco-200 hover:border-eco-500 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total e-waste in Entire PU</p>
                  <p className="text-4xl font-bold text-gray-900">{puTotalQuantity}</p>
                  <p className="text-xs text-gray-500 mt-2">Click to see item wise</p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-eco-100 text-eco-700 flex items-center justify-center">
                  <Globe className="w-7 h-7" />
                </div>
              </div>
            </button>

            <button
              onClick={() => openItemsView('college')}
              disabled={!selectedCollege}
              className={`card text-left border-2 transition-all ${
                selectedCollege
                  ? 'border-eco-200 hover:border-eco-500 hover:shadow-md'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total e-waste in {selectedDepartmentName || collegeData?.name || 'Selected Scope'}
                  </p>
                  <p className="text-4xl font-bold text-gray-900">{collegeTotalQuantity}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedCollege ? 'Click to see item wise' : 'Select a college first'}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
              </div>
            </button>
          </div>
        )}

        {viewMode === 'items' && (
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeScope === 'college'
                    ? `${selectedDepartmentName || collegeData?.name} - Item Wise`
                    : 'Entire PU - Item Wise'}
                </h2>
                <p className="text-sm text-gray-600">Click any item to see where it is available.</p>
              </div>
              <button
                onClick={() => setViewMode('overview')}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            <div className="space-y-3">
              {itemWiseTotals.length > 0 ? (
                itemWiseTotals.map(([itemName, stat]) => (
                  <button
                    key={itemName}
                    onClick={() => openItemDetails(itemName)}
                    className="w-full p-4 rounded-lg border border-eco-200 hover:border-eco-500 hover:bg-eco-50/40 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{itemName}</p>
                        <p className="text-xs text-gray-500">{stat.records} records</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-eco-700">{stat.quantity} items</span>
                        <ChevronRight className="w-5 h-5 text-eco-600" />
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 py-8 text-center">No data found.</p>
              )}
            </div>
          </div>
        )}

        {viewMode === 'distribution' && (
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedItemName}</h2>
                <p className="text-sm text-gray-600">
                  {activeScope === 'college'
                    ? selectedDepartment
                      ? 'This item count is for your selected department.'
                      : 'This item is available in these departments.'
                    : 'This item is available in these colleges.'}
                </p>
              </div>
              <button
                onClick={() => setViewMode('items')}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {activeScope === 'college'
                        ? selectedDepartment ? 'Department' : 'Department'
                        : 'College'}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Records</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItemDistribution.length > 0 ? (
                    selectedItemDistribution.map(([id, stat]) => (
                      <tr key={id} className="border-b border-gray-100 hover:bg-eco-50/50">
                        <td className="py-3 px-4 text-gray-900">
                          {activeScope === 'college'
                            ? selectedDepartment ? selectedDepartmentName || getDepartmentName(id) : getDepartmentName(id)
                            : getCollegeName(id)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{stat.records}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{stat.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-6 px-4 text-center text-gray-500">
                        No data found for this item.
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
