import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle2, ChevronRight, Search, Users } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function CollegeSelection() {
  const navigate = useNavigate();
  const { getAllColleges, getDepartmentsByCollege, setActive } = useEWaste();
  const colleges = getAllColleges();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [collegeQuery, setCollegeQuery] = useState('');
  const [deptQuery, setDeptQuery] = useState('');

  const handleCollegeSelect = (collegeId) => {
    setSelectedCollege(collegeId);
    setSelectedDept(null);
    setDeptQuery('');
  };

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDept(departmentId);
  };

  const handleProceed = () => {
    if (selectedCollege) {
      setActive(selectedCollege, selectedDept || null);
      navigate('/dashboard');
    }
  };

  const currentCollege = selectedCollege ? colleges.find(c => c.id === selectedCollege) : null;
  const currentDepts = selectedCollege ? getDepartmentsByCollege(selectedCollege) : [];
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(collegeQuery.toLowerCase())
  );
  const filteredDepts = currentDepts.filter((dept) =>
    dept.name.toLowerCase().includes(deptQuery.toLowerCase())
  );
  const selectedDepartmentName = selectedDept
    ? currentDepts.find((dept) => dept.id === selectedDept)?.name
    : 'All Departments (College View)';

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-white">
      {/* PU Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-eco-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panjab University</h1>
              <p className="text-xs text-gray-600">E-Waste Management System</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PU E-Waste Hub</h2>
          <p className="text-gray-600 text-lg">Select your college and department to manage e-waste</p>
        </div>

        <div className="card mb-8 border-l-4 border-l-eco-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-lg border px-4 py-3 ${selectedCollege ? 'border-eco-300 bg-eco-50' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Step 1</p>
              <p className="font-semibold text-gray-900">Choose College</p>
              <p className="text-sm text-gray-600 mt-1">{selectedCollege ? currentCollege?.name : 'Pending'}</p>
            </div>
            <div className={`rounded-lg border px-4 py-3 ${selectedCollege ? 'border-eco-300 bg-eco-50' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Step 2</p>
              <p className="font-semibold text-gray-900">Choose Department</p>
              <p className="text-sm text-gray-600 mt-1">{selectedCollege ? selectedDepartmentName : 'Choose college first'}</p>
            </div>
            <div className={`rounded-lg border px-4 py-3 ${selectedCollege ? 'border-eco-300 bg-eco-50' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Step 3</p>
              <p className="font-semibold text-gray-900">Open Dashboard</p>
              <p className="text-sm text-gray-600 mt-1">{selectedCollege ? 'Ready to proceed' : 'Complete step 1 first'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* College Selection */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-6 h-6 text-eco-600" />
              <h3 className="text-xl font-bold text-gray-900">Select College</h3>
            </div>
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                value={collegeQuery}
                onChange={(e) => setCollegeQuery(e.target.value)}
                className="input-field pl-9"
                placeholder="Search college/faculty..."
              />
            </div>
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredColleges.map(college => (
                <button
                  key={college.id}
                  onClick={() => handleCollegeSelect(college.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedCollege === college.id
                      ? 'border-eco-600 bg-eco-50 text-eco-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-eco-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{college.name}</span>
                    {selectedCollege === college.id && (
                      <ChevronRight className="w-5 h-5 text-eco-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {filteredColleges.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-4">No colleges match your search.</div>
            )}
          </div>

          {/* Department Selection */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-eco-600" />
              <h3 className="text-xl font-bold text-gray-900">Select Department</h3>
            </div>
            {selectedCollege ? (
              <div className="space-y-3">
                <div className="p-3 bg-eco-50 rounded-lg border border-eco-200 mb-4">
                  <p className="text-sm text-gray-600">College:</p>
                  <p className="font-semibold text-gray-900">{currentCollege?.name}</p>
                </div>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => {
                      setSelectedCollege(null);
                      setSelectedDept(null);
                      setDeptQuery('');
                    }}
                    className="btn-secondary inline-flex items-center gap-2"
                    type="button"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Colleges
                  </button>
                </div>
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    value={deptQuery}
                    onChange={(e) => setDeptQuery(e.target.value)}
                    className="input-field pl-9"
                    placeholder="Search department/unit..."
                  />
                </div>
                <button
                  onClick={() => handleDepartmentSelect(null)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedDept === null
                      ? 'border-eco-600 bg-eco-50 text-eco-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-eco-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Departments (College View)</span>
                    {selectedDept === null && (
                      <ChevronRight className="w-5 h-5 text-eco-600" />
                    )}
                  </div>
                </button>
                {currentDepts.length > 0 ? (
                  <div className="space-y-3">
                    {filteredDepts.map(dept => (
                      <button
                        key={dept.id}
                        onClick={() => handleDepartmentSelect(dept.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          selectedDept === dept.id
                            ? 'border-eco-600 bg-eco-50 text-eco-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-eco-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{dept.name}</span>
                          {selectedDept === dept.id && (
                            <ChevronRight className="w-5 h-5 text-eco-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-600">Please select a college first</p>
                  </div>
                )}
                {currentDepts.length > 0 && filteredDepts.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-2">No departments match your search.</div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-600">Please select a college first</p>
              </div>
            )}
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleProceed}
            disabled={!selectedCollege}
            className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-sm ${
              selectedCollege
                ? 'bg-eco-600 text-white hover:bg-eco-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedCollege ? 'Proceed to Dashboard' : 'Select college to continue'}
            {selectedCollege ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
