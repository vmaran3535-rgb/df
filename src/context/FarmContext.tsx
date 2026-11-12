import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerProfile, TrackedCrop, FarmNotification, CommunityPost } from '../types/farm';
import { AgriculturalLocation, PRESET_LOCATIONS, FullWeatherData, fetchLiveOpenMeteoWeather, getFallbackWeatherData } from '../services/weatherService';
import { SupportedLanguage } from '../data/translations';

interface FarmContextType {
  profile: FarmerProfile;
  updateProfile: (profile: Partial<FarmerProfile>) => void;
  crops: TrackedCrop[];
  addCrop: (crop: Omit<TrackedCrop, 'id' | 'createdAt'>) => void;
  updateCrop: (id: string, updates: Partial<TrackedCrop>) => void;
  deleteCrop: (id: string) => void;
  notifications: FarmNotification[];
  markNotificationCompleted: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  selectedLocation: AgriculturalLocation;
  setSelectedLocation: (loc: AgriculturalLocation) => void;
  weatherData: FullWeatherData | null;
  isLoadingWeather: boolean;
  refreshWeather: () => void;
  selectedCalendarDate: string; // YYYY-MM-DD
  setSelectedCalendarDate: (date: string) => void;
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'likedByMe' | 'replies'>) => void;
  likeCommunityPost: (postId: string) => void;
  addPostReply: (postId: string, content: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  tempUnit: 'C' | 'F';
  setTempUnit: (unit: 'C' | 'F') => void;
  priceUnit: 'quintal' | 'kg';
  setPriceUnit: (unit: 'quintal' | 'kg') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  detectGpsLocation: () => Promise<void>;
  locationStatusMsg: string;
}

const DEFAULT_PROFILE: FarmerProfile = {
  id: 'farmer-001',
  name: 'K. Murugesan',
  phone: '+91 98421 54321',
  farmName: 'Cauvery Bio-Green Farms',
  locationVillage: 'Papanasam',
  district: 'Thanjavur',
  state: 'Tamil Nadu',
  landAreaAcres: 4.5,
  primaryCrops: ['Paddy', 'Tomato', 'Coconut'],
  soilType: 'Alluvial Clay Loam',
  irrigationSource: 'Borewell & River Canal'
};

const DEFAULT_CROPS: TrackedCrop[] = [
  {
    id: 'crop-paddy-samba',
    cropName: 'Paddy',
    variety: 'BPT 5204 (Samba Mahsuri)',
    farmName: 'Cauvery Bio-Green Farms',
    plotNumber: 'Plot 1 - North Canal Field',
    plantingDate: '2026-10-15',
    durationDays: 135,
    landAreaAcres: 3.0,
    soilType: 'Alluvial Clay Loam',
    irrigationMethod: 'Alternate Wetting & Drying (AWD)',
    location: 'Papanasam, Thanjavur',
    status: 'active',
    notes: 'Transplanted using modified SRI system. Second top dressing completed.',
    createdAt: '2026-10-15T08:00:00Z'
  },
  {
    id: 'crop-tomato-winter',
    cropName: 'Tomato',
    variety: 'Arka Rakshak (Triple Resistant Hybrid)',
    farmName: 'Cauvery Bio-Green Farms',
    plotNumber: 'Plot 2 - Drip Poly Bed',
    plantingDate: '2026-10-28',
    durationDays: 115,
    landAreaAcres: 1.5,
    soilType: 'Red Sandy Loam',
    irrigationMethod: 'Inline Drip System with Mulch',
    location: 'Papanasam, Thanjavur',
    status: 'active',
    notes: 'Staking completed. Early flower clusters emerging.',
    createdAt: '2026-10-28T09:30:00Z'
  }
];

