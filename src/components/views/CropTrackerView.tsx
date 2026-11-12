import React, { useState } from 'react';
import { 
  Sprout, 
  Calendar, 
  Droplets, 
  Bug, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { calculateCropTracking, GrowthStage } from '../../utils/cropTimeline';

export const CropTrackerView: React.FC = () => {
  const { crops, profile } = useFarm();
  const [selectedCropId, setSelectedCropId] = useState<string>(crops[0]?.id || '');

  const activeCrop = crops.find(c => c.id === selectedCropId) || crops[0];

  if (!activeCrop) {
    return (
      <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
        <Sprout className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-stone-800 dark:text-stone-200">
          No Crops Registered Yet
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Please add a crop in "My Farm" first to generate an automated stage timeline.
        </p>
      </div>
    );
  }

  const tracking = calculateCropTracking(activeCrop.cropName, activeCrop.plantingDate, activeCrop.durationDays);

  return (
    <div className="space-y-6">
      {/* Header and Crop Switcher */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Smart Crop Timeline & Stage Tracker
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Dynamic {tracking.durationDays}-day timeline tailored to {activeCrop.cropName} ({activeCrop.variety}) cultivation in {activeCrop.location}
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {crops.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCropId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCrop.id === c.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {c.cropName} ({c.variety.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Crop Summary Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-600/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300 px-2 py-0.5 rounded-full bg-emerald-950/60 inline-block mb-2">
              {activeCrop.status === 'active' ? 'Active In Ground' : activeCrop.status}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {activeCrop.cropName} - {activeCrop.variety}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
              Field: <strong>{activeCrop.plotNumber || activeCrop.farmName}</strong> ({activeCrop.landAreaAcres} Acres) • Sown on <strong>{activeCrop.plantingDate}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-950/60 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-emerald-600/40">
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300">Days Elapsed</p>
              <p className="text-3xl font-black text-lime-300 font-serif">
                Day {tracking.daysElapsed}
              </p>
            </div>
            <div className="h-8 w-px bg-emerald-700" />
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300">To Harvest</p>
              <p className="text-2xl font-black text-white font-serif">
                {tracking.daysRemaining} Days
              </p>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-600/60">
          <div className="flex items-center justify-between text-xs text-emerald-100 font-semibold mb-2">
            <span>Overall Growth Progress</span>
            <span>{tracking.percentComplete}% Complete (Harvest: {tracking.harvestDate})</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-emerald-950/60 overflow-hidden p-0.5 border border-emerald-600/40">
            <div
              className="h-full bg-gradient-to-r from-lime-400 to-emerald-300 rounded-full transition-all duration-700"
              style={{ width: `${tracking.percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Timeline Flow */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 font-serif">
          Growth Stages & Milestone Schedule
        </h3>

        <div className="space-y-4">
          {tracking.stages.map((st: GrowthStage, idx: number) => {
            const isCurrent = tracking.daysElapsed >= st.startDay && tracking.daysElapsed <= st.endDay;
            const isCompleted = tracking.daysElapsed > st.endDay;
            const isUpcoming = tracking.daysElapsed < st.startDay;

            return (
              <div
                key={st.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/70 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : isCompleted
                    ? 'bg-white/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 opacity-90'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-md animate-pulse'
                        : isCompleted
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : `S${idx + 1}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                          {st.name}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white uppercase tracking-wider animate-pulse">
                            Active Current Stage
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        Day {st.startDay} to Day {st.endDay} ({st.endDay - st.startDay} days window)
                      </p>
                    </div>
                  </div>

                  {/* Water badge */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-400">Water Demand:</span>
                    <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                      st.waterRequirement === 'Critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : st.waterRequirement === 'High'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {st.waterRequirement}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {st.description}
                </p>

                {/* Key activities and agronomic reminders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-stone-200/60 dark:border-stone-800 text-xs">
                  {/* Field Activities */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Recommended Field Operations</span>
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-600 dark:text-stone-300">
                      {st.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 shrink-0">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fertilizer Guidance */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Nutrient Application</span>
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                      {st.fertilizerAdvice || 'No heavy chemical split needed; maintain organic soil fertility.'}
                    </p>
                  </div>

                  {/* Pest Watch */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                    <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Bug className="w-3.5 h-3.5" />
                      <span>Pest & Disease Watch</span>
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 font-semibold leading-snug">
                      {st.pestWatch.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
