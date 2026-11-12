import React, { useState } from 'react';
import { X, Sprout, Calendar, MapPin, Layers, Droplets, Ruler, CheckCircle2 } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { CROP_PROFILES } from '../../utils/cropTimeline';

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCropModal: React.FC<AddCropModalProps> = ({ isOpen, onClose }) => {
  const { addCrop, profile } = useFarm();

  const [cropName, setCropName] = useState('Paddy');
  const [variety, setVariety] = useState('BPT 5204 (Samba Mahsuri)');
  const [farmName, setFarmName] = useState(profile.farmName || 'Cauvery Delta Farm');
  const [plotNumber, setPlotNumber] = useState('Plot 3 - Canal West');
  const [plantingDate, setPlantingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [durationDays, setDurationDays] = useState(120);
  const [landAreaAcres, setLandAreaAcres] = useState(2.0);
  const [soilType, setSoilType] = useState('Alluvial Clay Loam');
  const [irrigationMethod, setIrrigationMethod] = useState('Alternate Wetting & Drying (AWD)');
  const [location, setLocation] = useState(`${profile.locationVillage || 'Papanasam'}, ${profile.district || 'Thanjavur'}`);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleCropTypeChange = (selected: string) => {
    setCropName(selected);
    const profile = CROP_PROFILES[selected];
    if (profile) {
      setDurationDays(profile.defaultDurationDays);
    }
    if (selected === 'Paddy') {
      setVariety('BPT 5204 (Samba Mahsuri)');
    } else if (selected === 'Wheat') {
      setVariety('HD 2967 / DBW 187');
    } else if (selected === 'Tomato') {
      setVariety('Arka Rakshak / Abhinav');
    } else if (selected === 'Cotton') {
      setVariety('Bt Cotton Hybrid RCH 659');
    } else if (selected === 'Sugarcane') {
      setVariety('Co 0238 / Co 86032');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrop({
      cropName,
      variety,
      farmName,
      plotNumber,
      plantingDate,
      durationDays: Number(durationDays),
      landAreaAcres: Number(landAreaAcres),
      soilType,
      irrigationMethod,
      location,
      status: 'active',
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 text-white flex items-center justify-center shadow-md">
            <Sprout className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-stone-900 dark:text-stone-100 font-serif">
              Add New Crop Tracker
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Create an automated agronomic calendar tailored to your crop variety & region
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Crop Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Crop Name *
              </label>
              <select
                value={cropName}
                onChange={(e) => handleCropTypeChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Paddy">Paddy / Rice (Oryza sativa)</option>
                <option value="Wheat">Wheat (Triticum aestivum)</option>
                <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                <option value="Cotton">Cotton (Gossypium hirsutum)</option>
                <option value="Sugarcane">Sugarcane (Saccharum officinarum)</option>
              </select>
            </div>

            {/* Variety */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Crop Variety / Hybrid *
              </label>
              <input
                type="text"
                required
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. BPT 5204, Arka Rakshak"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Planting Date */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sowing / Planting Date *</span>
              </label>
              <input
                type="date"
                required
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Duration Days */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Total Crop Duration (Days) *
              </label>
              <input
                type="number"
                min="30"
                max="400"
                required
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Land Area */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-emerald-600" />
                <span>Land Area (Acres) *</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={landAreaAcres}
                onChange={(e) => setLandAreaAcres(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Plot Name / Farm Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Plot / Field Identifier
              </label>
              <input
                type="text"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                placeholder="e.g. Plot 1 North, Field A"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Soil Type</span>
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Alluvial Clay Loam">Alluvial Clay Loam (Delta)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (Vertisol)</option>
                <option value="Red Sandy Loam">Red Sandy Loam</option>
                <option value="Clayey Loam">Heavy Clayey Loam</option>
                <option value="Laterite Soil">Laterite Soil</option>
              </select>
            </div>

            {/* Irrigation Method */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Irrigation Method</span>
              </label>
              <select
                value={irrigationMethod}
                onChange={(e) => setIrrigationMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Alternate Wetting & Drying (AWD)">Alternate Wetting & Drying (AWD)</option>
                <option value="Inline Drip System with Mulch">Inline Drip System with Mulch</option>
                <option value="Canal Flood Irrigation">Canal Flood Irrigation</option>
                <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                <option value="Rainfed / Residual Moisture">Rainfed / Residual Moisture</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Village & District Location</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Papanasam, Thanjavur"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Farming Notes / Target Yield
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Applied FYM 5 tonnes/acre. Target yield 28 quintals."
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Generate Timeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
