import { Counselor, CommunityPost, Resource, AdminMetrics, AssessmentQuestion } from '../types';

export const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    specializations: ['Anxiety Disorders', 'Academic Stress', 'Family Therapy'],
    languages: ['English', 'Hindi', 'Punjabi'],
    experience: 8,
    rating: 4.9,
    availableSlots: ['2024-01-15T10:00', '2024-01-15T14:00', '2024-01-16T11:00'],
    bio: 'Specializes in helping college students navigate academic pressure and family expectations with culturally sensitive approaches.',
    qualifications: ['PhD Clinical Psychology', 'MS Family Therapy', 'Certified CBT Practitioner'],
    fee: 1200
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    specializations: ['Depression', 'Career Counseling', 'Relationship Issues'],
    languages: ['English', 'Hindi', 'Bengali'],
    experience: 12,
    rating: 4.8,
    availableSlots: ['2024-01-15T09:00', '2024-01-15T15:00', '2024-01-17T10:00'],
    bio: 'Experienced in addressing depression and career anxiety among engineering and medical students.',
    qualifications: ['MD Psychiatry', 'Fellowship in Adolescent Psychology'],
    fee: 1500
  },
  {
    id: '3',
    name: 'Dr. Meera Nair',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    specializations: ['Trauma Therapy', 'Self-Esteem Issues', 'Gender Identity'],
    languages: ['English', 'Malayalam', 'Tamil'],
    experience: 6,
    rating: 4.7,
    availableSlots: ['2024-01-15T13:00', '2024-01-16T09:00', '2024-01-16T16:00'],
    bio: 'Focuses on trauma-informed care and supporting students with identity and self-worth challenges.',
    qualifications: ['MS Clinical Psychology', 'Trauma-Informed Care Certification'],
    fee: 1000
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    title: 'How to deal with engineering entrance exam stress?',
    content: 'I have JEE Advanced next month and I can\'t sleep. The pressure from family is overwhelming. Anyone else going through this?',
    author: 'EngineeringHopes23',
    category: 'Academic Stress',
    timestamp: '2024-01-14T10:30:00Z',
    likes: 24,
    isAnonymous: true,
    comments: [
      {
        id: '1',
        content: 'I went through the same thing last year. Try meditation and remember that your worth isn\'t defined by one exam.',
        author: 'IITSurvivor',
        timestamp: '2024-01-14T11:00:00Z',
        likes: 8
      }
    ]
  },
  {
    id: '2',
    title: 'Feeling disconnected from family expectations',
    content: 'My parents want me to be a doctor but I want to pursue arts. This constant conflict is affecting my mental health.',
    author: 'ArtistAtHeart',
    category: 'Family Issues',
    timestamp: '2024-01-13T15:45:00Z',
    likes: 18,
    isAnonymous: true,
    comments: []
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Managing Academic Pressure: A Student\'s Guide',
    description: 'Practical strategies for handling exam stress and performance anxiety',
    type: 'video',
    category: 'Academic Stress',
    duration: '15 mins',
    difficulty: 'beginner',
    thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: '#',
    language: 'English'
  },
  {
    id: '2',
    title: 'पारिवारिक दबाव से कैसे निपटें',
    description: 'भारतीय छात्रों के लिए पारिवारिक अपेक्षाओं को संभालने की रणनीति',
    type: 'article',
    category: 'Family Issues',
    duration: '8 mins',
    difficulty: 'intermediate',
    thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: '#',
    language: 'Hindi'
  },
  {
    id: '3',
    title: 'Guided Meditation for Sleep',
    description: 'Calming meditation specifically designed for students with racing thoughts',
    type: 'audio',
    category: 'Sleep & Relaxation',
    duration: '20 mins',
    difficulty: 'beginner',
    thumbnail: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: '#',
    language: 'English'
  }
];

export const adminMetrics: AdminMetrics = {
  activeUsers: 2847,
  assessmentsThisWeek: 156,
  crisisInterventions: 12,
  userEngagement: [
    { date: '2024-01-08', users: 234 },
    { date: '2024-01-09', users: 267 },
    { date: '2024-01-10', users: 298 },
    { date: '2024-01-11', users: 312 },
    { date: '2024-01-12', users: 289 },
    { date: '2024-01-13', users: 356 },
    { date: '2024-01-14', users: 378 }
  ],
  riskDistribution: [
    { level: 'Minimal', count: 1205 },
    { level: 'Mild', count: 892 },
    { level: 'Moderate', count: 456 },
    { level: 'Severe', count: 294 }
  ]
};

export const assessmentQuestions: AssessmentQuestion[] = [
  // PHQ-9 Questions
  {
    id: 'phq9-1',
    text: 'Little interest or pleasure in doing things',
    category: 'phq9',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-2',
    text: 'Feeling down, depressed, or hopeless',
    category: 'phq9',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    category: 'phq9',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  // GAD-7 Questions
  {
    id: 'gad7-1',
    text: 'Feeling nervous, anxious, or on edge',
    category: 'gad7',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-2',
    text: 'Not being able to stop or control worrying',
    category: 'gad7',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  }
];

export const crisisKeywords = [
  'suicide', 'kill myself', 'end it all', 'hurt myself', 'no point living',
  'better off dead', 'want to die', 'end my life', 'harm myself'
];

export const quickResponses = [
  "I'm feeling anxious about exams",
  "Need coping strategies for stress",
  "Dealing with family pressure",
  "Having trouble sleeping",
  "Feeling overwhelmed with studies",
  "Relationship problems affecting me"
];

export const aiResponses = {
  anxiety: "I understand you're feeling anxious. This is very common among students. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system and helps calm anxiety.",
  stress: "Academic stress is challenging, especially with the competitive environment in Indian colleges. Remember that your worth isn't defined by grades alone. What specific aspect of your studies is causing the most stress?",
  family: "Family expectations can create significant pressure. It's important to have open communication while also setting healthy boundaries. Would you like to explore some strategies for discussing your concerns with your family?",
  sleep: "Sleep issues often stem from racing thoughts and stress. Consider creating a nighttime routine: no screens 1 hour before bed, practice gratitude journaling, and try progressive muscle relaxation. These techniques are particularly effective for students.",
  overwhelmed: "Feeling overwhelmed is a sign that you might need to reassess your workload and priorities. Let's break down what you're dealing with into manageable pieces. What are your top 3 concerns right now?",
  relationships: "Relationship challenges during college years are normal as you're growing and changing. It's important to maintain healthy boundaries and communication. Would you like to talk about what's specifically troubling you?"
};