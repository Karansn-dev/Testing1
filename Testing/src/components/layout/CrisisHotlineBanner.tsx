import React from 'react';
import { Phone, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

export const CrisisHotlineBanner: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center relative">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium">
          {getTranslation('crisis.hotline', language)}
        </span>
        <Phone className="w-4 h-4 flex-shrink-0" />
      </div>
    </div>
  );
};