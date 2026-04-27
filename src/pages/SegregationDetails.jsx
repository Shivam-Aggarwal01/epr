import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { useEWaste } from '../context/EWasteContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const materialBreakdown = {
  Computer: [
    { name: 'Metal', percentage: 45, weight: 45, color: '#8b7355' },
    { name: 'Plastic', percentage: 30, weight: 30, color: '#d97706' },
    { name: 'Circuit Components', percentage: 25, weight: 25, color: '#0ea5e9' },
  ],
  Battery: [
    { name: 'Metal', percentage: 35, weight: 35, color: '#8b7355' },
    { name: 'Chemical', percentage: 40, weight: 40, color: '#ec4899' },
    { name: 'Plastic Casing', percentage: 25, weight: 25, color: '#d97706' },
  ],
  Cable: [
    { name: 'Copper', percentage: 50, weight: 50, color: '#b45309' },
    { name: 'Plastic Insulation', percentage: 35, weight: 35, color: '#d97706' },
    { name: 'Other Metals', percentage: 15, weight: 15, color: '#8b7355' },
  ],
  Mobile: [
    { name: 'Metal', percentage: 40, weight: 40, color: '#8b7355' },
    { name: 'Plastic', percentage: 25, weight: 25, color: '#d97706' },
    { name: 'Glass', percentage: 20, weight: 20, color: '#e0f2fe' },
    { name: 'Electronic Components', percentage: 15, weight: 15, color: '#0ea5e9' },
  ],
  Printer: [
    { name: 'Plastic', percentage: 40, weight: 40, color: '#d97706' },
    { name: 'Metal', percentage: 35, weight: 35, color: '#8b7355' },
    { name: 'Electronic Components', percentage: 25, weight: 25, color: '#0ea5e9' },
  ],
  Monitor: [
    { name: 'Glass', percentage: 50, weight: 50, color: '#e0f2fe' },
    { name: 'Plastic', percentage: 25, weight: 25, color: '#d97706' },
    { name: 'Metal/Electronics', percentage: 25, weight: 25, color: '#8b7355' },
  ],
};

export function SegregationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useEWaste();

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <button
            onClick={() => navigate('/inventory')}
            className="flex items-center gap-2 text-eco-600 hover:text-eco-700 mb-8 font-medium text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Inventory
          </button>
          <div className="card text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">Item not found</p>
          </div>
        </div>
      </div>
    );
  }

  const materials = materialBreakdown[item.category] || materialBreakdown.Computer;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <button
          onClick={() => navigate('/inventory')}
          className="flex items-center gap-2 text-eco-600 hover:text-eco-700 mb-8 font-medium text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Inventory
        </button>

        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Layers className="w-6 sm:w-8 h-6 sm:h-8 text-eco-600 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Material Segregation</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">Detailed breakdown of recyclable materials</p>
        </div>

        {/* Item Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Item Details</h2>
              <div className="space-y-3 text-sm sm:text-base">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Item Name</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{item.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Category</p>
                  <p className="text-base sm:text-lg font-semibold text-eco-600">{item.category}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">EPR Code</p>
                  <p className="font-mono text-sm sm:text-lg font-bold text-eco-600">{item.eprCode}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Quantity</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Location</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 truncate">{item.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Materials List */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Material Composition</h2>
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: material.color }}
                        />
                        <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{material.name}</span>
                      </div>
                      <span className="text-eco-600 font-bold text-sm sm:text-base whitespace-nowrap">{material.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${material.percentage}%`,
                          backgroundColor: material.color,
                        }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Est. weight: {material.weight}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card mb-8 sm:mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Visual Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materials}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#22c55e" radius={[8, 8, 0, 0]}>
                {materials.map((material, index) => (
                  <Cell key={`cell-${index}`} fill={material.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Suggested Dealers */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Suggested Dealers</h2>
          <div className="space-y-3 sm:space-y-4">
            {item.category === 'Computer' && (
              <div className="border border-eco-200 rounded-lg p-3 sm:p-4 hover:bg-eco-50 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">TechScrap Ltd</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Specializes in computer and electronic waste</p>
                    <p className="text-eco-600 text-xs sm:text-sm mt-2">Categories: Computer, Electronics</p>
                  </div>
                  <Link to="/dealers" className="text-eco-600 hover:text-eco-700 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                    View →
                  </Link>
                </div>
              </div>
            )}
            {item.category === 'Battery' && (
              <div className="border border-eco-200 rounded-lg p-3 sm:p-4 hover:bg-eco-50 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">GreenRecycle</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Expert in battery and chemical recycling</p>
                    <p className="text-eco-600 text-xs sm:text-sm mt-2">Categories: Batteries, Cables</p>
                  </div>
                  <Link to="/dealers" className="text-eco-600 hover:text-eco-700 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                    View →
                  </Link>
                </div>
              </div>
            )}
            {item.category === 'Cable' && (
              <div className="border border-eco-200 rounded-lg p-3 sm:p-4 hover:bg-eco-50 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">CopperGain Recycling</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Specialized in metal and cable recycling</p>
                    <p className="text-eco-600 text-xs sm:text-sm mt-2">Categories: Cables, Metals</p>
                  </div>
                  <Link to="/dealers" className="text-eco-600 hover:text-eco-700 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                    View →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
