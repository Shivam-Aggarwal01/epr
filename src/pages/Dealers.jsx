import React, { useState } from 'react';
import { Users, MessageCircle } from 'lucide-react';

const dealers = [
  {
    id: '1',
    name: 'GreenRecycle',
    categories: ['Battery', 'Cable'],
    contact: 'sales@greenrecycle.com',
    email: 'sales@greenrecycle.com',
    phone: '+1-800-123-4567',
    rating: 4.8,
    image: '🟢',
  },
  {
    id: '2',
    name: 'TechScrap Ltd',
    categories: ['Computer', 'Mobile', 'Monitor'],
    contact: 'info@techscrap.com',
    email: 'info@techscrap.com',
    phone: '+1-800-987-6543',
    rating: 4.6,
    image: '💻',
  },
  {
    id: '3',
    name: 'CopperGain Recycling',
    categories: ['Cable', 'Computer'],
    contact: 'contact@coppergain.com',
    email: 'contact@coppergain.com',
    phone: '+1-800-555-0123',
    rating: 4.7,
    image: '🔌',
  },
  {
    id: '4',
    name: 'EcoMetal Solutions',
    categories: ['Battery', 'Computer', 'Cable'],
    contact: 'team@ecometal.com',
    email: 'team@ecometal.com',
    phone: '+1-800-444-9876',
    rating: 4.5,
    image: '♻️',
  },
  {
    id: '5',
    name: 'MobileParts Recovery',
    categories: ['Mobile', 'Battery'],
    contact: 'hello@mobileparts.com',
    email: 'hello@mobileparts.com',
    phone: '+1-800-222-1111',
    rating: 4.4,
    image: '📱',
  },
  {
    id: '6',
    name: 'PrinterWaste Ltd',
    categories: ['Printer', 'Computer'],
    contact: 'support@printerwaste.com',
    email: 'support@printerwaste.com',
    phone: '+1-800-333-2222',
    rating: 4.3,
    image: '🖨️',
  },
];

export function Dealers() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(dealers.flatMap(d => d.categories))];

  const filteredDealers = selectedCategory === 'All'
    ? dealers
    : dealers.filter(dealer => dealer.categories.includes(selectedCategory));

  const handleContact = (dealer) => {
    alert(`Opening contact for ${dealer.name}\nEmail: ${dealer.email}\nPhone: ${dealer.phone}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Users className="w-6 sm:w-8 h-6 sm:h-8 text-eco-600 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Dealer Marketplace</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">Connect with certified e-waste dealers and recyclers</p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <p className="text-gray-700 font-medium mb-3 text-sm sm:text-base">Filter by Category:</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  selectedCategory === cat
                    ? 'bg-eco-600 text-white'
                    : 'bg-white border border-eco-200 text-eco-600 hover:bg-eco-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDealers.map((dealer) => (
            <div key={dealer.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl sm:text-4xl">{dealer.image}</div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{dealer.rating}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{dealer.name}</h3>

              <div className="mb-4">
                <p className="text-gray-600 text-xs sm:text-sm mb-3">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {dealer.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-eco-100 text-eco-700 rounded text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                <p className="text-gray-600 text-xs sm:text-sm break-all">
                  <span className="font-medium">Email:</span> {dealer.email}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="font-medium">Phone:</span> {dealer.phone}
                </p>
              </div>

              <button
                onClick={() => handleContact(dealer)}
                className="w-full flex items-center justify-center gap-2 btn-primary"
              >
                <MessageCircle className="w-4 h-4" />
                Contact
              </button>
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="card text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">No dealers found for this category</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 sm:mt-12 bg-eco-50 border border-eco-200 rounded-lg p-4 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">About Our Dealers</h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            All listed dealers are certified e-waste recyclers with proper environmental compliance.
            They handle different categories of electronic waste and provide competitive rates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div>
              <p className="font-semibold text-eco-700 mb-1 text-sm sm:text-base">✓ Certified</p>
              <p className="text-gray-600 text-xs sm:text-sm">All dealers are government certified</p>
            </div>
            <div>
              <p className="font-semibold text-eco-700 mb-1 text-sm sm:text-base">✓ Safe Processing</p>
              <p className="text-gray-600 text-xs sm:text-sm">Environmentally safe recycling methods</p>
            </div>
            <div>
              <p className="font-semibold text-eco-700 mb-1 text-sm sm:text-base">✓ Fair Pricing</p>
              <p className="text-gray-600 text-xs sm:text-sm">Competitive rates for all categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
