import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Layers, 
  Leaf, 
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface SoilAnalysisResult {
  healthScore: number;
  phEvaluation: string;
  npkStatus: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
  deficiencies?: string[];
  amendmentPlan: string[];
  targetCropAdvice: string;
}

export const SoilHealthView: React.FC = () => {
  const { profile } = useFarm();

  const [ph, setPh] = useState<number>(6.8);
  const [nitrogen, setNitrogen] = useState<number>(240); // kg/ha (low < 280)
  const [phosphorus, setPhosphorus] = useState<number>(18); // kg/ha (medium 10-25)
  const [potassium, setPotassium] = useState<number>(195); // kg/ha (medium 110-280)
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.55); // %
  const [ec, setEc] = useState<number>(0.4); // dS/m (< 1.0 safe)
  const [targetCrop, setTargetCrop] = useState<string>('Paddy (Rice)');
  const [soilTexture, setSoilTexture] = useState<string>('Alluvial Clay Loam');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<SoilAnalysisResult | null>({
    healthScore: 76,
    phEvaluation: '6.8 (Optimal / Slightly Acidic)',
    npkStatus: {
      nitrogen: 'Low (240 kg/ha - Requires Basal Urea / FYM)',
      phosphorus: 'Medium (18 kg/ha - Optimal)',
      potassium: 'Medium (195 kg/ha - Adequate for Tillering)'
    },
    deficiencies: ['Available Nitrogen deficiency', 'Low organic carbon buffer capacity'],
    amendmentPlan: [
      'Apply 5 tonnes of well-decomposed Farm Yard Manure (FYM) or 2 tonnes Vermicompost per acre during field preparation.',
      'Inoculate soil with Azospirillum bio-fertilizer @ 2 kg/acre mixed with 50 kg compost to fix atmospheric nitrogen.',
      'Maintain split applications of Nitrogen (Urea) in 3 stages: Basal (25%), Active Tillering (50%), Panicle Initiation (25%).',
      'Apply Zinc Sulphate (ZnSO4 21%) @ 10 kg/acre basally to avoid seedling Khaira chlorosis.'
    ],
    targetCropAdvice: 'For Paddy in Alluvial Clay Loam, maintaining 2-3 cm standing water with alternate wetting and drying will optimize microbial nitrogen mineralisation.'
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/soil-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ph,
          nitrogen,
          phosphorus,
          potassium,
          organicCarbon,
          ec,
          targetCrop,
          soilTexture
        })
      });

      if (!res.ok) throw new Error('Soil analysis failed');
      const data = await res.json();
      setAnalysisResult(data);
    } catch {
      // Fallback calculation
      const score = Math.round(50 + (organicCarbon * 30) + (nitrogen > 280 ? 10 : 0));
      setAnalysisResult({
        healthScore: Math.min(95, score),
        phEvaluation: `${ph} (${ph < 6.5 ? 'Acidic' : ph > 7.8 ? 'Alkaline' : 'Near Neutral / Optimal'})`,
        npkStatus: {
          nitrogen: nitrogen < 280 ? 'Low' : 'Adequate',
          phosphorus: phosphorus < 11 ? 'Low' : 'Adequate',
          potassium: potassium < 110 ? 'Low' : 'Adequate'
        },
        amendmentPlan: [
          ph < 6.2 ? 'Incorporate Agricultural Dolomite / Lime @ 250 kg/acre to buffer soil acidity' : 'Maintain balanced pH with organic humic mulching',
          'Add 4 tonnes Farm Yard Manure (FYM) or green manure (Dhaincha/Sunnhemp) in-situ',
          'Use Phosphobacteria bio-fertilizer (2 kg/acre) to solubilize fixed soil phosphorus'
        ],
        targetCropAdvice: `For ${targetCrop}, ensure adequate zinc and secondary micronutrient supplementation.`
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Soil Health Card & Nutrient Prescription Assistant
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Input laboratory soil test parameters to generate custom biological and mineral amendment plans
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Govt Soil Health Card Standards</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Enter Soil Test Values
            </h3>
            <span className="text-[11px] text-stone-400">Lab Report</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* pH */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Soil pH (4.0 - 9.5)
              </label>
              <input
                type="number"
                step="0.1"
                min="3.0"
                max="10.0"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">Optimum: 6.5 - 7.5</span>
            </div>

            {/* Electrical Conductivity */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                EC (dS/m - Salinity)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.0"
                max="10.0"
                value={ec}
                onChange={(e) => setEc(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">Normal: &lt; 1.0</span>
            </div>

            {/* Nitrogen */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Available N (kg/ha)
              </label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">Low: &lt;280 kg/ha</span>
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Available P (kg/ha)
              </label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">Medium: 11 - 25</span>
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Available K (kg/ha)
              </label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">Medium: 110 - 280</span>
            </div>

            {/* Organic Carbon */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Organic Carbon (%)
              </label>
              <input
                type="number"
                step="0.05"
                value={organicCarbon}
                onChange={(e) => setOrganicCarbon(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
              <span className="text-[10px] text-stone-400">High: &gt; 0.75%</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Target Crop to Cultivate
            </label>
            <select
              value={targetCrop}
              onChange={(e) => setTargetCrop(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
            >
              <option value="Paddy (Rice)">Paddy / Rice (Samba / Kuruvai)</option>
              <option value="Wheat">Wheat (Rabi Grain)</option>
              <option value="Tomato">Tomato (Hybrid Vegetables)</option>
              <option value="Cotton">Cotton (Kapas)</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Banana">Banana (Robusta / Grand Naine)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Soil Texture
            </label>
            <select
              value={soilTexture}
              onChange={(e) => setSoilTexture(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
            >
              <option value="Alluvial Clay Loam">Alluvial Clay Loam</option>
              <option value="Black Cotton Soil">Black Cotton Soil (Vertisol)</option>
              <option value="Red Sandy Loam">Red Sandy Loam</option>
              <option value="Clayey Loam">Heavy Clay Loam</option>
            </select>
          </div>

          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleRunAnalysis}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Evaluating Soil Fertility...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-lime-300" />
                <span>Generate Soil Health Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Right Diagnosis & Prescriptions (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {analysisResult && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-md space-y-5">
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                    Comprehensive Soil Health Index
                  </span>
                  <h4 className="text-xl font-extrabold font-serif mt-0.5">
                    {analysisResult.healthScore >= 75 ? 'Healthy Fertile Soil' : 'Moderate Fertility - Amendments Advised'}
                  </h4>
                  <p className="text-xs text-emerald-100/90 mt-1">
                    pH Status: <strong>{analysisResult.phEvaluation}</strong>
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-center shrink-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-300">Score</span>
                  <p className="text-3xl font-black text-lime-300 font-serif">
                    {analysisResult.healthScore} <span className="text-sm font-normal text-white">/ 100</span>
                  </p>
                </div>
              </div>

              {/* N-P-K Status Tiles */}
              <div>
                <h5 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
                  Primary Nutrient Analysis
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Available Nitrogen (N)</span>
                    <p className="text-sm font-black text-stone-900 dark:text-white mt-1">
                      {analysisResult.npkStatus.nitrogen}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Available Phosphorus (P)</span>
                    <p className="text-sm font-black text-stone-900 dark:text-white mt-1">
                      {analysisResult.npkStatus.phosphorus}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Available Potassium (K)</span>
                    <p className="text-sm font-black text-stone-900 dark:text-white mt-1">
                      {analysisResult.npkStatus.potassium}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Amendment Plan */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <h5 className="font-extrabold text-xs text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prescribed Biological & Mineral Soil Amendment Plan</span>
                </h5>
                <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  {analysisResult.amendmentPlan.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Crop Specific Advice */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                  Crop Tailoring for {targetCrop}:
                </span>
                <p className="leading-relaxed">{analysisResult.targetCropAdvice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
