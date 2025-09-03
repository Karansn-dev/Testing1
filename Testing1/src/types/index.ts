export interface User {
  id: string;
  name: string;
  email: string;
  language: 'en' | 'hi' | 'ta';
  joinedAt: string;
}

export interface Counselor {
  id: string;
  name: string;
  image: string;
  specializations: string[];
  languages: string[];
  experience: number;
  rating: number;
  availableSlots: string[];
  bio: string;
  qualifications: string[];
  fee: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
  mood?: 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  category: 'phq9' | 'gad7';
  options: {
    value: number;
    text: string;
  }[];
}

export interface AssessmentResult {
  phq9Score: number;
  gad7Score: number;
  riskLevel: 'minimal' | 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  completedAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: CommunityComment[];
  isAnonymous: boolean;
}

export interface CommunityComment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'audio' | 'worksheet';
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  url: string;
  language: string;
}

export interface AdminMetrics {
  activeUsers: number;
  assessmentsThisWeek: number;
  crisisInterventions: number;
  userEngagement: {
    date: string;
    users: number;
  }[];
  riskDistribution: {
    level: string;
    count: number;
  }[];
}