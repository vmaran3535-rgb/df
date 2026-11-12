import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Gauge, 
  SunMedium, 
  Eye, 
  Sunrise, 
  Sunset, 
  AlertTriangle, 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ScanSearch, 
  Bot, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Tractor,
  Layers
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { INITIAL_MARKET_PRICES } from '../../data/marketPrices';
import { BEST_FARMING_IDEAS_NOVEMBER } from '../../data/seasonalCrops';
import { calculateCropTracking } from '../../utils/cropTimeline';
import { ActiveTab } from '../Sidebar';

interface HomeDashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddCropModal: () => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  setActiveTab,
  onOpenAddCropModal,
}) => {
  const { 
    profile, 
    crops, 
    weatherData, 
    selectedLocation, 
    tempUnit, 
    priceUnit,
    notifications,
    markNotificationCompleted 
  } = useFarm();

  const current = weatherData?.current;

  const tempDisplay = current
    ? tempUnit === 'C'
      ? `${current.tempC}°C`
      : `${Math.round((current.tempC * 9) / 5 + 32)}°F`
    : '28°C';

  const feelsLikeDisplay = current
    ? tempUnit === 'C'
      ? `${current.feelsLikeC}°C`
      : `${Math.round((current.feelsLikeC * 9) / 5 + 32)}°F`
    : '30°C';

  const urgentAlerts = weatherData?.alerts || [];
  const activeCrops = crops.filter((c) => c.status === 'active');
  const pendingTasks = notifications.filter((n) => n.status === 'unread').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700/50">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-lime-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Farming Intelligence Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif text-white">
            Vanakkam, {profile.name}! 🌾
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Welcome to {profile.farmName} ({profile.district}, {profile.state}). Today is optimal for crop observation and morning spraying.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddCropModal}
              className="px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 stroke-[2.5]" />
              <span>+ Add New Crop Tracker</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('disease-detector')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600/60 transition flex items-center gap-2"
            >
              <ScanSearch className="w-4 h-4 text-lime-300" />
              <span>Scan Crop Leaf for Disease</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('assistant')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600/60 transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-lime-300" />
              <span>Ask AI Kisan Mitra</span>
            </button>
          </div>
        </div>

        {/* Quick Location Badge */}
        <div className="relative z-10 shrink-0 bg-emerald-950/60 border border-emerald-700/50 backdrop-blur-md p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 text-xs text-emerald-200">
            <span>Selected Agro-Zone</span>
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          </div>
          <p className="font-bold text-base text-white mt-1">{selectedLocation.name}</p>
          <p className="text-xs text-emerald-300/80 mt-0.5">{selectedLocation.agriZone}</p>
          <div className="mt-3 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
            <span>Land Area:</span>
            <span className="font-bold text-lime-300">{profile.landAreaAcres} Acres</span>
          </div>
        </div>
      </div>

      {/* Weather Severe Alerts if present */}
      {urgentAlerts.length > 0 && (
        <div className="space-y-2">
          {urgentAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 transition ${
                alert.severity === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${alert.severity === 'warning' ? 'text-amber-600' : 'text-emerald-600'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{alert.title}</h4>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20">
                    Live Advisory
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed">{alert.message}</p>
                <div className="mt-2 text-xs font-semibold flex items-center gap-1.5">
                  <span className="underline">Recommended Action:</span>
                  <span>{alert.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid: Smart Weather Glass Card + Active Crop Tracker + Mandi Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Glassmorphism Weather Card (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-white/90 via-emerald-50/40 to-teal-50/50 dark:from-stone-900/90 dark:via-stone-900/80 dark:to-emerald-950/30 backdrop-blur-xl rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Smart Farm Weather
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Real-time microclimate from Open-Meteo API
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('weather')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Full 7-Day Forecast</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Main Temperature & Condition Display */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md relative overflow-hidden mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight font-serif">
                    {tempDisplay}
                  </span>
                  <div className="text-xs text-emerald-100">
                    <p className="font-semibold">Feels like {feelsLikeDisplay}</p>
                    <p className="opacity-90">{current?.weatherDesc || 'Clear Skies'}</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-100/90 mt-2 flex items-center gap-1.5">
                  <span>{selectedLocation.name}</span>
                  <span>•</span>
                  <span>{weatherData?.fetchedAt || 'Updated live'}</span>
                </p>
              </div>

              {/* Rain Probability Badge */}
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 sm:text-right shrink-0">
                <p className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
                  Rain Probability
                </p>
                <p className="text-2xl font-extrabold text-lime-300">
                  {current?.rainProbability ?? 15}%
                </p>
                <p className="text-[10px] text-emerald-100 mt-0.5">
                  {(current?.rainProbability ?? 15) > 40 ? 'Showers possible' : 'Dry conditions'}
                </p>
              </div>
            </div>
          </div>

          {/* Microclimate Grid (Glass Tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-800 dark:text-stone-200">
            <div className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Humidity</span>
              </div>
              <p className="text-base font-extrabold">{current?.humidity ?? 68}%</p>
              <p className="text-[10px] text-stone-400 mt-0.5">RH in canopy</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span>Wind Speed</span>
              </div>
              <p className="text-base font-extrabold">{current?.windSpeedKmh ?? 12} km/h</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Dir: {current?.windDirectionDeg ?? 80}°</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <SunMedium className="w-3.5 h-3.5 text-amber-500" />
                <span>UV Index</span>
              </div>
              <p className="text-base font-extrabold">{current?.uvIndex ?? 6} / 11</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Moderate sunlight</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                <span>Pressure</span>
              </div>
              <p className="text-base font-extrabold">{current?.pressureHpa ?? 1012} hPa</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Atmospheric MSL</p>
            </div>
          </div>

          {/* Sunrise and Sunset Bar */}
          <div className="mt-3 p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-500" />
              <span>Sunrise: <strong className="text-stone-900 dark:text-stone-100">{current?.sunrise || '06:14 AM'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-500" />
              <span>Sunset: <strong className="text-stone-900 dark:text-stone-100">{current?.sunset || '06:02 PM'}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Active Crops & Today's Farm Tasks (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Crops Widget */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-lime-100 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                    My Farm Crops
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {activeCrops.length} active crop tracker{activeCrops.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('my-farm')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {activeCrops.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl">
                <Sprout className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-500">No active crops tracked yet.</p>
                <button
                  type="button"
                  onClick={onOpenAddCropModal}
                  className="mt-3 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                >
                  + Add First Crop
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeCrops.map((crop) => {
                  const tracking = calculateCropTracking(crop.cropName, crop.plantingDate, crop.durationDays);
                  return (
                    <div
                      key={crop.id}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                            {crop.cropName} <span className="text-[11px] font-normal text-stone-500">({crop.variety})</span>
                          </h4>
                          <p className="text-[10px] text-stone-400">{crop.plotNumber || crop.farmName} • {crop.landAreaAcres} Acres</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          Day {tracking.daysElapsed} of {tracking.durationDays}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[10px] font-medium text-stone-500 dark:text-stone-400 mb-1">
                          <span>{tracking.activeStage.name}</span>
                          <span>{tracking.percentComplete}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full transition-all duration-500"
                            style={{ width: `${tracking.percentComplete}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 dark:text-stone-400 truncate max-w-[200px]">
                          Next: <strong className="text-emerald-700 dark:text-emerald-400">{tracking.nextActivity}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('crop-tracker')}
                          className="text-[10px] font-bold text-stone-600 dark:text-stone-300 hover:text-emerald-600 flex items-center gap-0.5"
                        >
                          Timeline <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Today's Farming Tasks / Reminders */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Priority Farm Tasks
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                All Notifications
              </button>
            </div>

            <div className="space-y-2">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-100">{t.title}</p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">{t.recommendedAction}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => markNotificationCompleted(t.id)}
                    className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 transition shrink-0"
                    title="Mark Done"
                    aria-label="Mark Task Done"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Farming Market Prices Ticker */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                Daily Mandi Bhav & Market Prices
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Synchronized with AGMARKNET & APMC Market arrival yards
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('market-prices')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All 14 Commodities</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Commodity Cards Horizontal Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {INITIAL_MARKET_PRICES.slice(0, 5).map((comm) => {
            const isUp = comm.currentPrice >= comm.previousDayPrice;
            const diff = comm.currentPrice - comm.previousDayPrice;
            const diffPercent = Math.round((Math.abs(diff) / comm.previousDayPrice) * 100 * 10) / 10;
            const displayPrice = priceUnit === 'quintal'
              ? `₹${comm.currentPrice.toLocaleString()}`
              : `₹${(comm.currentPrice / 100).toFixed(1)}`;
            const unitLabel = priceUnit === 'quintal' ? '/ Qtl' : '/ kg';

            return (
              <div
                key={comm.id}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src={comm.imageUrl}
                      alt={comm.name}
                      className="w-9 h-9 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                        {comm.name}
                      </h4>
                      <p className="text-[10px] text-stone-400 truncate">{comm.tamilName}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-base font-extrabold text-stone-900 dark:text-white">
                      {displayPrice} <span className="text-[10px] font-normal text-stone-400">{unitLabel}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ${
                      isUp ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      {diff >= 0 ? `+${diffPercent}%` : `-${diffPercent}%`}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-[10px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
                  <span className="truncate max-w-[120px]">{comm.market}</span>
                  <span className="shrink-0">{comm.state}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best Farming Ideas This Month (November) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-teal-500/10 dark:from-amber-950/30 dark:to-emerald-950/20 rounded-3xl p-6 border border-amber-300/40 dark:border-amber-800/40 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
              Best Farming Ideas This Month (November)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('seasonal')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Seasonal Guide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BEST_FARMING_IDEAS_NOVEMBER.map((idea, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-2 inline-block">
                  {idea.tag}
                </span>
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 mb-1 leading-snug">
                  {idea.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                  {idea.description}
                </p>
              </div>
              <ul className="text-[10px] text-stone-500 dark:text-stone-400 space-y-1 border-t border-stone-100 dark:border-stone-700 pt-2">
                {idea.actionItems.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-500 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
