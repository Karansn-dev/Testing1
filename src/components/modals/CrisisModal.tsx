import React from 'react';
import { X, Phone, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-red-50">
              <h2 className="text-lg font-semibold text-red-800">Immediate Support Available</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-gray-700 mb-4">
                  You don't have to face this alone. Help is available 24/7.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:18005990019"
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Crisis Hotline Now
                </a>

                <a
                  href="https://wa.me/918005990019"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                  <Users className="w-4 h-4" />
                  Connect with Counselor
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 space-y-2">
                <p><strong>Remember:</strong></p>
                <ul className="text-left space-y-1">
                  <li>• This feeling is temporary</li>
                  <li>• You matter and your life has value</li>
                  <li>• Professional help is available</li>
                  <li>• Many students feel this way - you're not alone</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};