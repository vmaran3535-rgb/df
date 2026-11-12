/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FarmProvider } from './context/FarmContext';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { AddCropModal } from './components/modals/AddCropModal';

// Views
import { HomeDashboardView } from './components/views/HomeDashboardView';
import { WeatherForecastView } from './components/views/WeatherForecastView';
import { MarketPricesView } from './components/views/MarketPricesView';
import { MyFarmView } from './components/views/MyFarmView';
import { CropTrackerView } from './components/views/CropTrackerView';
import { DiseaseDetectorView } from './components/views/DiseaseDetectorView';
import { SeasonalRecommendationsView } from './components/views/SeasonalRecommendationsView';
import { AssistantChatView } from './components/views/AssistantChatView';
import { LearningCentreView } from './components/views/LearningCentreView';
import { ExpenseCalculatorView } from './components/views/ExpenseCalculatorView';
import { SoilHealthView } from './components/views/SoilHealthView';
import { WaterManagementView } from './components/views/WaterManagementView';
import { GovernmentSchemesView } from './components/views/GovernmentSchemesView';
import { CommunityForumView } from './components/views/CommunityForumView';
import { NotificationsView } from './components/views/NotificationsView';
import { SettingsView } from './components/views/SettingsView';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileNavOpen}
        setMobileOpen={setMobileNavOpen}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          onOpenMobileNav={() => setMobileNavOpen(true)}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <HomeDashboardView
              setActiveTab={setActiveTab}
              onOpenAddCropModal={() => setIsAddCropModalOpen(true)}
            />
          )}

          {activeTab === 'weather' && <WeatherForecastView />}

          {activeTab === 'market-prices' && <MarketPricesView />}

          {activeTab === 'my-farm' && (
            <MyFarmView
              setActiveTab={setActiveTab}
              onOpenAddCropModal={() => setIsAddCropModalOpen(true)}
            />
          )}

          {activeTab === 'crop-tracker' && <CropTrackerView />}

          {activeTab === 'disease-detector' && <DiseaseDetectorView />}

          {activeTab === 'seasonal' && <SeasonalRecommendationsView />}

          {activeTab === 'assistant' && <AssistantChatView />}

          {activeTab === 'learning' && <LearningCentreView />}

          {activeTab === 'expense' && <ExpenseCalculatorView />}

          {activeTab === 'soil' && <SoilHealthView />}

          {activeTab === 'water' && <WaterManagementView />}

          {activeTab === 'schemes' && <GovernmentSchemesView />}

          {activeTab === 'community' && <CommunityForumView />}

          {activeTab === 'notifications' && <NotificationsView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 px-4 lg:px-8 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-400 bg-white/50 dark:bg-stone-900/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-800 dark:text-stone-200 font-serif">
                DIGITAL FARMING
              </span>
              <span>— Smart Farming. Better Harvests. Brighter Futures.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Weather: Open-Meteo API</span>
              <span>•</span>
              <span>Mandi: AGMARKNET</span>
              <span>•</span>
              <span>AI: Gemini 3.8 Flash</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Add Crop Modal */}
      <AddCropModal
        isOpen={isAddCropModalOpen}
        onClose={() => setIsAddCropModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <FarmProvider>
      <MainLayout />
    </FarmProvider>
  );
}
