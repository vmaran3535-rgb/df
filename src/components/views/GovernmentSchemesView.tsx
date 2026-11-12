import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Sparkles, 
  Building2,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { GOV_SCHEMES, GovScheme } from '../../data/govSchemes';

export const GovernmentSchemesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const categories = ['All', 'Direct Benefit', 'Insurance', 'Irrigation', 'Credit', 'Machinery', 'Soil & Organic'];

  const filteredSchemes = GOV_SCHEMES.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nodalAgency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesState = selectedState === 'All' || s.stateAvailability === 'All India' || s.stateAvailability === selectedState;
    return matchesSearch && matchesCat && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Indian Government Agriculture Schemes & Subsidies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Verified financial assistance, insurance, and equipment subsidy portals under Ministry of Agriculture & Farmers Welfare
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official DBT Verified</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scheme name, keywords (e.g. 6000 subsidy, drip irrigation, insurance)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs text-stone-400 font-bold">Region:</span>
            {['All', 'All India', 'Tamil Nadu'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedState === st
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-bold shrink-0">Scheme Type:</span>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {scheme.category}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white mt-1.5 font-serif leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Nodal Authority: {scheme.nodalAgency}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0">
                  {scheme.stateAvailability}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {scheme.shortDesc}
              </p>

              {/* Financial Subsidy Highlight Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 mb-4">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-300">
                  Financial Assistance / Benefit
                </span>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-100 mt-0.5 leading-snug">
                  {scheme.financialAssistance}
                </p>
              </div>

              {/* Eligibility & Documents Accordion */}
              <div className="space-y-3 mb-4 text-xs">
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                    Key Eligibility Criteria:
                  </span>
                  <ul className="space-y-1 text-stone-600 dark:text-stone-300 text-[11px]">
                    {scheme.eligibility.map((el, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                    Required Documents:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documentsRequired.map((doc, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-600 dark:text-stone-300">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Last Updated & Official Application Button */}
            <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Last updated: {scheme.lastUpdated}</span>
              </span>

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <span>Official Govt Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
