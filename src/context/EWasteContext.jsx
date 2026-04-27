import React, { createContext, useState, useContext } from 'react';
import categoriesData from '../data/eeeCategories.json';
import { PU_COLLEGES } from '../data/puColleges';

const EWasteContext = createContext(undefined);

export function EWasteProvider({ children }) {
  const [colleges, setColleges] = useState(PU_COLLEGES);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Old Laptop',
      eeeCode: 'ITEW3',
      quantity: 1,
      location: 'Lab A',
      eprCode: 'EPR-COMP-001',
      dateAdded: '2025-06-15',
      status: 'Active',
      images: [],
      serialNumber: 'SN-12345',
      modelNumber: 'HP-ProBook-450',
      collegeId: 'COL-005',
      departmentId: 'DEPT-005-002-UNIVERSITY-INSTITUTE-OF-ENGINEERING',
    },
    {
      id: '2',
      name: 'Battery Pack',
      eeeCode: 'ITEW25',
      quantity: 5,
      location: 'Storeroom B',
      eprCode: 'EPR-BAT-001',
      dateAdded: '2025-08-20',
      status: 'Active',
      images: [],
      serialNumber: 'SN-67890',
      modelNumber: 'Inverter-2KVA',
      collegeId: 'COL-010',
      departmentId: 'DEPT-010-022-PHYSICS',
    },
    {
      id: '3',
      name: 'Washing Machine',
      eeeCode: 'CEEW3',
      quantity: 1,
      location: 'Lab C',
      eprCode: 'EPR-WASH-001',
      dateAdded: '2025-10-01',
      status: 'Active',
      images: [],
      serialNumber: 'SN-11111',
      modelNumber: 'LG-WM-2000',
      collegeId: 'COL-015',
      departmentId: 'DEPT-015-001-A-C-JOSHI-LIBRARY',
    },
  ]);

  const [categories, setCategories] = useState(categoriesData.categories);

  const addItem = (newItem) => {
    const id = (Math.max(...items.map(i => parseInt(i.id) || 0)) + 1).toString();
    setItems([...items, { ...newItem, id, images: newItem.images || [] }]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getCategory = (eeeCode) => {
    return categories.find(cat => cat.id === eeeCode);
  };

  const getAllCategories = () => {
    return categories;
  };

  const searchCategories = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return categories.filter(cat =>
      cat.id.toLowerCase().includes(term) ||
      cat.categoryName.toLowerCase().includes(term) ||
      cat.section.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );
  };

  const getCategoriesBySection = (section) => {
    return categories.filter(cat => cat.section === section);
  };

  // College and Department methods
  const getAllColleges = () => {
    return Object.values(colleges);
  };

  const getCollege = (collegeId) => {
    return colleges[collegeId];
  };

  const getDepartmentsByCollege = (collegeId) => {
    const college = colleges[collegeId];
    return college ? college.departments : [];
  };

  const setActive = (collegeId, departmentId) => {
    setSelectedCollege(collegeId);
    setSelectedDepartment(departmentId);
  };

  const clearActive = () => {
    setSelectedCollege(null);
    setSelectedDepartment(null);
  };

  const getItemsByDepartment = (collegeId, departmentId) => {
    if (!collegeId) return items;
    if (!departmentId) {
      return items.filter(item => item.collegeId === collegeId);
    }
    return items.filter(
      item => item.collegeId === collegeId && item.departmentId === departmentId
    );
  };

  const getItemsByCollege = (collegeId) => {
    return items.filter(item => item.collegeId === collegeId);
  };

  const getDepartmentStats = (collegeId) => {
    const collegeItems = getItemsByCollege(collegeId);
    const stats = {};
    
    collegeItems.forEach(item => {
      if (!stats[item.departmentId]) {
        stats[item.departmentId] = { count: 0, quantity: 0 };
      }
      stats[item.departmentId].count++;
      stats[item.departmentId].quantity += item.quantity;
    });

    return stats;
  };

  const getCategoryStats = (collegeId, departmentId = null) => {
    const scopedItems = getItemsByDepartment(collegeId, departmentId);
    const stats = {};

    scopedItems.forEach((item) => {
      const category = getCategory(item.eeeCode);
      const key = category?.categoryName || item.eeeCode;
      if (!stats[key]) {
        stats[key] = { quantity: 0, entries: 0 };
      }
      stats[key].quantity += item.quantity;
      stats[key].entries += 1;
    });

    return stats;
  };

  return (
    <EWasteContext.Provider value={{
      // Items
      items,
      addItem,
      updateItem,
      deleteItem,
      // Categories
      categories,
      getCategory,
      getAllCategories,
      searchCategories,
      getCategoriesBySection,
      // Colleges and Departments
      colleges,
      selectedCollege,
      selectedDepartment,
      getAllColleges,
      getCollege,
      getDepartmentsByCollege,
      setActive,
      clearActive,
      getItemsByDepartment,
      getItemsByCollege,
      getDepartmentStats,
      getCategoryStats,
    }}>
      {children}
    </EWasteContext.Provider>
  );
}

export function useEWaste() {
  const context = useContext(EWasteContext);
  if (!context) {
    throw new Error('useEWaste must be used within EWasteProvider');
  }
  return context;
}
