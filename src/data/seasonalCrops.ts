export interface SeasonalCropRecommendation {
  id: string;
  cropName: string;
  tamilName: string;
  hindiName: string;
  season: 'Rabi' | 'Kharif' | 'Zaid' | 'Year-round';
  suitableMonths: string;
  growingDuration: string;
  soilRequirements: string;
  waterRequirements: 'High' | 'Moderate' | 'Low';
  suitableClimate: string;
  targetStates: string[];
  yieldPotential: string;
  estimatedProfitAcre: string;
  potentialChallenges: string[];
  keyTips: string[];
  isMonthHighlight?: boolean;
}

export const BEST_FARMING_IDEAS_NOVEMBER: {
  title: string;
  description: string;
  actionItems: string[];
  tag: string;
}[] = [
  {
    title: 'Thaladi & Samba Paddy Care (Tamil Nadu & Delta)',
    description: 'Post-transplanting weed management and second split of Nitrogen + Potash application for tillering surge.',
    actionItems: [
      'Maintain 2 to 5 cm water level; avoid deep flooding during early tillering.',
      'Apply 25 kg Urea + 15 kg MOP mixed with 5 kg Neem cake per acre.',
      'Deploy pheromone traps (5 traps/acre) to monitor Yellow Stem Borer.'
    ],
    tag: 'Delta Special'
  },
  {
    title: 'Rabi Wheat Sowing Window (Punjab, Haryana & UP)',
    description: 'November 10 - November 25 is the golden sowing window for maximum tillering and heat-avoidance at maturity.',
    actionItems: [
      'Use certified varieties like HD-2967, HD-3086, DBW-187, or PBW-725.',
      'Seed treatment with Trichoderma viride @ 4g/kg seed or Carboxin @ 2g/kg.',
      'Sow with Happy Seeder or Zero Tillage drill directly into paddy stubble to conserve moisture.'
    ],
    tag: 'Rabi Window'
  },
  {
    title: 'Rabi Onion & Winter Vegetables',
    description: 'Transplanting 45-day onion seedlings and winter brassicas (cabbage, cauliflower).',
    actionItems: [
      'Prepare raised beds with drip lateral lines for 35% water saving.',
      'Incorporate vermicompost @ 2 tonnes/acre + Pseudomonas fluorescens.',
      'Install yellow sticky traps (10/acre) to catch thrips and whiteflies.'
    ],
    tag: 'Horticulture'
  },
  {
    title: 'Pulses in Rice Fallows (Urdbean / Blackgram)',
    description: 'Sow blackgram (ADT 5, VBN 6) in standing paddy 7-10 days before harvest (Paddy fallow pulses).',
    actionItems: [
      'Broadcast seed at 10 kg/acre when soil moisture is in wax condition.',
      'Low investment with high net return; enriches soil nitrogen through root nodules.'
    ],
    tag: 'Pulse Booster'
  }
];

