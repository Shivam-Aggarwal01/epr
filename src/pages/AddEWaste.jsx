import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, X, ShieldCheck, Info, AlertTriangle, CheckSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Add E-Waste Item</h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-2.5">
              Logging context: <span className="text-slate-800 font-bold">{deptData?.name || 'Please select department below'}</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* FORM PANEL */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card bg-white border border-slate-100 p-6 space-y-5">

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl font-semibold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-700" />
                  E-Waste Item registered in inventory successfully! Redirecting...
                </div>
              )}

              {/* Department Selection (if not pre-selected) */}
              {!selectedDepartment && (
                <div>
                  <label className="label-title">Department / Administrative Unit *</label>
                  <select
                    value={departmentForEntry}
                    onChange={(e) => setDepartmentForEntry(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">Choose Department</option>
                    {collegeDepartments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="label-title">Equipment / Item Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. HP LaserJet Printer P1102"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Section selection */}
                <div>
                  <label className="label-title">Regulatory Category Group *</label>
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
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">Choose Section</option>
                    {sections.map(sec => (
                      <option key={sec}>{sec}</option>
                    ))}
                  </select>
                </div>

                {/* EEE Category */}
                <div>
                  <label className="label-title">EEE Category Code *</label>
                  <select
                    name="eeeCode"
                    value={formData.eeeCode}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.id} - {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Quantity (Units) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="input-field"
                    min="1"
                  />
                </div>
                <div>
                  <label className="label-title">Lab / Room / Storage Location *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Block C, Second Floor Lab"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Serial & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    placeholder="Optional: S/N on device sticker"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className="input-field font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="label-title">Model Number</label>
                  <input
                    type="text"
                    name="modelNumber"
                    placeholder="Optional: e.g. L1908w"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    className="input-field font-mono text-sm"
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="label-title flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-800" />
                  Asset Photographs (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl bg-[#fafafa]/50 hover:bg-slate-50 transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-slate-400 group-hover:text-emerald-800 transition-colors" />
                    <div className="flex text-sm text-slate-600">
                      <span className="relative rounded-md font-semibold text-emerald-800">
                        Upload files
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-400">PNG, JPG, JPEG up to 2MB each</p>
                  </div>
                </div>

                {/* Previews */}
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                    {imagePreview.map((img, i) => (
                      <div key={i} className="relative h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                        <img src={img} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-lg transition-colors shadow-sm"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary flex-1 py-2.5 text-sm"
                >
                  Clear Fields
                </button>
                <button className="btn-primary flex-1 py-2.5 text-sm">
                  Register Item
                </button>
              </div>

            </form>
          </div>

          {/* EEE CATEGORY SOP DETAILS WIDGET */}
          <div className="space-y-6">
            <div className="card bg-white border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Info className="w-4 h-4 text-emerald-800" />
                <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">EEE SOP Specifications</h3>
              </div>

              {selectedCategory ? (
                <div className="space-y-4">
                  {/* Category Card */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <span className="inline-block text-[10px] font-extrabold bg-emerald-800 text-white px-2 py-0.5 rounded tracking-wider mb-2">
                      {selectedCategory.id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{selectedCategory.categoryName}</h4>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-1.5">{selectedCategory.section}</span>
                  </div>

                  {/* Lifespan Metric bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span>Mandated Average Lifespan:</span>
                      <span className="text-slate-900">{selectedCategory.averageLife} Years</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-700 h-full rounded-full" 
                        style={{ width: `${Math.min(100, (selectedCategory.averageLife / 15) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium block mt-1">Lifecycle value as regulated under Schedule I</span>
                  </div>

                  {/* Segregation Guide Checklist */}
                  <div className="pt-2">
                    <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2.5 flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-slate-600" />
                      Compliance Segregation Steps
                    </span>
                    <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 flex-shrink-0"></span>
                        Isolate battery packs or capacitors if detachable and store separately.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 flex-shrink-0"></span>
                        Label the asset enclosure with the generated unique EPR barcode.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 flex-shrink-0"></span>
                        Deliver to standard designated warehouse bin within 180 days of audit.
                      </li>
                    </ul>
                  </div>

                  {/* Safety Warning */}
                  <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3.5 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-amber-800 block">Hazardous Disposal Warning</span>
                      <p className="text-[10px] text-amber-700 leading-normal mt-0.5">
                        Do not break screens, CRT tubes, or crush casing. Component disintegration is strictly restricted to certified CPCB dismantlers.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">Select category code to display SOP specifications.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}