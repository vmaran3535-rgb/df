import { GrowthStage } from '../utils/cropTimeline';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  farmName: string;
  locationVillage: string;
  district: string;
  state: string;
  landAreaAcres: number;
  primaryCrops: string[];
  soilType: string;
  irrigationSource: string;
}

export interface TrackedCrop {
  id: string;
  cropName: string; // 'Paddy', 'Wheat', 'Tomato', 'Cotton', 'Sugarcane', etc.
  variety: string;
  farmName: string;
  plotNumber?: string;
  plantingDate: string; // YYYY-MM-DD
  durationDays: number;
  landAreaAcres: number;
  soilType: string;
  irrigationMethod: string;
  location: string;
  status: 'active' | 'paused' | 'harvested';
  notes?: string;
  createdAt: string;
}

export interface FarmNotification {
  id: string;
  title: string;
  date: string;
  cropName: string;
  category: 'watering' | 'fertilizer' | 'pest' | 'weather' | 'harvest' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reason: string;
  recommendedAction: string;
  status: 'unread' | 'read' | 'completed' | 'dismissed';
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorLocation: string;
  authorRole: string;
  title: string;
  content: string;
  cropTag: string;
  topicTag: 'Pest Control' | 'Organic Farming' | 'Irrigation' | 'Market Price' | 'Machinery' | 'Government Subsidy';
  imageUrl?: string;
  timestamp: string;
  likesCount: number;
  likedByMe: boolean;
  replies: {
    id: string;
    authorName: string;
    authorLocation: string;
    content: string;
    timestamp: string;
  }[];
}
