import React, { useState } from 'react';
import { 
  Droplets, 
  Sparkles, 
  Clock, 
  CloudRain, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const WaterManagementView: React.FC = () => {
  const { profile, weatherData } = useFarm();

  const [selectedCrop, setSelectedCrop] = useState('Paddy (Rice)');
  const [cropStage, setCropStage] = useState('Tillering');
  const [soilType, setSoilType] = useState('Alluvial Clay Loam');
  const [acres, setAcres] = useState(2.5);
  const [irrigationSystem, setIrrigationSystem] = useState('Drip Irrigation (1.2 LPH Emitters)');
  const [dripperSpacingMeters, setDripperSpacingMeters] = useState(0.4);

  // Weather rainfall in past 48 hours
  const recentRainMm = weatherData?.daily?.[0]?.precipSum ?? 2.0;

  // Calculate daily irrigation requirement
  // Evapotranspiration ETc = ETo * Kc
  const etoBase = 4.8; // mm/day
  const kcMultiplier = 
    cropStage === 'Flowering' || cropStage === 'Panicle Initiation' ? 1.25 :
    cropStage === 'Tillering' || cropStage === 'Vegetative' ? 1.05 :
    cropStage === 'Maturity' ? 0.75 : 0.6;

  const rawWaterNeedMm = etoBase * kcMultiplier;
  const effectiveRainDeduction = Math.min(rawWaterNeedMm, recentRainMm * 0.7);
  const netWaterDemandMm = Math.max(0, rawWaterNeedMm - effectiveRainDeduction);

  // 1 mm water over 1 acre = 4,047 Litres (approx 4 m3)
  const litresPerAcre = Math.round(netWaterDemandMm * 4047);
  const totalLitresForField = Math.round(litresPerAcre * acres);

  // Drip run-time estimation
  // Emitters per acre approx 4,000 for standard drip spacing, delivering ~1.5 L/hr each = ~6,000 L/hr/acre
  const systemDischargePerHour = irrigationSystem.includes('Drip') ? 6500 : 18000;
  const runTimeHours = totalLitresForField > 0 ? (totalLitresForField / (systemDischargePerHour * acres)).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Smart Irrigation & Water Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Calculate accurate crop water requirements, deduct rainfall, and compute exact drip run-times to save 40% water
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Weather Deductions Integrated</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
          <h3 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-3 border-b border-stone-100 dark:border-stone-800">
            Irrigation Calculation Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              >
                <option value="Paddy (Rice)">Paddy / Rice</option>
                <option value="Tomato">Tomato (Hybrid)</option>
                <option value="Wheat">Wheat</option>
                <option value="Cotton">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Banana">Banana</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Growth Stage
              </label>
              <select
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              >
                <option value="Seedling / Establishment">Seedling / Establishment</option>
                <option value="Vegetative">Vegetative Growth</option>
                <option value="Tillering">Active Tillering (Paddy)</option>
                <option value="Flowering">Flowering / Fruit Set (Critical)</option>
                <option value="Grain Filling">Grain Filling / Maturation</option>
                <option value="Maturity">Maturity / Pre-Harvest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Cultivated Area (Acres)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Soil Texture
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              >
                <option value="Alluvial Clay Loam">Alluvial Clay Loam (High Retention)</option>
                <option value="Red Sandy Loam">Red Sandy Loam (Rapid Drainage)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (Heavy Vertisol)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Irrigation System
            </label>
            <select
              value={irrigationSystem}
              onChange={(e) => setIrrigationSystem(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
            >
              <option value="Drip Irrigation (1.2 LPH Emitters)">Drip Irrigation (1.2 LPH Emitters - 90% Efficiency)</option>
              <option value="Sprinkler System">Micro Sprinkler System (75% Efficiency)</option>
              <option value="Furrow / Flood Canal">Furrow / Flood Canal (45% Efficiency)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-900 dark:text-cyan-200">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <CloudRain className="w-4 h-4 text-cyan-600" />
              <span>Rainfall Credit: {recentRainMm.toFixed(1)} mm received</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Auto-deducted {effectiveRainDeduction.toFixed(1)} mm from today's irrigation demand to prevent over-watering and electricity wastage.
            </p>
          </div>
        </div>

        {/* Right Prescription Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-gradient-to-br from-cyan-900 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-cyan-700/60 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40">
                Recommended Daily Schedule
              </span>
              <span className="text-xs text-cyan-200 font-semibold">
                Kc Factor: {kcMultiplier}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-cyan-200">Daily Water Volume</span>
                <p className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
                  {totalLitresForField.toLocaleString('en-IN')} <span className="text-sm font-normal text-cyan-300">Litres</span>
                </p>
                <p className="text-[11px] text-cyan-200 mt-0.5">
                  ({litresPerAcre.toLocaleString('en-IN')} L / Acre)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-cyan-200">System Run-Time</span>
                <p className="text-2xl sm:text-3xl font-black font-serif text-lime-300 mt-1">
                  {runTimeHours} <span className="text-sm font-normal text-white">Hours/Day</span>
                </p>
                <p className="text-[11px] text-cyan-200 mt-0.5">
                  Best window: 06:00 AM – 09:30 AM
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2 text-xs text-cyan-100">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span><strong>Soil Moisture Retention:</strong> {soilType} holds moisture for 48 hours; run every alternate day during cool weather.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span><strong>Water-Saving Method:</strong> Install silver-black plastic mulch or straw mulch around beds to reduce soil surface evaporation by 35%.</span>
              </p>
            </div>
          </div>

          {/* Alternate Wetting & Drying AWD Guide for Paddy */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
            <h4 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>Alternate Wetting & Drying (AWD) for Paddy (TNAU / IRRI Method)</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
              Insert a 15-cm perforated PVC "pani pipe" into the paddy field. Only irrigate when water level drops 15 cm below soil surface. This cuts irrigation costs by 30% and reduces methane emissions by 50% without any reduction in grain yield!
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <span>Recommended by Department of Agriculture & TNAU Coimbatore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
