import React, { useState } from 'react';
import { 
  CalendarRange, 
  Sparkles, 
  Filter, 
  MapPin, 
  Droplets, 
  Layers, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Sun,
  CloudRain,
  Leaf
} from 'lucide-react';
import { SEASONAL_RECOMMENDATIONS, BEST_FARMING_IDEAS_NOVEMBER, SeasonalCropRecommendation } from '../../data/seasonalCrops';
import { INDIAN_STATES } from '../../data/marketPrices';

export const SeasonalRecommendationsView: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [waterFilter, setWaterFilter] = useState<string>('All');

  const filteredCrops = SEASONAL_RECOMMENDATIONS.filter((item) => {
    const matchesSeason = selectedSeason === 'All' || item.season === selectedSeason;
    const matchesState = selectedState === 'All States' || item.targetStates.includes(selectedState);
    const matchesWater = waterFilter === 'All' || item.waterRequirements === waterFilter;
    return matchesSeason && matchesState && matchesWater;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarRange className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Seasonal Crop Recommendations & Agronomic Calendar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tailored crop selection for Kharif, Rabi, and Zaid seasons across Tamil Nadu and Indian agro-climatic zones
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Current: Rabi Season 2026</span>
          </span>
        </div>
      </div>

      {/* Special Feature: Best Farming Ideas This Month (November) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/60 relative overflow-hidden">
        <div className="relative z-10 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-2 border border-lime-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Agronomic Focus</span>
          </div>
          <h3 className="text-2xl font-extrabold font-serif text-white">
            Best Farming Ideas This Month (November)
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
            Crucial cultivation steps for Indian farmers this month across major agricultural belts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {BEST_FARMING_IDEAS_NOVEMBER.map((idea, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-lime-400 text-emerald-950 mb-2 inline-block">
                  {idea.tag}
                </span>
                <h4 className="font-bold text-sm text-white mb-1.5 leading-snug">
                  {idea.title}
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
                  {idea.description}
                </p>
              </div>

              <div className="border-t border-white/15 pt-2 space-y-1 text-[11px] text-emerald-200">
                {idea.actionItems.map((act, i) => (
                  <p key={i} className="flex items-start gap-1.5">
                    <span className="text-lime-300 font-bold shrink-0">✓</span>
                    <span>{act}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Season Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-bold shrink-0">Season:</span>
          {['All', 'Rabi', 'Kharif', 'Zaid'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSeason(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedSeason === s
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>State:</span>
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Water Demand Filter */}
          <select
            value={waterFilter}
            onChange={(e) => setWaterFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Water Levels</option>
            <option value="Low">Low Water / Rainfed</option>
            <option value="Moderate">Moderate Water</option>
            <option value="High">High Water (Paddy)</option>
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    crop.season === 'Rabi'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : crop.season === 'Kharif'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {crop.season} Season
                  </span>
                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-white mt-1.5 font-serif">
                    {crop.cropName}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {crop.tamilName} • {crop.hindiName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-bold">Profit Potential</span>
                  <p className="text-sm font-extrabold text-emerald-700 dark:text-lime-300 font-serif">
                    {crop.estimatedProfitAcre}
                  </p>
                  <p className="text-[10px] text-stone-400">per acre</p>
                </div>
              </div>

              {/* Quick Details Table */}
              <div className="space-y-2 text-xs py-3 border-y border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Planting Window:</span>
                  <strong className="text-stone-800 dark:text-stone-200">{crop.suitableMonths}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Duration:</span>
                  <strong className="text-stone-800 dark:text-stone-200">{crop.growingDuration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Yield Expectation:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">{crop.yieldPotential}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Water Demand:</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    crop.waterRequirements === 'High' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {crop.waterRequirements}
                  </span>
                </div>
              </div>

              {/* Soil & Climate Requirements */}
              <div className="py-3 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <p>
                  <strong className="text-stone-800 dark:text-stone-200">Soil:</strong> {crop.soilRequirements}
                </p>
                <p>
                  <strong className="text-stone-800 dark:text-stone-200">Climate:</strong> {crop.suitableClimate}
                </p>
              </div>

              {/* Challenges */}
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 mb-3">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Key Agronomic Challenges</span>
                </span>
                <ul className="text-[11px] text-stone-600 dark:text-stone-300 space-y-0.5">
                  {crop.potentialChallenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Target States tags */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-stone-400 font-semibold">Recommended for:</span>
              {crop.targetStates.map((st) => (
                <span key={st} className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                  {st}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
