import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { CrisisModal } from '../components/modals/CrisisModal';
import { crisisKeywords, quickResponses, aiResponses } from '../data/mockData';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI mental health assistant. I\'m here to listen and provide support. How are you feeling today?',
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const detectCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return aiResponses.anxiety;
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('pressure')) {
      return aiResponses.stress;
    }
    if (lowerMessage.includes('family') || lowerMessage.includes('parents')) {
      return aiResponses.family;
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return aiResponses.sleep;
    }
    if (lowerMessage.includes('overwhelmed')) {
      return aiResponses.overwhelmed;
    }
    if (lowerMessage.includes('relationship') || lowerMessage.includes('boyfriend') || lowerMessage.includes('girlfriend')) {
      return aiResponses.relationships;
    }
    
    return "I hear you, and I want you to know that what you're experiencing is valid. Many college students in India face similar challenges. Can you tell me more about what's troubling you specifically?";
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Check for crisis keywords
    if (detectCrisis(content)) {
      setShowCrisisModal(true);
    }

    // Simulate AI typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(content),
      isBot: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, aiResponse]);
  };

  const handleQuickResponse = (response: string) => {
    sendMessage(response);
  };

  const moodEmojis = [
    { emoji: '😊', mood: 'happy' as const, label: 'Happy' },
    { emoji: '😐', mood: 'neutral' as const, label: 'Neutral' },
    { emoji: '😟', mood: 'anxious' as const, label: 'Anxious' },
    { emoji: '😢', mood: 'sad' as const, label: 'Sad' },
    { emoji: '😠', mood: 'angry' as const, label: 'Angry' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">AI Mental Health Assistant</h1>
            <p className="text-sm text-gray-500">Online • Responds instantly</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                
                <div className={`max-w-lg p-4 rounded-lg ${
                  message.isBot 
                    ? 'bg-white border border-gray-200' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.isBot ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                {!message.isBot && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Responses */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">How are you feeling?</p>
            <div className="flex gap-2 flex-wrap">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.mood}
                  onClick={() => sendMessage(`I'm feeling ${mood.label.toLowerCase()}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  <span>{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick responses:</p>
            <div className="flex gap-2 flex-wrap">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};