import React from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, AlertTriangle, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell, ResponsiveContainer } from 'recharts';
import { adminMetrics } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

export const AdminPage: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
          <p className="text-sm text-gray-500">Demo credentials: admin@college.edu / admin123</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      icon: Users,
      label: 'Active Users',
      value: adminMetrics.activeUsers.toLocaleString(),
      change: '+12%',
      positive: true
    },
    {
      icon: ClipboardList,
      label: 'Assessments This Week',
      value: adminMetrics.assessmentsThisWeek.toString(),
      change: '+8%',
      positive: true
    },
    {
      icon: AlertTriangle,
      label: 'Crisis Interventions',
      value: adminMetrics.crisisInterventions.toString(),
      change: '-5%',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '94%',
      change: '+2%',
      positive: true
    }
  ];

  const pieColors = ['#10B981', '#F59E0B', '#F97316', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor system health and user engagement</p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">User Engagement (7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={adminMetrics.userEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [value, 'Active Users']}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Risk Level Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={adminMetrics.riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  nameKey="level"
                >
                  {adminMetrics.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Users']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {adminMetrics.riskDistribution.map((item, index) => (
                <div key={item.level} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                  />
                  <span className="text-sm text-gray-700">{item.level}: {item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Crisis Alerts</h3>
          <div className="space-y-4">
            {[
              { id: 1, user: 'Student847', severity: 'High', time: '2 hours ago', status: 'Contacted' },
              { id: 2, user: 'CollegeLife23', severity: 'Medium', time: '5 hours ago', status: 'Monitoring' },
              { id: 3, user: 'AnxiousStudent', severity: 'High', time: '1 day ago', status: 'Resolved' }
            ].map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.user}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    alert.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};