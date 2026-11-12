import React, { useState } from 'react';
import { 
  Tractor, 
  Sprout, 
  Plus, 
  Calendar, 
  MapPin, 
  Droplets, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle, 
  Trash2, 
  Clock, 
  CheckCheck,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { calculateCropTracking } from '../../utils/cropTimeline';
import { ActiveTab } from '../Sidebar';

interface MyFarmViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddCropModal: () => void;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({ setActiveTab, onOpenAddCropModal }) => {
  const { profile, crops, updateCrop, deleteCrop } = useFarm();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'harvested'>('all');

  const filteredCrops = crops.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const totalAcres = crops.reduce((sum, c) => sum + (c.landAreaAcres || 0), 0);
  const activeCount = crops.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Farm Overview Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/60 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-lime-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Tractor className="w-4 h-4" />
              <span>Digital Farm Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {profile.farmName}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 flex items-center gap-2">
              <span>{profile.locationVillage}, {profile.district}, {profile.state}</span>
              <span>•</span>
              <span>Owner: <strong>{profile.name}</strong></span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddCropModal}
              className="px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New Crop Tracker</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('crop-tracker')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600/60 transition flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-lime-300" />
              <span>View Interactive Timelines</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60 relative z-10 text-xs">
          <div>
            <span className="text-emerald-300">Total Cultivated Area</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{totalAcres.toFixed(1)} Acres</p>
          </div>
          <div>
            <span className="text-emerald-300">Active Crop Trackers</span>
            <p className="text-lg font-extrabold text-lime-300 mt-0.5">{activeCount} Crops in Ground</p>
          </div>
          <div>
            <span className="text-emerald-300">Primary Soil Type</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{profile.soilType}</p>
          </div>
          <div>
            <span className="text-emerald-300">Irrigation Source</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{profile.irrigationSource}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Crop Count */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(['all', 'active', 'paused', 'harvested'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                filterStatus === st
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {st} ({crops.filter(c => st === 'all' ? true : c.status === st).length})
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenAddCropModal}
          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>+ Add Another Plot / Crop</span>
        </button>
      </div>

      {/* Crops Cards List */}
      <div className="space-y-4">
        {filteredCrops.map((crop) => {
          const tracking = calculateCropTracking(crop.cropName, crop.plantingDate, crop.durationDays);

          return (
            <div
              key={crop.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Crop Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Sprout className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-stone-900 dark:text-white font-serif">
                        {crop.cropName}
                      </h3>
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        ({crop.variety})
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        crop.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : crop.status === 'paused'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                      }`}>
                        {crop.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 flex flex-wrap items-center gap-2">
                      <span>{crop.plotNumber || crop.farmName}</span>
                      <span>•</span>
                      <span>{crop.landAreaAcres} Acres</span>
                      <span>•</span>
                      <span>Planted: <strong>{crop.plantingDate}</strong></span>
                      <span>•</span>
                      <span>Expected Harvest: <strong>{tracking.harvestDate}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex items-center gap-2 self-start lg:self-auto">
                  {crop.status === 'active' ? (
                    <button
                      type="button"
                      onClick={() => updateCrop(crop.id, { status: 'paused' })}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 text-stone-700 dark:text-stone-300 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Pause Tracker</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => updateCrop(crop.id, { status: 'active' })}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 text-stone-700 dark:text-stone-300 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Resume</span>
                    </button>
                  )}

                  {crop.status !== 'harvested' && (
                    <button
                      type="button"
                      onClick={() => updateCrop(crop.id, { status: 'harvested' })}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Harvested</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteCrop(crop.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Delete Tracker"
                    aria-label="Delete Tracker"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress and Growth Stage Bar */}
              <div className="mt-5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                      Current Stage: {tracking.activeStage.name}
                    </span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {tracking.activeStage.description}
                    </p>
                  </div>
                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
                      Day {tracking.daysElapsed} of {tracking.durationDays}
                    </span>
                    <span className="text-xs font-normal text-stone-400 ml-1.5">
                      ({tracking.daysRemaining} days left)
                    </span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 rounded-full transition-all duration-700"
                    style={{ width: `${tracking.percentComplete}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">Water Need:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                      tracking.activeStage.waterRequirement === 'Critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : tracking.activeStage.waterRequirement === 'High'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {tracking.activeStage.waterRequirement}
                    </span>
                  </div>

                  {tracking.activeStage.fertilizerAdvice && (
                    <div className="text-stone-600 dark:text-stone-300 truncate max-w-md">
                      <strong className="text-emerald-700 dark:text-emerald-400">Fertilizer Dose:</strong> {tracking.activeStage.fertilizerAdvice}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveTab('crop-tracker')}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Open Detailed Stage Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reminders & Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                    Watering Schedule
                  </span>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 mt-1">
                    {crop.irrigationMethod}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Maintain optimal soil moisture. Avoid standing water during maturity.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                    Nutrient Top-Dressing
                  </span>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 mt-1">
                    {tracking.activeStage.fertilizerAdvice ? 'Dose Active' : 'Maintain Soil Health'}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Broadcast or fertigate when soil is in moist condition.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase">
                    Pest & Disease Watch
                  </span>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 mt-1">
                    {tracking.activeStage.pestWatch.join(', ')}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Inspect 20 random plants weekly for early symptoms.
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCrops.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
            <Sprout className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h4 className="font-bold text-base text-stone-800 dark:text-stone-200">
              No crops found in this category
            </h4>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Click the button below to add your current crop and start automated timeline tracking.
            </p>
            <button
              type="button"
              onClick={onOpenAddCropModal}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
            >
              + Add New Crop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