const DEFAULT_NOTIFICATIONS: FarmNotification[] = [
  {
    id: 'notif-1',
    title: 'Fertilizer Top-Dressing Window (Day 28 - Active Tillering)',
    date: 'Today, 07:00 AM',
    cropName: 'Paddy (BPT 5204)',
    category: 'fertilizer',
    priority: 'high',
    reason: 'Active tillering stage requires Nitrogen boost for maximum productive tillers.',
    recommendedAction: 'Broadcast 25 kg Urea + 15 kg MOP per acre. Soil should be moist without standing excess water.',
    status: 'unread'
  },
  {
    id: 'notif-2',
    title: 'Pest Inspection Alert: Stem Borer & Leaf Folder',
    date: 'Yesterday',
    cropName: 'Paddy (BPT 5204)',
    category: 'pest',
    priority: 'medium',
    reason: 'Cloudy weather increases Yellow Stem Borer moth emergence.',
    recommendedAction: 'Check 20 random hills for dead hearts or leaf fold symptoms. Deploy 5 pheromone traps.',
    status: 'unread'
  },
  {
    id: 'notif-3',
    title: 'Tomato Calcium Nitrate Fertigation Due',
    date: 'Nov 10, 2026',
    cropName: 'Tomato (Arka Rakshak)',
    category: 'fertilizer',
    priority: 'medium',
    reason: 'Prevent blossom end rot and build sturdy cell walls during early flowering.',
    recommendedAction: 'Inject 2 kg Calcium Nitrate + 200g Solubor through drip venturi.',
    status: 'read'
  },
  {
    id: 'notif-4',
    title: 'Weather Alert: 40% Rain Probability Tomorrow',
    date: 'Nov 12, 2026',
    cropName: 'All Farm Plots',
    category: 'weather',
    priority: 'low',
    reason: 'Coastal low pressure creating scattered afternoon convective showers.',
    recommendedAction: 'Hold scheduled heavy flood irrigation and foliar pesticide spraying.',
    status: 'unread'
  }
];

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'R. Soundararajan',
    authorLocation: 'Mannargudi, Tiruvarur',
    authorRole: 'Progressive Paddy Farmer (8 Acres)',
    title: 'Successful Bio-Control of Rice Stem Borer with Trichogramma Cards',
    content: 'Fellow farmers, I tried Trichogramma japonicum egg parasitoid cards (2 cc/acre) instead of chemical chlorantraniliprole spray this Samba season. Within 10 days, dead heart symptoms reduced by 85% and cost me only ₹120 per acre. Highly recommended for Cauvery delta farmers!',
    cropTag: 'Paddy',
    topicTag: 'Organic Farming',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    timestamp: '3 hours ago',
    likesCount: 24,
    likedByMe: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'M. Selvakumar',
        authorLocation: 'Mayiladuthurai',
        content: 'Excellent sharing sir! Where did you purchase the egg cards? Is it available at TNAU KVK Sikkal?',
        timestamp: '1 hour ago'
      },
      {
        id: 'rep-2',
        authorName: 'R. Soundararajan',
        authorLocation: 'Mannargudi',
        content: 'Yes! TNAU KVK Sikkal or state bio-control lab in Needamangalam supplies fresh cards on Tuesdays.',
        timestamp: '40 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Balwinder Singh Dhillon',
    authorLocation: 'Jagraon, Ludhiana',
    authorRole: 'Wheat & Mustard Grower',
    title: 'Super Seeder vs Happy Seeder for Direct Sowing in Standing Stubble',
    content: 'We finished 25 acres of wheat sowing using Super Seeder with zero stubble burning. Diesel consumption was about 7.5 litres per acre. Seed germination is 96% and the standing residue acts as a temperature blanket against cold waves. Anyone needing custom hiring in Ludhiana belt, feel free to connect.',
    cropTag: 'Wheat',
    topicTag: 'Machinery',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    timestamp: 'Yesterday',
    likesCount: 38,
    likedByMe: false,
    replies: [
      {
        id: 'rep-3',
        authorName: 'Harpreet Gill',
        authorLocation: 'Kapurthala',
        content: 'Did you apply basal DAP at 55kg? How deep does the coulter place the seed?',
        timestamp: '5 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Santosh Patil',
    authorLocation: 'Niphad, Nashik',
    authorRole: 'Horticulture & Onion Specialist',
    title: 'Lasalgaon Onion Mandi Arrival Trend & Winter Storage Advice',
    content: 'Red onion arrivals are stabilizing around ₹3,200 to ₹3,400 per quintal. Do not sell in panic. Ensure your chawl (storage shed) has 1.5-foot raised mesh flooring and good cross-ventilation. Treat bulbs with 0.1% carbendazim spray 15 days before harvest to prevent black mold.',
    cropTag: 'Onion',
    topicTag: 'Market Price',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    timestamp: '2 days ago',
    likesCount: 52,
    likedByMe: true,
    replies: []
  }
];

const FarmContext = createContext<FarmContextType | null>(null);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('df_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [crops, setCrops] = useState<TrackedCrop[]>(() => {
    const saved = localStorage.getItem('df_crops');
    return saved ? JSON.parse(saved) : DEFAULT_CROPS;
  });

  const [notifications, setNotifications] = useState<FarmNotification[]>(() => {
    const saved = localStorage.getItem('df_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('df_community_posts');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  const [selectedLocation, setSelectedLocation] = useState<AgriculturalLocation>(PRESET_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [locationStatusMsg, setLocationStatusMsg] = useState('');

  // Selected date for interactive calendar weather review
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('df_lang') as SupportedLanguage) || 'en';
  });

  const [tempUnit, setTempUnitState] = useState<'C' | 'F'>(() => {
    return (localStorage.getItem('df_temp_unit') as 'C' | 'F') || 'C';
  });

  const [priceUnit, setPriceUnitState] = useState<'quintal' | 'kg'>(() => {
    return (localStorage.getItem('df_price_unit') as 'quintal' | 'kg') || 'quintal';
  });

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    return localStorage.getItem('df_dark') === 'true';
  });

  // Save changes
  useEffect(() => {
    localStorage.setItem('df_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('df_crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('df_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('df_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('df_lang', lang);
  };

  const setTempUnit = (unit: 'C' | 'F') => {
    setTempUnitState(unit);
    localStorage.setItem('df_temp_unit', unit);
  };

  const setPriceUnit = (unit: 'quintal' | 'kg') => {
    setPriceUnitState(unit);
    localStorage.setItem('df_price_unit', unit);
  };

  const setIsDarkMode = (dark: boolean) => {
    setIsDarkModeState(dark);
    localStorage.setItem('df_dark', String(dark));
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Sync dark class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Weather loader
  const loadWeather = async (loc: AgriculturalLocation) => {
    setIsLoadingWeather(true);
    try {
      const data = await fetchLiveOpenMeteoWeather(loc);
      setWeatherData(data);
    } catch {
      setWeatherData(getFallbackWeatherData(loc));
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation);
  }, [selectedLocation]);

  const refreshWeather = () => {
    loadWeather(selectedLocation);
  };

  // GPS Geolocation detection
  const detectGpsLocation = async () => {
    if (!('geolocation' in navigator)) {
      setLocationStatusMsg('Geolocation is not supported by your browser.');
      return;
    }
    setLocationStatusMsg('Detecting farm GPS location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const gpsLoc: AgriculturalLocation = {
          id: 'gps-current',
          name: `My Farm GPS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
          district: 'Local Agro-Zone',
          state: 'Current GPS',
          lat: latitude,
          lon: longitude,
          agriZone: 'Geo-located Farm Plot'
        };
        setSelectedLocation(gpsLoc);
        setLocationStatusMsg('Farm GPS located successfully!');
        setTimeout(() => setLocationStatusMsg(''), 4000);
      },
      (err) => {
        console.warn('GPS location error:', err);
        setLocationStatusMsg('Could not fetch GPS location. Please select your district from the dropdown.');
        setTimeout(() => setLocationStatusMsg(''), 4000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const updateProfile = (updates: Partial<FarmerProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addCrop = (cropData: Omit<TrackedCrop, 'id' | 'createdAt'>) => {
    const newCrop: TrackedCrop = {
      ...cropData,
      id: `crop-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCrops(prev => [newCrop, ...prev]);

    // Add milestone notification
    const newNotif: FarmNotification = {
      id: `notif-${Date.now()}`,
      title: `Crop Added: ${newCrop.cropName} (${newCrop.variety})`,
      date: 'Just now',
      cropName: newCrop.cropName,
      category: 'general',
      priority: 'medium',
      reason: 'New crop tracker active. Timeline and automated agricultural advisories generated.',
      recommendedAction: 'Verify nursery establishment, check soil moisture, and prepare basal manure.',
      status: 'unread'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateCrop = (id: string, updates: Partial<TrackedCrop>) => {
    setCrops(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCrop = (id: string) => {
    setCrops(prev => prev.filter(c => c.id !== id));
  };

  const markNotificationCompleted = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
  };

  const addCommunityPost = (postData: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'likedByMe' | 'replies'>) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 0,
      likedByMe: false,
      replies: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const likeCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = !p.likedByMe;
      return {
        ...p,
        likedByMe: liked,
        likesCount: liked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
      };
    }));
  };

  const addPostReply = (postId: string, content: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        replies: [
          ...p.replies,
          {
            id: `rep-${Date.now()}`,
            authorName: profile.name,
            authorLocation: `${profile.locationVillage}, ${profile.district}`,
            content,
            timestamp: 'Just now'
          }
        ]
      };
    }));
  };

  return (
    <FarmContext.Provider
      value={{
        profile,
        updateProfile,
        crops,
        addCrop,
        updateCrop,
        deleteCrop,
        notifications,
        markNotificationCompleted,
        dismissNotification,
        markAllNotificationsRead,
        selectedLocation,
        setSelectedLocation,
        weatherData,
        isLoadingWeather,
        refreshWeather,
        selectedCalendarDate,
        setSelectedCalendarDate,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        addPostReply,
        language,
        setLanguage,
        tempUnit,
        setTempUnit,
        priceUnit,
        setPriceUnit,
        isDarkMode,
        setIsDarkMode,
        detectGpsLocation,
        locationStatusMsg,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within FarmProvider');
  }
  return context;
}
