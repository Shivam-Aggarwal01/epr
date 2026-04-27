import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCollege, selectedDepartment, getCollege, clearActive } = useEWaste();

  const collegeData = selectedCollege ? getCollege(selectedCollege) : null;
  const deptData = selectedDepartment && collegeData
    ? collegeData.departments.find(d => d.id === selectedDepartment)
    : null;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/add', label: 'Add E-Waste' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/categories', label: 'Categories' },
  ];

  const handleLogout = () => {
    clearActive();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 border-b border-eco-100 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with college info */}
        {selectedCollege && (
          <div className="border-b border-gray-100 py-2">
            <div className="text-xs text-gray-600 space-y-1">
              <p><span className="font-semibold">College:</span> {collegeData?.name}</p>
              {deptData && <p><span className="font-semibold">Department:</span> {deptData.name}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center h-16">
          <Link to={selectedCollege ? "/dashboard" : "/"} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-eco-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-eco-700 block">PU E-Waste Hub</span>
              <span className="text-xs text-gray-600">Panjab University</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {selectedCollege && (
            <nav className="hidden md:flex gap-1 lg:gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors font-medium text-sm lg:text-base px-3 py-2 rounded-lg ${
                    location.pathname === link.to
                      ? 'bg-eco-50 text-eco-700'
                      : 'text-gray-700 hover:text-eco-700 hover:bg-eco-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {selectedCollege && (
              <button
                onClick={handleLogout}
                className="px-3 lg:px-4 py-2 text-gray-700 hover:bg-eco-50 rounded-lg transition-colors text-sm lg:text-base flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Change College</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          {selectedCollege && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && selectedCollege && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'bg-eco-50 text-eco-700'
                    : 'text-gray-700 hover:bg-eco-50 hover:text-eco-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Change College
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
