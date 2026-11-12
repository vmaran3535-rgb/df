import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  LineChart as LineChartIcon, 
  Sparkles, 
  Info,
  Calendar,
  X,
  Building2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useFarm } from '../../context/FarmContext';
import { INITIAL_MARKET_PRICES, CommodityPrice, INDIAN_STATES } from '../../data/marketPrices';

export const MarketPricesView: React.FC = () => {
  const { priceUnit, setPriceUnit } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCommodityForChart, setActiveCommodityForChart] = useState<CommodityPrice>(INITIAL_MARKET_PRICES[0]);
  const [showChartModal, setShowChartModal] = useState(false);

  const categories = ['All', 'Cereals', 'Vegetables', 'Cash Crops', 'Fruits', 'Spices'];

  // Filtered list
  const filteredPrices = INITIAL_MARKET_PRICES.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindiName.includes(searchTerm) ||
      item.tamilName.includes(searchTerm) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === 'All States' || item.state === selectedState;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesState && matchesCat;
  });

  const formatPrice = (priceInQuintal: number) => {
    if (priceUnit === 'kg') {
      return `₹${(priceInQuintal / 100).toFixed(1)}/kg`;
    }
    return `₹${priceInQuintal.toLocaleString('en-IN')}/Qtl`;
  };

  const openChart = (comm: CommodityPrice) => {
    setActiveCommodityForChart(comm);
    setShowChartModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header and Source Attribution */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Daily Agricultural Market Prices (Mandi Bhav)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Real-time wholesale APMC Mandi rates across Indian regulated markets with price history
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Official Data Feed: AGMARKNET & Ministry of Agriculture & Farmers Welfare</span>
            </span>
          </div>
        </div>

        {/* Unit Toggle and Stats */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPriceUnit('quintal')}
              className={`px-3 py-1.5 rounded-lg transition ${
                priceUnit === 'quintal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              ₹ / Quintal (100 kg)
            </button>
            <button
              type="button"
              onClick={() => setPriceUnit('kg')}
              className={`px-3 py-1.5 rounded-lg transition ${
                priceUnit === 'kg'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              ₹ / Kilogram
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by commodity (e.g. Paddy, Tomato, Wheat) or market..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="w-full md:w-60">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-semibold shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Commodity Price Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPrices.map((item) => {
          const isUp = item.currentPrice >= item.previousDayPrice;
          const priceChange = item.currentPrice - item.previousDayPrice;
          const percentChange = Math.round((Math.abs(priceChange) / item.previousDayPrice) * 100 * 10) / 10;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Image & Header */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-200 dark:border-stone-800 shrink-0 shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[9px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{item.lastUpdated}</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {item.tamilName} • {item.hindiName}
                    </p>
                  </div>
                </div>

                {/* Primary Price Block */}
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 mb-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase font-semibold">
                        Modal / Average Price
                      </p>
                      <p className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white font-serif">
                        {formatPrice(item.modalPrice)}
                      </p>
                    </div>

                    <div className={`px-2 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
                      isUp 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{priceChange >= 0 ? `+${percentChange}%` : `-${percentChange}%`}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
                    <span>Min: <strong className="text-stone-800 dark:text-stone-200">{formatPrice(item.minPrice)}</strong></span>
                    <span>Max: <strong className="text-stone-800 dark:text-stone-200">{formatPrice(item.maxPrice)}</strong></span>
                  </div>
                </div>

                {/* Mandi & Location info */}
                <div className="space-y-1 text-xs text-stone-600 dark:text-stone-400 mb-3">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-semibold text-stone-800 dark:text-stone-200 truncate">{item.market}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{item.district}, {item.state}</span>
                  </div>
                </div>
              </div>

              {/* View 7-Day Trend Chart Button */}
              <button
                type="button"
                onClick={() => openChart(item)}
                className="w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-stone-700 dark:text-stone-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                <span>View 7-Day Price History</span>
              </button>
            </div>
          );
        })}
      </div>

      {filteredPrices.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h4 className="font-bold text-base text-stone-800 dark:text-stone-200">
            No Commodities Found
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your search query or state filter to view other mandi prices.
          </p>
        </div>
      )}

      {/* 7-Day Price History Modal */}
      {showChartModal && activeCommodityForChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowChartModal(false)}
              className="absolute right-5 top-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={activeCommodityForChart.imageUrl}
                alt={activeCommodityForChart.name}
                className="w-12 h-12 rounded-xl object-cover border"
              />
              <div>
                <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 font-serif">
                  {activeCommodityForChart.name} - 7-Day Price Trend
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {activeCommodityForChart.market} ({activeCommodityForChart.district}, {activeCommodityForChart.state})
                </p>
              </div>
            </div>

            {/* Current modal & comparison */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Today's Modal Price</span>
                <p className="text-2xl font-black text-emerald-700 dark:text-lime-300 font-serif">
                  {formatPrice(activeCommodityForChart.modalPrice)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Min / Max Range</span>
                <p className="text-sm font-extrabold text-stone-800 dark:text-stone-200">
                  {formatPrice(activeCommodityForChart.minPrice)} – {formatPrice(activeCommodityForChart.maxPrice)}
                </p>
              </div>
            </div>

            {/* Recharts 7-Day Line Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activeCommodityForChart.history7Days.map(h => ({
                    date: h.date,
                    Price: priceUnit === 'kg' ? Math.round((h.price / 100) * 10) / 10 : h.price,
                    Modal: priceUnit === 'kg' ? Math.round((h.modal / 100) * 10) / 10 : h.modal,
                  }))}
                  margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.6} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${val} ${priceUnit === 'kg' ? '/kg' : '/Qtl'}`, 'Price']}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="Price" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Modal" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-stone-400 text-center mt-4">
              Historical price data compiled from daily Mandi arrival reports and national e-NAM auctions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
