import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Play, 
  X, 
  ExternalLink, 
  Clock, 
  Eye, 
  BookOpen, 
  Sparkles,
  Share2
} from 'lucide-react';
import { AGRI_VIDEOS, AgriVideo } from '../../data/learningVideos';

export const LearningCentreView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<AgriVideo | null>(null);

  const categories = ['All', 'Paddy', 'Vegetables', 'Organic', 'Irrigation', 'Soil', 'Pest', 'Machinery', 'Schemes'];
  const languages = ['All', 'Tamil', 'Hindi', 'English'];

  const filteredVideos = AGRI_VIDEOS.filter((v) => {
    const matchesSearch = 
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.channelName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesLang = selectedLanguage === 'All' || v.language === selectedLanguage;
    return matchesSearch && matchesCat && matchesLang;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Agriculture Learning Centre & Video Library
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Curated practical video tutorials from ICAR, TNAU, and progressive farmers in Tamil, Hindi & English
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {filteredVideos.length} Video Lessons
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tutorials (e.g. Drip irrigation, Paddy blast, Jeevamrutham, PM Kisan)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
            <span className="text-xs text-stone-400 font-bold">Audio:</span>
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setSelectedLanguage(l)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedLanguage === l
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-bold shrink-0">Topic:</span>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail with duration badge and play hover */}
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/40 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-[10px] font-bold">
                  {video.duration}
                </span>
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-wider">
                  {video.category}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold">
                  {video.language}
                </span>
              </div>

              {/* Title and Channel */}
              <div className="p-4">
                <h3 
                  className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug hover:text-emerald-600 cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  {video.title}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                  {video.channelName}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Footer with view button */}
            <div className="p-4 pt-0 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Watch Lesson</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-5 top-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 pr-10 mb-2 font-serif">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Channel: <strong>{activeVideo.channelName}</strong> • Category: {activeVideo.category} • Audio: {activeVideo.language}
            </p>

            {/* Embedded YouTube / Responsive Player Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
