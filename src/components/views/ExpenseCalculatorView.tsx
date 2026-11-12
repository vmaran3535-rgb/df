import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Download, 
  RotateCcw, 
  Ruler, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { calculateFarmingFinances } from '../../utils/expenseCalc';
import { useFarm } from '../../context/FarmContext';

export const ExpenseCalculatorView: React.FC = () => {
  const { profile } = useFarm();

  const [cropTitle, setCropTitle] = useState('Paddy (BPT 5204)');
  const [landAreaAcres, setLandAreaAcres] = useState(2.5);
  const [seedsCost, setSeedsCost] = useState(4500);
  const [fertilizerCost, setFertilizerCost] = useState(9500);
  const [pesticideCost, setPesticideCost] = useState(3800);
  const [labourCost, setLabourCost] = useState(16000);
  const [irrigationCost, setIrrigationCost] = useState(3500);
  const [machineryHireCost, setMachineryHireCost] = useState(8500);
  const [transportOtherCost, setTransportOtherCost] = useState(4200);

  const [estimatedYieldPerAcreQuintals, setEstimatedYieldPerAcreQuintals] = useState(26);
  const [pricePerQuintal, setPricePerQuintal] = useState(2350);

  const finances = calculateFarmingFinances({
    landAreaAcres,
    seedsCost,
    fertilizerCost,
    pesticideCost,
    labourCost,
    irrigationCost,
    machineryHireCost,
    transportOtherCost,
    estimatedYieldPerAcreQuintals,
    pricePerQuintal
  });

  // Pie chart data
  const costDistributionData = [
    { name: 'Labour & Weeding', value: labourCost, color: '#f59e0b' },
    { name: 'Fertilizers & FYM', value: fertilizerCost, color: '#10b981' },
    { name: 'Machinery Hire', value: machineryHireCost, color: '#6366f1' },
    { name: 'Seeds & Treatment', value: seedsCost, color: '#14b8a6' },
    { name: 'Crop Protection', value: pesticideCost, color: '#ec4899' },
    { name: 'Irrigation & Power', value: irrigationCost, color: '#06b6d4' },
    { name: 'Transport & Misc', value: transportOtherCost, color: '#8b5cf6' }
  ].filter(d => d.value > 0);

  const comparisonBarData = [
    { name: 'Total Investment', amount: finances.totalCost, fill: '#ef4444' },
    { name: 'Gross Revenue', amount: finances.grossRevenue, fill: '#3b82f6' },
    { name: 'Net Profit', amount: Math.max(0, finances.netProfit), fill: '#10b981' }
  ];

  const handleReset = () => {
    setLandAreaAcres(2.5);
    setSeedsCost(4500);
    setFertilizerCost(9500);
    setPesticideCost(3800);
    setLabourCost(16000);
    setIrrigationCost(3500);
    setMachineryHireCost(8500);
    setTransportOtherCost(4200);
    setEstimatedYieldPerAcreQuintals(26);
    setPricePerQuintal(2350);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Farming Expense & Profitability Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Calculate accurate operational investments, projected yield revenue, and net profit margins per acre
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition flex items-center gap-1.5 self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form Defaults</span>
        </button>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              1. Field & Production Parameters
            </h3>
            <span className="text-xs text-stone-400">Step 1 of 2</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Crop Name / Plan
              </label>
              <input
                type="text"
                value={cropTitle}
                onChange={(e) => setCropTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Land Area (Acres)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={landAreaAcres}
                onChange={(e) => setLandAreaAcres(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <h4 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              2. Operational Cost Breakdown (₹ Total for Plot)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Seeds & Seed Treatment (₹)
                </label>
                <input
                  type="number"
                  value={seedsCost}
                  onChange={(e) => setSeedsCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Fertilizers, Manure & FYM (₹)
                </label>
                <input
                  type="number"
                  value={fertilizerCost}
                  onChange={(e) => setFertilizerCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Crop Protection / Pesticides (₹)
                </label>
                <input
                  type="number"
                  value={pesticideCost}
                  onChange={(e) => setPesticideCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Labour Costs (Sowing, Weeding, Harvest) (₹)
                </label>
                <input
                  type="number"
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Machinery / Tractor / Harvester Hire (₹)
                </label>
                <input
                  type="number"
                  value={machineryHireCost}
                  onChange={(e) => setMachineryHireCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Irrigation, Diesel & Electricity (₹)
                </label>
                <input
                  type="number"
                  value={irrigationCost}
                  onChange={(e) => setIrrigationCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Transportation, Gunny Bags & Mandi Fee (₹)
                </label>
                <input
                  type="number"
                  value={transportOtherCost}
                  onChange={(e) => setTransportOtherCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
            <h4 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              3. Expected Yield & Mandi Price
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Yield per Acre (Quintals)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={estimatedYieldPerAcreQuintals}
                  onChange={(e) => setEstimatedYieldPerAcreQuintals(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Expected Sale Price (₹ / Quintal)
                </label>
                <input
                  type="number"
                  value={pricePerQuintal}
                  onChange={(e) => setPricePerQuintal(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Financial Results & Chart Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Executive Net Profit Card */}
          <div className={`p-6 sm:p-7 rounded-3xl text-white shadow-xl border relative overflow-hidden ${
            finances.isProfitable
              ? 'bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 border-emerald-600/60'
              : 'bg-gradient-to-br from-rose-900 via-rose-800 to-amber-900 border-rose-700/60'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/15">
                Financial Summary for {landAreaAcres} Acres
              </span>
              <span className="text-xs font-bold text-lime-300">
                ROI: {finances.roiPercent}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div>
                <p className="text-xs text-emerald-200 opacity-90">Gross Estimated Revenue</p>
                <p className="text-2xl sm:text-3xl font-black font-serif mt-0.5">
                  ₹{finances.grossRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-emerald-200 mt-0.5">
                  Total {finances.estimatedYieldQuintals} Quintals
                </p>
              </div>

              <div>
                <p className="text-xs text-emerald-200 opacity-90">Total Operational Cost</p>
                <p className="text-2xl sm:text-3xl font-black font-serif mt-0.5">
                  ₹{finances.totalCost.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-emerald-200 mt-0.5">
                  ₹{finances.costPerAcre.toLocaleString('en-IN')} / Acre
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-lime-300">
                  {finances.isProfitable ? 'Net Farm Profit' : 'Net Loss Projection'}
                </p>
                <p className="text-3xl sm:text-4xl font-black font-serif text-white mt-0.5">
                  ₹{Math.abs(finances.netProfit).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-100">Profit / Acre:</span>
                <p className="text-lg font-bold text-lime-300">
                  ₹{finances.profitPerAcre.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Recharts Cost Breakdown Donut Chart */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
            <h4 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              Expense Distribution Breakdown
            </h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {costDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Cost']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue vs Cost Comparison Bar */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md">
            <h4 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              Investment vs Revenue vs Profit Comparison
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonBarData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {comparisonBarData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
