import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart, MessageCircle, Search, ThumbsUp } from 'lucide-react';
import { communityPosts } from '../data/mockData';
import { CommunityPost } from '../types';

export const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = ['All', 'Academic Stress', 'Family Issues', 'Relationships', 'Career Anxiety', 'Mental Health'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Peer Support Community
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow students in a safe, anonymous space. Share experiences, seek advice, and support others on their mental health journey.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.timestamp).toLocaleDateString()} • {post.category}
                    </p>
                  </div>
                </div>
                {post.isAnonymous && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    Anonymous
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments.length} replies</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Support</span>
                </button>
              </div>

              {/* Comments Preview */}
              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600">
                          {post.comments[0].author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{post.comments[0].author}</span>
                    </div>
                    <p className="text-sm text-gray-600">{post.comments[0].content}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-700">Post anonymously</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};