import React, { useState } from 'react';
import { 
  Menu, 
  MapPin, 
  LocateFixed, 
  CloudSun, 
  Bell, 
  CheckCircle2, 
  ChevronDown, 
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { PRESET_LOCATIONS } from '../services/weatherService';
import { ActiveTab } from './Sidebar';

interface HeaderProps {
  onOpenMobileNav: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav, setActiveTab }) => {
  const { 
    selectedLocation, 
    setSelectedLocation, 
    weatherData, 
    isLoadingWeather, 
    refreshWeather,
    detectGpsLocation, 
    locationStatusMsg,
    tempUnit,
    setTempUnit,
    priceUnit,
    setPriceUnit,
    notifications,
    markNotificationCompleted
  } = useFarm();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => n.status === 'unread');

  const displayTemp = weatherData?.current 
    ? (tempUnit === 'C' 
        ? `${weatherData.current.tempC}°C` 
        : `${Math.round((weatherData.current.tempC * 9) / 5 + 32)}°F`)
    : '--';

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Farm Location Selector */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Location Picker with GPS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 transition text-xs font-medium"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div className="text-left hidden sm:block">
                <span className="font-semibold block truncate max-w-[170px]">
                  {selectedLocation.name}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block -mt-0.5">
                  {selectedLocation.state}
                </span>
              </div>
              <span className="sm:hidden font-semibold truncate max-w-[110px]">
                {selectedLocation.district}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Dropdown Menu */}
            {showLocationDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setShowLocationDropdown(false)}
                />
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 pb-2 border-b border-stone-100 dark:border-stone-700">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
                      Select Agricultural Region
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        detectGpsLocation();
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition border border-emerald-200 dark:border-emerald-800"
                    >
                      <LocateFixed className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Detect My Farm GPS Coordinates</span>
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin">
                    {PRESET_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          setShowLocationDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-700/60 transition ${
                          selectedLocation.id === loc.id
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                            : 'text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{loc.name}</p>
                          <p className="text-[10px] text-stone-400">{loc.agriZone}</p>
                        </div>
                        {selectedLocation.id === loc.id && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* GPS status feedback chip */}
          {locationStatusMsg && (
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-pulse hidden md:inline">
              {locationStatusMsg}
            </span>
          )}
        </div>

        {/* Right: Live Weather Capsule, Units Toggle, Notification Bell */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Weather Capsule */}
          <button
            type="button"
            onClick={() => setActiveTab('weather')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-stone-800 dark:text-stone-200 hover:shadow-xs transition"
            title="Open Live Weather Details"
          >
            <CloudSun className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {displayTemp}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">
              {weatherData?.current.weatherDesc || 'Live'}
            </span>
            {isLoadingWeather && (
              <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin ml-1" />
            )}
          </button>

          {/* Unit Switchers */}
          <div className="hidden md:flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200 dark:border-stone-700 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setTempUnit('C')}
              className={`px-2 py-0.5 rounded-lg transition ${
                tempUnit === 'C' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setTempUnit('F')}
              className={`px-2 py-0.5 rounded-lg transition ${
                tempUnit === 'F' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              °F
            </button>
          </div>

          <div className="hidden lg:flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200 dark:border-stone-700 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setPriceUnit('quintal')}
              className={`px-2 py-0.5 rounded-lg transition ${
                priceUnit === 'quintal' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              ₹/Qtl
            </button>
            <button
              type="button"
              onClick={() => setPriceUnit('kg')}
              className={`px-2 py-0.5 rounded-lg transition ${
                priceUnit === 'kg' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              ₹/kg
            </button>
          </div>

          {/* Notifications Dropdown Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="View farming notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            {/* Notification preview popup */}
            {showNotifDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setShowNotifDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 py-3 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-stone-800 dark:text-stone-100">
                        Farm Notifications
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        {unreadNotifs.length} pending agricultural action items
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotifDropdown(false);
                      }}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto px-2 py-2 space-y-2 scrollbar-thin">
                    {notifications.slice(0, 4).map((n) => (
                      <div 
                        key={n.id}
                        className={`p-3 rounded-xl border transition ${
                          n.status === 'unread'
                            ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                            : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-semibold text-xs text-stone-900 dark:text-stone-100 leading-snug">
                            {n.title}
                          </h5>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 shrink-0">
                            {n.cropName}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                          {n.recommendedAction}
                        </p>
                        <div className="mt-2 flex items-center justify-between pt-1 border-t border-stone-200/50 dark:border-stone-700/50">
                          <span className="text-[10px] text-stone-400">{n.date}</span>
                          {n.status === 'unread' && (
                            <button
                              type="button"
                              onClick={() => markNotificationCompleted(n.id)}
                              className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              Mark Done
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
