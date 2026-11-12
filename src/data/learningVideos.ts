export interface AgriVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  channelName: string;
  category: 'Paddy' | 'Vegetables' | 'Organic' | 'Irrigation' | 'Soil' | 'Pest' | 'Machinery' | 'Schemes';
  language: 'Tamil' | 'Hindi' | 'English' | 'Telugu';
  duration: string;
  thumbnailUrl: string;
  views: string;
}

export const AGRI_VIDEOS: AgriVideo[] = [
  {
    id: 'vid-paddy-samba',
    title: 'Modern Paddy Cultivation & High Yield Techniques (SRI & Direct Seeding)',
    description: 'Complete guide on nursery management, machine transplanting, water saving, and pest control for paddy farmers.',
    youtubeId: 'q8M0rN9s5rQ', // Standard agri tutorial reference
    channelName: 'Tamil Nadu Agricultural University (TNAU)',
    category: 'Paddy',
    language: 'Tamil',
    duration: '14:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    views: '240K views'
  },
  {
    id: 'vid-drip-irrigation',
    title: 'Drip Irrigation Setup, Fertigation Venturi & 50% Water Saving Method',
    description: 'How to install sub-main lines, emitters, filter cleaning, and liquid fertilizer injection for horticultural crops.',
    youtubeId: 'V9aQZgN4d_A',
    channelName: 'AgroTech India & Jain Irrigation',
    category: 'Irrigation',
    language: 'English',
    duration: '11:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
    views: '185K views'
  },
  {
    id: 'vid-jeevamrutham-organic',
    title: 'How to Prepare Jeevamrutham & Panchagavya - Subhash Palekar ZBNF Method',
    description: 'Organic bio-fertilizer preparation using desi cow dung, urine, jaggery, gram flour, and virgin soil for soil biology revival.',
    youtubeId: 'M7lc1UVf-VE',
    channelName: 'Natural Farming Tamil Nadu',
    category: 'Organic',
    language: 'Tamil',
    duration: '18:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=600&q=80',
    views: '410K views'
  },
  {
    id: 'vid-tomato-staking',
    title: 'High Density Tomato Farming: Trellising, Pruning & Disease Control',
    description: 'Step-by-step commercial tomato cultivation from nursery grafting to 200 quintals per acre harvest.',
    youtubeId: 'kJQP7kiw5Fk',
    channelName: 'Kisan Tak / ICAR Horti',
    category: 'Vegetables',
    language: 'Hindi',
    duration: '16:05',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    views: '320K views'
  },
  {
    id: 'vid-pm-kisan-apply',
    title: 'PM-KISAN e-KYC, Status Check & 6000 Subsidy Application Process 2026',
    description: 'Official procedure to update Aadhaar linkage, land records, bank account seeding, and resolve installment holds.',
    youtubeId: 'fJ9rUzIMcZQ',
    channelName: 'Digital Kisan Yojana Guide',
    category: 'Schemes',
    language: 'Hindi',
    duration: '09:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=600&q=80',
    views: '580K views'
  },
  {
    id: 'vid-soil-test-npk',
    title: 'Soil Health Card Interpretation: Correcting Alkaline & Acidic Soil',
    description: 'How to understand your soil test report, calculate exact Urea/DAP requirements, and add gypsum or dolomite lime.',
    youtubeId: '2Vv-BfVoq4g',
    channelName: 'Krishi Vigyan Kendra (KVK)',
    category: 'Soil',
    language: 'English',
    duration: '13:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    views: '95K views'
  },
  {
    id: 'vid-pest-ipm-neem',
    title: 'Neem Oil 10000 PPM Spraying & Pheromone Traps for Pest Management',
    description: 'Non-chemical insect management for fruit borer, leaf curl virus vector, and stem borer without killing honeybees.',
    youtubeId: 'ZbZSe6N_BXs',
    channelName: 'Uzhavan Vivasayam TV',
    category: 'Pest',
    language: 'Tamil',
    duration: '12:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    views: '160K views'
  },
  {
    id: 'vid-smart-farm-drone',
    title: 'Agricultural Drone Spraying & Boom Sprayer Subsidies under SMAM',
    description: 'How agricultural drones cover 1 acre in 7 minutes with 90% water saving and government 50% subsidy schemes.',
    youtubeId: 'L_LUpnjgPso',
    channelName: 'AgriMachinery India',
    category: 'Machinery',
    language: 'English',
    duration: '10:50',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    views: '140K views'
  }
];
