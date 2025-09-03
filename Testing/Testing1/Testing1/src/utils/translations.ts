export const translations = {
  en: {
    nav: {
      home: 'Home',
      chat: 'AI Assistant',
      assessment: 'Assessment',
      counselors: 'Counselors',
      community: 'Community',
      resources: 'Resources',
      admin: 'Admin'
    },
    crisis: {
      hotline: 'Crisis Hotline: 1800-599-0019',
      title: 'We\'re Here to Help',
      message: 'If you\'re having thoughts of self-harm or suicide, please reach out immediately.',
      button: 'Get Help Now'
    },
    hero: {
      title: 'Your Mental Health Matters',
      subtitle: 'Professional psychological support designed specifically for Indian college students',
      cta: 'Start Your Wellness Journey'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      chat: 'AI सहायक',
      assessment: 'मूल्यांकन',
      counselors: 'काउंसलर',
      community: 'समुदाय',
      resources: 'संसाधन',
      admin: 'एडमिन'
    },
    crisis: {
      hotline: 'संकट हॉटलाइन: 1800-599-0019',
      title: 'हम आपकी मदद के लिए यहाँ हैं',
      message: 'यदि आप आत्म-हानि या आत्महत्या के विचार रख रहे हैं, तो कृपया तुरंत संपर्क करें।',
      button: 'अभी मदद लें'
    },
    hero: {
      title: 'आपका मानसिक स्वास्थ्य महत्वपूर्ण है',
      subtitle: 'भारतीय कॉलेज छात्रों के लिए विशेष रूप से डिज़ाइन किया गया पेशेवर मनोवैज्ञानिक समर्थन',
      cta: 'अपनी कल्याण यात्रा शुरू करें'
    }
  },
  ta: {
    nav: {
      home: 'முகப்பு',
      chat: 'AI உதவியாளர்',
      assessment: 'மதிப்பீடு',
      counselors: 'ஆலோசகர்கள்',
      community: 'சமூகம்',
      resources: 'வளங்கள்',
      admin: 'நிர்வாகம்'
    },
    crisis: {
      hotline: 'நெருக்கடி ஹாட்லைன்: 1800-599-0019',
      title: 'நாங்கள் உங்களுக்கு உதவ இங்கே இருக்கிறோம்',
      message: 'நீங்கள் சுய-தீங்கு அல்லது தற்கொலை எண்ணங்களை கொண்டிருந்தால், தயவுசெய்து உடனடியாக தொடர்பு கொள்ளுங்கள்.',
      button: 'இப்போதே உதவி பெறுங்கள்'
    },
    hero: {
      title: 'உங்கள் மனநலம் முக்கியம்',
      subtitle: 'இந்திய கல்லூரி மாணவர்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட தொழில்முறை உளவியல் ஆதரவு',
      cta: 'உங்கள் நல்வாழ்வு பயணத்தைத் தொடங்குங்கள்'
    }
  }
};

export const getTranslation = (key: string, language: 'en' | 'hi' | 'ta') => {
  const keys = key.split('.');
  let value: string | Record<string, unknown> = translations[language];
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
};