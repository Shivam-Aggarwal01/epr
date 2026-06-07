import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, ExternalLink, HelpCircle, FileText, Phone, Award } from 'lucide-react';
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

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* 1. Official National Flag Ribbon */}
      <div className="h-[4px] w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#128807]"></div>
      </div>

      {/* 2. Government of India Top Strip */}
      <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 border-r border-slate-700 pr-3">
              <span className="w-3.5 h-2.5 flex flex-col justify-between">
                <span className="h-[3px] bg-[#FF9933] w-full"></span>
                <span className="h-[3px] bg-white w-full flex items-center justify-center">
                  <span className="w-[2px] h-[2px] bg-blue-900 rounded-full"></span>
                </span>
                <span className="h-[3px] bg-[#128807] w-full"></span>
              </span>
              GOVERNMENT OF INDIA • भारत सरकार
            </span>
            <span className="hidden md:inline text-slate-400">
              Ministry of Environment, Forest and Climate Change
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="https://epr.cpcb.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              SSO Login <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-slate-700">|</span>
            <span>Contact: ewaste2.cpcb@gov.in</span>
          </div>
        </div>
      </div>

      {/* 3. Main Brand Header (Ministry & Board Info) */}
      <div className="bg-white border-b border-slate-100 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Official emblem image (added) */}
            <img src="/gov-emblem.svg" alt="Gov Emblem" className="w-11 h-11 object-contain flex-shrink-0" />
            {/* Custom SVG logo: Ashoka emblem shield / MoEFCC symbol */}
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 flex-shrink-0 text-emerald-800">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 leading-tight uppercase tracking-wider">PU-EWMP</div>
              <div className="text-[11px] text-slate-500 font-medium">Panjab University E-Waste Management Portal</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Header photo image (added) */}
            <img src="/header-photo.svg" alt="Header Photo" className="hidden lg:block w-24 h-12 object-cover rounded-md border border-slate-100" />
            {/* E-Waste Symbol */}
            <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 border border-amber-100">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase leading-none">E-Waste Portal</div>
                <span className="text-[10px] font-semibold text-emerald-700 tracking-wider">EPR COMPLIANCE DEMO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Elegant News Ticker */}
      <div className="w-full bg-[#fef9c3] border-b border-[#fef08a] text-amber-900 text-xs py-2 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-hidden">
          <span className="bg-amber-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider shadow-sm flex-shrink-0">
            NOTICE
          </span>
          <div className="overflow-hidden relative flex-1">
            <div className="whitespace-nowrap animate-marquee font-medium">
              Please login through the Single Sign-On (SSO) at <span className="underline font-bold text-emerald-800">https://epr.cpcb.gov.in</span> to access all EPR Portals. • Attention: All registered Producers are hereby reminded to achieve their EPR targets. • E-Waste rules are updated as of the 2022 amendment.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Navigation Bar */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active college context tag */}
          {selectedCollege && (
            <div className="border-b border-slate-800 py-1.5 text-[11px] text-emerald-400 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-300">Active College Context:</span>
              <span className="text-emerald-300">{collegeData?.name}</span>
              {deptData && (
                <>
                  <span className="text-slate-500">|</span>
                  <span className="font-semibold text-slate-300">Department:</span>
                  <span className="text-emerald-300">{deptData.name}</span>
                </>
              )}
            </div>
          )}

          <div className="flex justify-between items-center h-14">
            <Link to={selectedCollege ? "/dashboard" : "/"} className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center shadow-sm">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight block">E-Waste Manager</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-4 text-sm font-medium">
              <Link to={selectedCollege ? "/dashboard" : "/"} className={`px-3 py-1.5 rounded-lg transition-all ${
                location.pathname === '/' || location.pathname === '/dashboard'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}>
                Home
              </Link>
              
              <Link to="/about" className={`px-3 py-1.5 rounded-lg transition-all ${
                isLinkActive('/about')
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}>
                About
              </Link>

              {/* Dynamic Action Links (only when college is chosen) */}
              {selectedCollege && (
                <>
                  <Link to="/add" className={`px-3 py-1.5 rounded-lg transition-all ${
                    isLinkActive('/add')
                      ? 'bg-emerald-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}>
                    Add Waste
                  </Link>
                  <Link to="/inventory" className={`px-3 py-1.5 rounded-lg transition-all ${
                    isLinkActive('/inventory')
                      ? 'bg-emerald-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}>
                    Inventory
                  </Link>
                </>
              )}

              <Link to="/categories" className={`px-3 py-1.5 rounded-lg transition-all ${
                isLinkActive('/categories')
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}>
                EEE Database
              </Link>

              <Link to="/epr" className={`px-3 py-1.5 rounded-lg transition-all ${
                isLinkActive('/epr')
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}>
                EPR Targets
              </Link>
              
              <Link to="/admin/panel" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                Demo Credentials
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {selectedCollege ? (
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all text-xs font-semibold flex items-center gap-2 border border-slate-700/60"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Change College
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg transition-all text-xs font-semibold flex items-center gap-1"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 space-y-1.5 border-t border-slate-800 text-slate-200">
              <Link
                to={selectedCollege ? "/dashboard" : "/"}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
              >
                About
              </Link>

              {selectedCollege && (
                <>
                  <Link
                    to="/add"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
                  >
                    Add Waste
                  </Link>
                  <Link
                    to="/inventory"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
                  >
                    Inventory
                  </Link>
                </>
              )}

              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
              >
                EEE Database
              </Link>
              <Link
                to="/epr"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
              >
                EPR Targets
              </Link>

              <div className="pt-2 border-t border-slate-800">
                {selectedCollege ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Change College
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
