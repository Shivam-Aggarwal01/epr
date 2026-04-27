import React, { useState, useMemo } from 'react';
import { useEWaste } from '../context/EWasteContext';
import { Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import './Categories.css';

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
      <div className="segregation-grid">
        {Object.entries(details).map(([material, quantity]) => (
          <div key={material} className="segregation-item">
            <span className="material-name">{material}:</span>
            <span className="material-quantity">{quantity}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderSOP = (sopText) => {
    const steps = sopText.split('\n').filter(step => step.trim());
    return (
      <ol className="sop-list">
        {steps.map((step, index) => (
          <li key={index}>{step.trim()}</li>
        ))}
      </ol>
    );
  };

  return (
    <div className="categories-container">
      <header className="categories-header">
        <h1>EEE Categories & Segregation Database</h1>
        <p>Browse and search electrical and electronic equipment categories with detailed segregation information</p>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by code, category name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="section-filter" className="filter-label">Filter by Section:</label>
        <select
          id="section-filter"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Sections</option>
          {sections.map(section => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
        <div className="filter-info">
          Found: <strong>{filteredCategories.length}</strong> categories
        </div>
      </div>

      {/* Categories List */}
      <div className="categories-list">
        {filteredCategories.length === 0 ? (
          <div className="no-results">
            <p>No categories found matching your search criteria.</p>
          </div>
        ) : (
          filteredCategories.map(category => (
            <div key={category.id} className="category-card">
              <button
                className="category-header-btn"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="category-header-content">
                  <div className="category-title">
                    <span className="category-code">{category.id}</span>
                    <span className="category-name">{category.categoryName}</span>
                  </div>
                  <div className="category-meta">
                    <span className="section-badge">{category.section}</span>
                    <span className="life-badge">⏱ {category.averageLife} years</span>
                  </div>
                </div>
                {expandedCategory === category.id ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedCategory === category.id && (
                <div className="category-details">
                  <div className="detail-section">
                    <h4>Description</h4>
                    <p>{category.description}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Average Lifespan</h4>
                    <p className="lifespan">{category.averageLife} years</p>
                  </div>

                  <div className="detail-section">
                    <h4>Standard Operating Procedure (SOP)</h4>
                    <div className="sop-section">
                      {renderSOP(category.sop)}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>
                      <AlertCircle size={18} className="inline-icon" />
                      Segregation & Material Extraction Details
                    </h4>
                    <div className="segregation-details">
                      {renderSegregationDetails(category.segregationDetails)}
                    </div>
                    <div className="hazard-note">
                      <strong>⚠️ Note:</strong> Handle all materials carefully. Hazardous materials must be processed according to e-waste regulations.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
