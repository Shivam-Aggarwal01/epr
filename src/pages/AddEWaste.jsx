import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, X } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';

export function AddEWaste() {
  const navigate = useNavigate();
  const {
    items,
    addItem,
    getAllCategories,
    getCategory,
    selectedCollege,
    selectedDepartment,
    getCollege,
    getDepartmentsByCollege,
  } = useEWaste();

  const initialFormState = {
    name: '',
    eeeCode: 'ITEW1',
    quantity: '1',
    location: '',
    serialNumber: '',
    modelNumber: '',
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [departmentForEntry, setDepartmentForEntry] = useState(selectedDepartment || '');

  const categories = getAllCategories();
  const sections = [...new Set(categories.map(cat => cat.section))];

  const collegeData = getCollege(selectedCollege);
  const collegeDepartments = selectedCollege ? getDepartmentsByCollege(selectedCollege) : [];
  const deptData = collegeData?.departments?.find(
    d => d.id === (selectedDepartment || departmentForEntry)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      // limit size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be under 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.eeeCode || (!selectedDepartment && !departmentForEntry)) {
      alert('Please fill all required fields');
      return;
    }

    // safer unique EPR code
    const eprCode = `EPR-${formData.eeeCode}-${Date.now()}`;

    addItem({
      name: formData.name,
      eeeCode: formData.eeeCode,
      quantity: parseInt(formData.quantity),
      location: formData.location,
      eprCode,
      serialNumber: formData.serialNumber,
      modelNumber: formData.modelNumber,
      images: formData.images,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'Active',
      collegeId: selectedCollege,
      departmentId: selectedDepartment || departmentForEntry,
    });

    setSubmitted(true);
    setFormData(initialFormState);
    setImagePreview([]);

    setTimeout(() => {
      navigate('/inventory');
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setImagePreview([]);
    setSubmitted(false);
    setDepartmentForEntry(selectedDepartment || '');
  };

  const selectedCategory = getCategory(formData.eeeCode);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-7 h-7 text-eco-600" />
            <h1 className="text-3xl font-bold">Add E-Waste Item</h1>
          </div>
          <p className="text-gray-600">
            Department: <span className="font-semibold">{deptData?.name || 'Please select below'}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* FORM */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card">

              {submitted && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  Item added successfully!
                </div>
              )}

              {!selectedDepartment && (
                <select
                  value={departmentForEntry}
                  onChange={(e) => setDepartmentForEntry(e.target.value)}
                  className="input-field mb-4"
                >
                  <option value="">Select Department/Unit</option>
                  {collegeDepartments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              )}

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                className="input-field mb-4"
              />

              {/* Section */}
              <select
                onChange={(e) => {
                  const section = e.target.value;
                  const filtered = categories.filter(c => c.section === section);
                  if (filtered.length > 0) {
                    setFormData(prev => ({
                      ...prev,
                      eeeCode: filtered[0].id
                    }));
                  } 
                  
                }}
                className="input-field mb-4"
              >
                <option value="">Select Section</option>
                {sections.map(sec => (
                  <option key={sec}>{sec}</option>
                ))}
              </select>

              {/* Category */}
              <select
                name="eeeCode"
                value={formData.eeeCode}
                onChange={handleChange}
                className="input-field mb-4"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.id} - {cat.categoryName}
                  </option>
                ))}
              </select>

              {/* Quantity & Location */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input-field"
                  min="1"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {/* Serial & Model */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="serialNumber"
                  placeholder="Serial Number"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="modelNumber"
                  placeholder="Model Number"
                  value={formData.modelNumber}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  <Upload className="inline mr-2" size={16} />
                  Upload Images
                </label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <div className="grid grid-cols-3 gap-3 mt-3">
                  {imagePreview.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} className="h-24 w-full object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button className="btn-primary flex-1">
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary flex-1"
                >
                  Clear
                </button>
              </div>

            </form>
          </div>

          {/* INFO PANEL */}
          <div className="card">
            <h2 className="font-bold mb-4">Category Info</h2>

            {selectedCategory ? (
              <>
                <p><strong>Code:</strong> {selectedCategory.id}</p>
                <p><strong>Name:</strong> {selectedCategory.categoryName}</p>
                <p><strong>Section:</strong> {selectedCategory.section}</p>
                <p><strong>Lifespan:</strong> {selectedCategory.averageLife} yrs</p>
              </>
            ) : (
              <p>Select category to view details</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}