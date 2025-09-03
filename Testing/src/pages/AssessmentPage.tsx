import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { assessmentQuestions } from '../data/mockData';
import { AssessmentResult } from '../types';

export const AssessmentPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  const { setAssessmentResult } = useApp();

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      setIsCompleting(true);
      
      // Calculate scores
      const phq9Questions = assessmentQuestions.filter(q => q.category === 'phq9');
      const gad7Questions = assessmentQuestions.filter(q => q.category === 'gad7');
      
      const phq9Score = phq9Questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const gad7Score = gad7Questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      
      // Determine risk level
      let riskLevel: 'minimal' | 'mild' | 'moderate' | 'severe' = 'minimal';
      if (phq9Score >= 15 || gad7Score >= 15) riskLevel = 'severe';
      else if (phq9Score >= 10 || gad7Score >= 10) riskLevel = 'moderate';
      else if (phq9Score >= 5 || gad7Score >= 5) riskLevel = 'mild';

      const result: AssessmentResult = {
        phq9Score,
        gad7Score,
        riskLevel,
        recommendations: generateRecommendations(riskLevel),
        completedAt: new Date().toISOString()
      };

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAssessmentResult(result);
      navigate('/results');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const generateRecommendations = (riskLevel: string): string[] => {
    const recommendations = [
      'Continue regular self-care practices',
      'Consider talking to a counselor',
      'Join our peer support community',
      'Practice daily mindfulness exercises'
    ];

    if (riskLevel === 'severe') {
      recommendations.unshift('Seek immediate professional help');
      recommendations.push('Contact emergency services if needed');
    } else if (riskLevel === 'moderate') {
      recommendations.push('Book a session with one of our counselors');
      recommendations.push('Try our guided meditation resources');
    }

    return recommendations;
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 text-center max-w-md w-full shadow-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Processing Your Assessment
          </h2>
          <p className="text-gray-600">
            We're analyzing your responses and preparing personalized recommendations...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span className="text-sm text-blue-600 font-medium">
                {currentQuestion.category.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
              Over the last 2 weeks, how often have you been bothered by:
            </h2>
            <p className="text-lg text-gray-700 mt-2">
              {currentQuestion.text}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900">{option.text}</span>
                  {answers[currentQuestion.id] === option.value && (
                    <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};