import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Users, BookOpen, Shield, Clock, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

export const LandingPage: React.FC = () => {
  const { language } = useApp();

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Mental Health Assistant',
      description: 'Chat with our culturally-aware AI for immediate support and coping strategies',
      link: '/chat',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Professional Counselors',
      description: 'Book sessions with licensed therapists who understand Indian college life',
      link: '/counselors',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Peer Support Community',
      description: 'Connect anonymously with other students facing similar challenges',
      link: '/community',
      color: 'purple'
    },
    {
      icon: BookOpen,
      title: 'Mental Health Resources',
      description: 'Access guided meditations, articles, and tools in multiple languages',
      link: '/resources',
      color: 'orange'
    }
  ];

  const trustIndicators = [
    { name: 'IIT Delhi', logo: '🏛️' },
    { name: 'AIIMS', logo: '🏥' },
    { name: 'DU', logo: '🎓' },
    { name: 'JNU', logo: '📚' }
  ];

  const stats = [
    { icon: Users, label: 'Students Helped', value: '2,847+' },
    { icon: Clock, label: 'Available 24/7', value: 'Always' },
    { icon: Shield, label: 'Confidential', value: '100%' },
    { icon: Award, label: 'Success Rate', value: '94%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {getTranslation('hero.title', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {getTranslation('hero.subtitle', language)}
            </p>
            <Link
              to="/assessment"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {getTranslation('hero.cta', language)}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <p className="text-sm text-gray-500 mb-4">Trusted by students from leading institutions</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {trustIndicators.map((institution, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">{institution.logo}</span>
                  <span className="font-medium">{institution.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="block group"
                >
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform group-hover:scale-105 border border-gray-100">
                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                      feature.color === 'blue' ? 'bg-blue-100' :
                      feature.color === 'green' ? 'bg-green-100' :
                      feature.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      <feature.icon className={`w-6 h-6 ${
                        feature.color === 'blue' ? 'text-blue-600' :
                        feature.color === 'green' ? 'text-green-600' :
                        feature.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Take the First Step Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Your mental health journey starts with understanding where you are right now.
            </p>
            <Link
              to="/assessment"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Mental Health Assessment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};