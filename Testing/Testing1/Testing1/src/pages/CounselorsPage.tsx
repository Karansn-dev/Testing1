import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, DollarSign, Clock } from 'lucide-react';
import { counselors } from '../data/mockData';
import { Counselor } from '../types';

export const CounselorsPage: React.FC = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleBooking = () => {
    // Simulate booking
    alert(`Booking confirmed with ${selectedCounselor?.name} for ${new Date(selectedSlot).toLocaleString()}`);
    setShowBooking(false);
    setSelectedCounselor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Counselors
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with licensed mental health professionals who understand the unique challenges facing Indian college students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {counselors.map((counselor, index) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={counselor.image}
                  alt={counselor.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{counselor.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{counselor.experience} years experience</p>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Specializations</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.specializations.slice(0, 2).map((spec, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {spec}
                        </span>
                      ))}
                      {counselor.specializations.length > 2 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded">
                          +{counselor.specializations.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Languages</p>
                    <p className="text-sm text-gray-700">{counselor.languages.join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      ₹{counselor.fee}/session
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      50 min
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCounselor(counselor);
                    setShowBooking(true);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBooking && selectedCounselor && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Book Session with {selectedCounselor.name}
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="space-y-2">
                      {selectedCounselor.availableSlots.map((slot) => (
                        <label
                          key={slot}
                          className={`block p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedSlot === slot
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            checked={selectedSlot === slot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-sm text-gray-900">
                            {new Date(slot).toLocaleDateString()} at {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Book anonymously</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBooking(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedSlot}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};