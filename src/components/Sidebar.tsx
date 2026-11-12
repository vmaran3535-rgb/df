import React, { useState } from 'react';
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Tractor, 
  ScanSearch, 
  CalendarRange, 
  Bot, 
  GraduationCap, 
  Calculator, 
  FlaskConical, 
  Droplets, 
  Landmark, 
  Users, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';

export type ActiveTab = 
  | 'dashboard'
  | 'weather'
  | 'market-prices'
  | 'my-farm'
  | 'crop-tracker'
  | 'disease-detector'
  | 'seasonal'
  | 'assistant'
  | 'learning'
  | 'expense'
  | 'soil'
  | 'water'
  | 'schemes'
  | 'community'
  | 'notifications'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen
}) => {
  const { 
    language, 
    setLanguage, 
    isDarkMode, 
    setIsDarkMode, 
    notifications, 
    profile,
    crops 
  } = useFarm();

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const activeCropsCount = crops.filter(c => c.status === 'active').length;

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: t.dashboard, icon: CloudSun, badge: null },
    { id: 'weather' as ActiveTab, label: t.weather, icon: CloudSun, badge: 'Live' },
    { id: 'market-prices' as ActiveTab, label: t.marketPrices, icon: TrendingUp, badge: 'Mandi' },
    { id: 'my-farm' as ActiveTab, label: t.myFarm, icon: Tractor, badge: activeCropsCount > 0 ? `${activeCropsCount}` : null },
    { id: 'crop-tracker' as ActiveTab, label: t.cropTracker, icon: Sprout, badge: null },
    { id: 'disease-detector' as ActiveTab, label: t.diseaseDetector, icon: ScanSearch, badge: 'AI Vision' },
    { id: 'seasonal' as ActiveTab, label: t.seasonal, icon: CalendarRange, badge: null },
    { id: 'assistant' as ActiveTab, label: t.farmingAssistant, icon: Bot, badge: 'AI 3.8' },
    { id: 'learning' as ActiveTab, label: t.learningCentre, icon: GraduationCap, badge: null },
    { id: 'expense' as ActiveTab, label: t.expenseCalc, icon: Calculator, badge: null },
    { id: 'soil' as ActiveTab, label: t.soilHealth, icon: FlaskConical, badge: null },
    { id: 'water' as ActiveTab, label: t.waterMgmt, icon: Droplets, badge: null },
    { id: 'schemes' as ActiveTab, label: t.govSchemes, icon: Landmark, badge: 'Gov' },
    { id: 'community' as ActiveTab, label: t.community, icon: Users, badge: null },
    { id: 'notifications' as ActiveTab, label: t.notifications, icon: Bell, badge: unreadCount > 0 ? `${unreadCount}` : null },
    { id: 'settings' as ActiveTab, label: t.settings, icon: Settings, badge: null },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-emerald-950 text-stone-100 flex flex-col border-r border-emerald-800/40 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-emerald-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-emerald-950 shadow-md">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-serif">DIGITAL FARMING</span>
              </div>
              <p className="text-[10px] text-emerald-300 font-medium tracking-wide">
                Smart Farming. Better Harvests.
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="lg:hidden p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-800/60 transition"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Language Switcher Bar */}
        <div className="px-4 py-2.5 bg-emerald-900/60 border-b border-emerald-800/40 flex items-center justify-between gap-1 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[11px] text-emerald-400 font-medium shrink-0">Lang:</span>
          <div className="flex items-center gap-1 shrink-0">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-0.5 rounded-md text-xs font-medium transition ${
                  language === lang.code 
                    ? 'bg-lime-400 text-emerald-950 font-bold shadow-xs' 
                    : 'text-stone-300 hover:text-white hover:bg-emerald-800/50'
                }`}
                title={lang.name}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin scrollbar-thumb-emerald-800">
          <div className="text-[10px] uppercase font-bold text-emerald-400/80 px-3 py-1 tracking-wider">
            Main Features
          </div>
          {navItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-600/90 text-white shadow-md shadow-emerald-900/30 font-semibold'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-lime-300' : 'text-emerald-400 group-hover:text-emerald-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] rounded-md font-bold uppercase tracking-wider ${
                    isActive ? 'bg-lime-400 text-emerald-950' : 'bg-emerald-800/80 text-emerald-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="text-[10px] uppercase font-bold text-emerald-400/80 px-3 pt-3 pb-1 tracking-wider">
            Farm Intelligence & Community
          </div>
          {navItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-600/90 text-white shadow-md shadow-emerald-900/30 font-semibold'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-lime-300' : 'text-emerald-400 group-hover:text-emerald-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] rounded-md font-bold ${
                    item.id === 'notifications' 
                      ? 'bg-amber-400 text-amber-950 animate-pulse' 
                      : isActive ? 'bg-lime-400 text-emerald-950' : 'bg-emerald-800/80 text-emerald-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Farmer Profile & Theme Toggle */}
        <div className="p-3 border-t border-emerald-800/50 bg-emerald-950/90">
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-900/50 border border-emerald-800/40 mb-2">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-lg bg-emerald-700/80 text-lime-300 font-bold flex items-center justify-center text-xs shrink-0">
                {profile.name.charAt(0)}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate leading-tight">{profile.name}</p>
                <p className="text-[10px] text-emerald-300/80 truncate">{profile.district}, {profile.state}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className="p-1 rounded-md text-emerald-300 hover:text-white hover:bg-emerald-800/50 transition"
              title="Edit Profile"
              aria-label="Edit Profile"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>Agri-Data Secured</span>
            </div>
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/50 transition flex items-center gap-1.5 text-xs"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-300" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
