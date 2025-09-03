import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, MessageCircle, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CrisisModal } from '../components/modals/CrisisModal';

export const ResultsPage: React.FC = () => {
  const { assessmentResult } = useApp();
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  React.useEffect(() => {
    if (assessmentResult && assessmentResult.riskLevel === 'severe') {
      setShowCrisisModal(true);
    }
  }, [assessmentResult]);

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Assessment Found</h2>
          <p className="text-gray-600 mb-4">Please complete an assessment first.</p>
          <Link
            to="/assessment"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  const { phq9Score, gad7Score, riskLevel, recommendations } = assessmentResult;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'minimal': return 'text-green-600 bg-green-50 border-green-200';
      case 'mild': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'severe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'minimal': return 'Your scores suggest minimal symptoms. Continue your current self-care practices.';
      case 'mild': return 'You may be experiencing mild symptoms. Consider implementing stress-reduction techniques.';
      case 'moderate': return 'Your scores indicate moderate symptoms. We recommend speaking with a counselor.';
      case 'severe': return 'Your scores suggest significant symptoms. Please consider professional support immediately.';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Mental Health Assessment Results
          </h1>
          <p className="text-gray-600">
            Completed on {new Date(assessmentResult.completedAt).toLocaleDateString()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* PHQ-9 Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Depression Screening (PHQ-9)</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{phq9Score}</div>
              <div className="text-sm text-gray-500 mb-4">out of 27</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(riskLevel)}`}>
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
              </div>
            </div>
          </motion.div>

          {/* GAD-7 Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Anxiety Screening (GAD-7)</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{gad7Score}</div>
              <div className="text-sm text-gray-500 mb-4">out of 21</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(riskLevel)}`}>
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
              </div>
            </div>
          </motion.div>
        </div>

        {/* Overall Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Assessment</h3>
          <p className="text-gray-700 leading-relaxed">
            {getRiskDescription(riskLevel)}
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Link
            to="/counselors"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center group"
          >
            <Calendar className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Book Counselor</span>
          </Link>

          <Link
            to="/chat"
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center group"
          >
            <MessageCircle className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Chat with AI</span>
          </Link>

          <Link
            to="/community"
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center group"
          >
            <Users className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Join Community</span>
          </Link>

          <button className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors text-center group">
            <Download className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Download Report</span>
          </button>
        </motion.div>

        {/* Retake Assessment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            Retake Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};