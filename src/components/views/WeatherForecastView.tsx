import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Gauge, 
  SunMedium, 
  Eye, 
  Sunrise, 
  Sunset, 
  LocateFixed, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  RefreshCw, 
  CloudRain, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { useFarm } from '../../context/FarmContext';
import { PRESET_LOCATIONS } from '../../services/weatherService';
import { evaluateWeatherForFarming, classifyDateOutlook, FarmingActivityAdvisory } from '../../utils/weatherRules';

export const WeatherForecastView: React.FC = () => {
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
    selectedCalendarDate,
    setSelectedCalendarDate
  } = useFarm();

  const [datePickerValue, setDatePickerValue] = useState<string>(selectedCalendarDate);

  const current = weatherData?.current;
  const daily = weatherData?.daily || [];
  const hourly = weatherData?.hourly || [];

  const tempDisplay = (valC?: number) => {
    if (valC === undefined) return '--';
    return tempUnit === 'C' ? `${valC}°C` : `${Math.round((valC * 9) / 5 + 32)}°F`;
  };

  // Find date forecast if within 8-day range
  const selectedDayForecast = daily.find(d => d.date === datePickerValue) || daily[0];
  const dateOutlook = classifyDateOutlook(new Date(datePickerValue));

  // Determine weather conditions for selected date for farming suitability
  const targetWeatherForEvaluation = selectedDayForecast ? {
    tempC: selectedDayForecast.tempMax,
    rainMm: selectedDayForecast.precipSum,
    rainProbability: selectedDayForecast.precipProbMax,
    windSpeedKmh: selectedDayForecast.windSpeedMax,
    humidityPercent: current?.humidity ?? 65,
    uvIndex: selectedDayForecast.uvIndexMax
  } : {
    tempC: current?.tempC ?? 28,
    rainMm: 0,
    rainProbability: current?.rainProbability ?? 15,
    windSpeedKmh: current?.windSpeedKmh ?? 12,
    humidityPercent: current?.humidity ?? 65,
    uvIndex: current?.uvIndex ?? 6
  };

  const farmingAdvisories: FarmingActivityAdvisory[] = evaluateWeatherForFarming(targetWeatherForEvaluation);

  // Hourly chart data (next 12-16 hours)
  const chartData = hourly.slice(0, 16).map(h => ({
    hour: h.hour,
    temp: tempUnit === 'C' ? h.temp : Math.round((h.temp * 9) / 5 + 32),
    rainProb: h.precipProb,
    wind: h.windSpeed
  }));

  const handleDateChange = (newDateStr: string) => {
    setDatePickerValue(newDateStr);
    setSelectedCalendarDate(newDateStr);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Location & GPS & Date Selector */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Smart Weather & Agro-Advisory
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Real-time microclimate parameters from Open-Meteo with agricultural suitability analysis
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Location Selector */}
          <select
            value={selectedLocation.id}
            onChange={(e) => {
              const loc = PRESET_LOCATIONS.find(p => p.id === e.target.value);
              if (loc) setSelectedLocation(loc);
            }}
            className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {PRESET_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.state})
              </option>
            ))}
          </select>

          {/* GPS Auto-detect Button */}
          <button
            type="button"
            onClick={detectGpsLocation}
            className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1.5"
            title="Locate via GPS"
          >
            <LocateFixed className="w-4 h-4" />
            <span className="hidden sm:inline">Use Farm GPS</span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={refreshWeather}
            disabled={isLoadingWeather}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
            title="Refresh Live Weather"
            aria-label="Refresh Live Weather"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingWeather ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          {/* Unit Toggle */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200 dark:border-stone-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTempUnit('C')}
              className={`px-2.5 py-1 rounded-lg transition ${
                tempUnit === 'C' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setTempUnit('F')}
              className={`px-2.5 py-1 rounded-lg transition ${
                tempUnit === 'F' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs' : 'text-stone-500'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {locationStatusMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2 animate-fadeIn">
          <LocateFixed className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{locationStatusMsg}</span>
        </div>
      )}

      {/* Main Glassmorphism Live Weather Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hero Card (8 Cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-white/95 via-emerald-50/50 to-teal-50/60 dark:from-stone-900/90 dark:via-stone-900/80 dark:to-emerald-950/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse" />
                <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  Live Agro-Weather Station
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1 font-serif">
                {selectedLocation.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {selectedLocation.agriZone} • Coordinates: {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lon.toFixed(4)}°E
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-5xl sm:text-6xl font-black text-emerald-800 dark:text-lime-300 font-serif tracking-tight">
                {tempDisplay(current?.tempC)}
              </span>
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mt-1">
                Feels like {tempDisplay(current?.feelsLikeC)}
              </p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {current?.weatherDesc || 'Clear Sky'}
              </p>
            </div>
          </div>

          {/* 8 Detailed Atmospheric Parameters (Glass Tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Relative Humidity</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.humidity ?? 68}%</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Optimal for transpiration</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <CloudRain className="w-4 h-4 text-cyan-500" />
                <span>Rainfall Probability</span>
              </div>
              <p className="text-lg font-extrabold text-cyan-700 dark:text-cyan-300">{current?.rainProbability ?? 15}%</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Next 24h precipitation</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Wind className="w-4 h-4 text-teal-500" />
                <span>Wind Speed</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.windSpeedKmh ?? 12} km/h</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Direction: {current?.windDirectionDeg ?? 80}°</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <SunMedium className="w-4 h-4 text-amber-500" />
                <span>UV Radiation</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.uvIndex ?? 6} / 11</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Adequate photoperiod</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Gauge className="w-4 h-4 text-indigo-500" />
                <span>Barometric Pressure</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.pressureHpa ?? 1012} hPa</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Stable air mass</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>Visibility</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.visibilityKm ?? 10} km</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Clear field horizon</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Sunrise className="w-4 h-4 text-amber-500" />
                <span>Sunrise</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.sunrise || '06:14 AM'}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Dawn twilight</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs mb-1">
                <Sunset className="w-4 h-4 text-orange-500" />
                <span>Sunset</span>
              </div>
              <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{current?.sunset || '06:02 PM'}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Dusk twilight</p>
            </div>
          </div>
        </div>

        {/* Right Column: 24-Hour Forecast Timeline & Hourly Trend (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                24-Hour Temperature Curve
              </h4>
              <span className="text-[10px] text-stone-400">Hourly update</span>
            </div>

            {/* Recharts Hourly Area Chart */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#9ca3af" domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}°${tempUnit}`, 'Temp']}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#tempGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Hourly Timeline list */}
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
              Next Hours Overview
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {hourly.slice(0, 7).map((h, i) => (
                <div
                  key={i}
                  className="px-2.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-center shrink-0 min-w-[62px]"
                >
                  <p className="text-[10px] text-stone-500">{h.hour}</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 my-0.5">{tempDisplay(h.temp)}</p>
                  <p className="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400">{h.precipProb}% 🌧️</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Weather Forecast Horizontal Cards */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
              7-Day Agricultural Weather Forecast
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Click any date below to load specific day microclimate and farming operation advisories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {daily.map((day) => {
            const isSelected = datePickerValue === day.date;
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => handleDateChange(day.date)}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20 scale-102 ring-2 ring-lime-400'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-emerald-300 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div>
                  <p className={`text-xs font-bold ${isSelected ? 'text-lime-300' : 'text-stone-600 dark:text-stone-400'}`}>
                    {day.dayName}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                    {day.date.split('-').slice(1).join('/')}
                  </p>
                </div>

                <div className="my-2.5">
                  <CloudSun className={`w-6 h-6 mx-auto ${isSelected ? 'text-lime-300' : 'text-amber-500'}`} />
                  <p className={`text-[10px] font-semibold mt-1 truncate ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                    {day.weatherDesc}
                  </p>
                </div>

                <div className="border-t border-stone-200/50 dark:border-stone-700/50 pt-1.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span>{tempDisplay(day.tempMax)}</span>
                    <span className={`text-[10px] font-normal ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {tempDisplay(day.tempMin)}
                    </span>
                  </div>
                  <p className={`text-[9px] mt-0.5 ${isSelected ? 'text-lime-200' : 'text-cyan-600 dark:text-cyan-400'} font-semibold`}>
                    {day.precipProbMax}% Rain
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Calendar Date Picker & Suitable Farming Activities */}
      <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 dark:from-stone-900 dark:to-stone-900 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 dark:border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 font-serif">
                Interactive Date Picker & Farming Suitability Analyzer
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Select any date to evaluate microclimate parameters and determine safe farming operations.
            </p>
          </div>

          {/* Date Picker Input & Outlook Classifier Chip */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-2xl border border-stone-300 dark:border-stone-700 shadow-xs">
              <CalendarIcon className="w-4 h-4 text-emerald-600" />
              <input
                type="date"
                value={datePickerValue}
                onChange={(e) => handleDateChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
              dateOutlook.type === 'forecast'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : dateOutlook.type === 'past'
                ? 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
                : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
            }`}>
              {dateOutlook.label}
            </span>
          </div>
        </div>

        {/* Selected Date Weather Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-stone-200 dark:border-stone-800">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <p className="text-[11px] text-stone-400">Date Expected Temp</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white mt-0.5">
              {tempDisplay(targetWeatherForEvaluation.tempC)}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              Daytime High
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <p className="text-[11px] text-stone-400">Precipitation Potential</p>
            <p className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
              {targetWeatherForEvaluation.rainProbability}% ({targetWeatherForEvaluation.rainMm} mm)
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Rain accumulation
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <p className="text-[11px] text-stone-400">Wind Velocity</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white mt-0.5">
              {targetWeatherForEvaluation.windSpeedKmh} km/h
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              {targetWeatherForEvaluation.windSpeedKmh > 18 ? 'High wind caution' : 'Gentle breeze'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <p className="text-[11px] text-stone-400">Canopy Humidity</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white mt-0.5">
              {targetWeatherForEvaluation.humidityPercent}%
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Relative moisture
            </p>
          </div>
        </div>

        {/* Suitable Farming Activities Table / Cards */}
        <div className="pt-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Suitable Farming Activities for {new Date(datePickerValue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </h4>
            <span className="text-xs text-stone-500">
              Evaluated for Indian Agro-Climatic Zones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farmingAdvisories.map((adv, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  adv.status === 'recommended'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                    : adv.status === 'caution'
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {adv.activity}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                      adv.status === 'recommended'
                        ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                        : adv.status === 'caution'
                        ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                        : 'bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200'
                    }`}>
                      {adv.status === 'recommended' && <CheckCircle2 className="w-3 h-3" />}
                      {adv.status === 'caution' && <AlertCircle className="w-3 h-3" />}
                      {adv.status === 'not_recommended' && <XCircle className="w-3 h-3" />}
                      <span>{adv.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                    {adv.reason}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold">Farmer Tip:</span> {adv.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
