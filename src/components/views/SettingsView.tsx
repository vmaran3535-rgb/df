import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Download, 
  Upload, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Globe, 
  Database, 
  ShieldCheck, 
  Sparkles,
  Save
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../data/translations';
import { INDIAN_STATES } from '../../data/marketPrices';

export const SettingsView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    language, 
    setLanguage, 
    tempUnit, 
    setTempUnit, 
    priceUnit, 
    setPriceUnit,
    isDarkMode, 
    setIsDarkMode,
    crops,
    notifications,
    communityPosts
  } = useFarm();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [farmName, setFarmName] = useState(profile.farmName);
  const [locationVillage, setLocationVillage] = useState(profile.locationVillage);
  const [district, setDistrict] = useState(profile.district);
  const [state, setState] = useState(profile.state);
  const [landAreaAcres, setLandAreaAcres] = useState(profile.landAreaAcres);
  const [soilType, setSoilType] = useState(profile.soilType);
  const [irrigationSource, setIrrigationSource] = useState(profile.irrigationSource);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      farmName,
      locationVillage,
      district,
      state,
      landAreaAcres: Number(landAreaAcres),
      soilType,
      irrigationSource,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Export full farm backup JSON
  const handleExportData = () => {
    const backupData = {
      profile,
      crops,
      notifications,
      communityPosts,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-farming-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) updateProfile(parsed.profile);
        if (parsed.crops) localStorage.setItem('df_crops', JSON.stringify(parsed.crops));
        alert('Farm data successfully restored! Please refresh to reload all records.');
        window.location.reload();
      } catch {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Farm Profile & System Preferences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage your land holdings, language switcher, measurement units, and offline backup records
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile successfully updated!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Farmer Profile (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-md">
          <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-3 border-b border-stone-100 dark:border-stone-800 mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span>Farmer & Land Holding Details</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Farmer Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Farm Name *
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Total Land Area (Acres) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={landAreaAcres}
                  onChange={(e) => setLandAreaAcres(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Village / Gram Panchayat
                </label>
                <input
                  type="text"
                  value={locationVillage}
                  onChange={(e) => setLocationVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  {INDIAN_STATES.filter(s => s !== 'All States').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Primary Soil Type
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  <option value="Alluvial Clay Loam">Alluvial Clay Loam (Delta)</option>
                  <option value="Black Cotton Soil">Black Cotton Soil (Vertisol)</option>
                  <option value="Red Sandy Loam">Red Sandy Loam</option>
                  <option value="Clayey Loam">Heavy Clay Loam</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Irrigation Source
                </label>
                <input
                  type="text"
                  value={irrigationSource}
                  onChange={(e) => setIrrigationSource(e.target.value)}
                  placeholder="e.g. Borewell & Canal"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Preferences & Data Export (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preferences Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <h3 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Display & Measurement Units</span>
            </h3>

            {/* Language Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Interface Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`p-2 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                      language === lang.code
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-sm">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Unit */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Temperature Unit
              </span>
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTempUnit('C')}
                  className={`px-3 py-1 rounded-lg transition ${
                    tempUnit === 'C' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Celsius (°C)
                </button>
                <button
                  type="button"
                  onClick={() => setTempUnit('F')}
                  className={`px-3 py-1 rounded-lg transition ${
                    tempUnit === 'F' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>

            {/* Price Unit */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Mandi Price Display
              </span>
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPriceUnit('quintal')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    priceUnit === 'quintal' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  ₹/Quintal
                </button>
                <button
                  type="button"
                  onClick={() => setPriceUnit('kg')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    priceUnit === 'kg' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  ₹/kg
                </button>
              </div>
            </div>

            {/* Dark Mode Switch */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Theme Appearance
              </span>
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold flex items-center gap-2"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>

          {/* Backup & Restore Data Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <h3 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Offline Data Backup & Restore</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Export your farm profile, registered crop timelines, notifications, and forum posts as a local JSON file.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleExportData}
                className="py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Export JSON</span>
              </button>

              <label className="py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportData}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
