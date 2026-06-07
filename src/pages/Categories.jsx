import React, { useState, useMemo } from 'react';
import { useEWaste } from '../context/EWasteContext';
import { Search, ChevronDown, ChevronUp, AlertCircle, FileText, Compass } from 'lucide-react';

export function Categories() {
  const { getAllCategories, getCategoriesBySection } = useEWaste();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const allCategories = getAllCategories();

  const sections = [...new Set(allCategories.map(cat => cat.section))];

  const filteredCategories = useMemo(() => {
    let result = allCategories;

    if (selectedSection !== 'all') {
      result = getCategoriesBySection(selectedSection);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(cat =>
        cat.id.toLowerCase().includes(term) ||
        cat.categoryName.toLowerCase().includes(term) ||
        cat.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [searchTerm, selectedSection, allCategories, getCategoriesBySection]);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderSegregationDetails = (details) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        {Object.entries(details).map(([material, quantity]) => {
          const numericVal = parseFloat(quantity) || 0;
          return (
            <div key={material} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span className="capitalize">{material}</span>
                <span className="text-emerald-800">{quantity}</span>
              </div>
              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-700 h-full rounded-full" 
                  style={{ width: `${Math.min(100, numericVal > 0 ? numericVal : 40)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSOP = (sopText) => {
    const steps = sopText.split('\n').filter(step => step.trim());
    return (
      <ol className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-600 list-decimal pl-4.5">
        {steps.map((step, index) => (
          <li key={index} className="pl-1 leading-relaxed">
            {step.trim()}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 mb-10 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            EEE REGULATORY CATALOGUE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            EEE Categories & Segregation SOPs
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Statutory classification database of Electrical and Electronic Equipment (EEE) with standard CPCB environmental recovery targets.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Search & Filters */}
        <div className="card bg-white border border-slate-100 p-5 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search by code, category name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm shadow-sm"
              />
            </div>

            {/* Section Filter dropdown */}
            <div>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm font-medium"
              >
                <option value="all">All Groups</option>
                {sections.map(section => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-800" />
              E-Waste Categories Database
            </span>
            <span>Found: <strong className="text-emerald-800 font-extrabold">{filteredCategories.length}</strong> groups</span>
          </div>
        </div>

        {/* Categories Accordion list */}
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="card bg-white border border-slate-100 text-center py-12 text-slate-500 font-semibold text-sm">
              No equipment categories found matching your query
            </div>
          ) : (
            filteredCategories.map(category => {
              const isExpanded = expandedCategory === category.id;
              return (
                <div 
                  key={category.id} 
                  className={`border rounded-2xl bg-white transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'border-emerald-600 shadow-md' 
                      : 'border-slate-100 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <button
                    className="w-full p-5 text-left flex items-start sm:items-center justify-between gap-4"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <span className="w-[60px] text-xs font-black bg-emerald-800 text-white px-2 py-0.5 rounded text-center tracking-wider flex-shrink-0">
                        {category.id}
                      </span>
                      <span className="font-bold text-slate-800 text-sm sm:text-base leading-tight truncate">
                        {category.categoryName}
                      </span>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200/60">
                          {category.section}
                        </span>
                        <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200/50">
                          ⏱ {category.averageLife} yrs
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 bg-[#fafafa]/50 space-y-6">
                      
                      {/* Description */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Asset Description</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {category.description}
                        </p>
                      </div>

                      {/* Lifespan */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Average Lifespan Target</h4>
                        <p className="text-sm font-black text-slate-800">
                          {category.averageLife} Years <span className="text-xs font-semibold text-slate-400">(Schedule I Standard)</span>
                        </p>
                      </div>

                      {/* SOP */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-emerald-800" />
                          Standard Operating Procedure (SOP)
                        </h4>
                        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                          {renderSOP(category.sop)}
                        </div>
                      </div>

                      {/* Segregation Details */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-emerald-800" />
                          Segregation & Metal Extraction Breakdown
                        </h4>
                        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                          {renderSegregationDetails(category.segregationDetails)}
                        </div>
                        <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-3.5 mt-2 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                          <span className="text-[10px] text-amber-700 font-medium leading-normal">
                            <strong>Statutory Alert:</strong> Extractable metals and plastics are estimated averages. Hazardous heavy elements (mercury, cadmium) must be processed separately inside certified recycling chambers.
                          </span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