export const SEASONAL_RECOMMENDATIONS: SeasonalCropRecommendation[] = [
  {
    id: 'rec-wheat-rabi',
    cropName: 'Wheat (Rabi Grain)',
    tamilName: 'கோதுமை',
    hindiName: 'गेहूं (रबी)',
    season: 'Rabi',
    suitableMonths: 'November – December',
    growingDuration: '120 – 135 Days',
    soilRequirements: 'Well-drained fertile clay loam or loam with pH 6.0 – 7.5',
    waterRequirements: 'Moderate',
    suitableClimate: 'Cool winter with moderate sunshine during vegetative; warm during ripening',
    targetStates: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan'],
    yieldPotential: '20 – 26 Quintals / Acre',
    estimatedProfitAcre: '₹35,000 – ₹55,000',
    potentialChallenges: ['Yellow rust in humid mornings', 'Terminal heat stress if sown late', 'Weed infestation (Phalaris minor)'],
    keyTips: [
      'First irrigation at Crown Root Initiation (CRI) stage at 20-25 days is critical.',
      'Use zero-till seed cum fertilizer drill to save diesel and retain soil organic mulch.'
    ],
    isMonthHighlight: true
  },
  {
    id: 'rec-paddy-samba',
    cropName: 'Samba / Thaladi Paddy (Rice)',
    tamilName: 'சாம்பா / தாளடி நெல்',
    hindiName: 'धान (रबी / सांबा)',
    season: 'Rabi',
    suitableMonths: 'October – January',
    growingDuration: '130 – 145 Days',
    soilRequirements: 'Heavy clay soils or alluvial clay loam with good water retention',
    waterRequirements: 'High',
    suitableClimate: 'North-East Monsoon season with humid conditions, followed by sunny ripening period',
    targetStates: ['Tamil Nadu', 'Andhra Pradesh', 'Kerala'],
    yieldPotential: '24 – 32 Quintals / Acre',
    estimatedProfitAcre: '₹40,000 – ₹62,000',
    potentialChallenges: ['Neck blast during flowering rains', 'Lodging due to cyclonic wind', 'Bacterial leaf blight'],
    keyTips: [
      'Opt for blast-resistant medium duration varieties (BPT 5204, CR 1009 Sub 1, CO 51, ADT 53).',
      'Follow Alternate Wetting and Drying (AWD) irrigation to reduce water use by 30% without yield loss.'
    ],
    isMonthHighlight: true
  },
  {
    id: 'rec-blackgram',
    cropName: 'Blackgram / Urdbean (Rice Fallow)',
    tamilName: 'உளுந்து (நெல் தரிசு)',
    hindiName: 'उड़द (चावल परती)',
    season: 'Rabi',
    suitableMonths: 'November – January',
    growingDuration: '65 – 75 Days',
    soilRequirements: 'Residual moisture in clay loam and alluvial delta soils',
    waterRequirements: 'Low',
    suitableClimate: 'Warm temperate, utilizes residual winter moisture',
    targetStates: ['Tamil Nadu', 'Andhra Pradesh', 'Odisha'],
    yieldPotential: '4 – 6 Quintals / Acre',
    estimatedProfitAcre: '₹22,000 – ₹35,000',
    potentialChallenges: ['Yellow mosaic virus transmitted by whitefly', 'Pod borer attack'],
    keyTips: [
      'Zero land preparation needed; broadcast seeds into standing paddy 7-10 days before harvest.',
      'Spray 2% DAP foliar spray at flowering to double pod set.'
    ],
    isMonthHighlight: true
  },
  {
    id: 'rec-mustard',
    cropName: 'Mustard / Sarson',
    tamilName: 'கடுகு',
    hindiName: 'सरसों (पीली / भूरी)',
    season: 'Rabi',
    suitableMonths: 'October – November',
    growingDuration: '105 – 125 Days',
    soilRequirements: 'Light to heavy loamy soil, tolerates salinity',
    waterRequirements: 'Low',
    suitableClimate: 'Cool and dry winter, abundant sunshine',
    targetStates: ['Rajasthan', 'Uttar Pradesh', 'Haryana', 'Madhya Pradesh'],
    yieldPotential: '8 – 12 Quintals / Acre',
    estimatedProfitAcre: '₹28,000 – ₹45,000',
    potentialChallenges: ['Aphid infestation during cloudy flowering weather', 'White rust'],
    keyTips: [
      'Maintain 45 cm row spacing. Sulphur application (20 kg/acre) increases oil content by 15%.'
    ]
  },
  {
    id: 'rec-tomato-winter',
    cropName: 'Winter Hybrid Tomato',
    tamilName: 'குளிர்கால தக்காளி',
    hindiName: 'टमाटर (शीतकालीन)',
    season: 'Rabi',
    suitableMonths: 'October – February',
    growingDuration: '110 – 130 Days',
    soilRequirements: 'Deep red loam or sandy loam with good organic matter and pH 6.0 – 7.0',
    waterRequirements: 'Moderate',
    suitableClimate: 'Mild sunny days and cool nights promote heavy fruit set and deep red lycopene pigment',
    targetStates: ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Andhra Pradesh'],
    yieldPotential: '150 – 220 Quintals / Acre',
    estimatedProfitAcre: '₹80,000 – ₹1,80,000',
    potentialChallenges: ['Early and late blight fungi', 'Fruit borer caterpillars', 'Price volatility in Mandi'],
    keyTips: [
      'Always stake vines with bamboo or trellising wires to prevent fruit contact with soil.',
      'Mulch beds with silver-black reflective plastic mulch to deter aphids and thrips.'
    ],
    isMonthHighlight: true
  },
  {
    id: 'rec-cotton-kharif',
    cropName: 'Bt Cotton (Medium/Long Staple)',
    tamilName: 'பருத்தி',
    hindiName: 'कपास (खरीफ)',
    season: 'Kharif',
    suitableMonths: 'May – July',
    growingDuration: '150 – 170 Days',
    soilRequirements: 'Deep black cotton soils (Vertisols) or fertile loams',
    waterRequirements: 'Moderate',
    suitableClimate: 'Warm tropical climate with sunny boll opening period',
    targetStates: ['Gujarat', 'Maharashtra', 'Telangana', 'Andhra Pradesh', 'Tamil Nadu'],
    yieldPotential: '10 – 15 Quintals / Acre',
    estimatedProfitAcre: '₹45,000 – ₹70,000',
    potentialChallenges: ['Pink bollworm infestation in late season', 'Whitefly / CLCuV'],
    keyTips: [
      'Install pheromone traps early at 45 days. Avoid indiscriminate pyrethroid sprays to conserve natural predators.'
    ]
  },
  {
    id: 'rec-groundnut-summer',
    cropName: 'Summer Groundnut / Peanut',
    tamilName: 'வேர்க்கடலை (கோடை)',
    hindiName: 'मूंगफली (जायद/ग्रीष्म)',
    season: 'Zaid',
    suitableMonths: 'January – March',
    growingDuration: '100 – 110 Days',
    soilRequirements: 'Sandy loam or light red sandy soil for easy peg penetration and pod development',
    waterRequirements: 'Moderate',
    suitableClimate: 'Bright sunny days, warm temperatures',
    targetStates: ['Gujarat', 'Tamil Nadu', 'Andhra Pradesh', 'Karnataka'],
    yieldPotential: '12 – 16 Quintals / Acre',
    estimatedProfitAcre: '₹40,000 – ₹60,000',
    potentialChallenges: ['Tikka leaf spot', 'Spodoptera caterpillar'],
    keyTips: [
      'Apply 200 kg Gypsum per acre at 40-45 days (flowering/pegging) for bold pods and high oil content.'
    ]
  }
];
