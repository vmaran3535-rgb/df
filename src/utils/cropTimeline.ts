/**
 * Digital Farming - Crop Timeline Engine
 * Calculates growth stages, milestone dates, and pending activities
 * based on planting date, crop variety duration, and cultivation type.
 */

export interface GrowthStage {
  id: string;
  name: string;
  startDay: number;
  endDay: number;
  description: string;
  activities: string[];
  waterRequirement: 'High' | 'Moderate' | 'Low' | 'Critical';
  fertilizerAdvice?: string;
  pestWatch: string[];
}

export interface CropProfile {
  id: string;
  name: string;
  defaultDurationDays: number;
  stages: {
    name: string;
    percentStart: number;
    percentEnd: number;
    description: string;
    activities: string[];
    waterRequirement: 'High' | 'Moderate' | 'Low' | 'Critical';
    fertilizerAdvice?: string;
    pestWatch: string[];
  }[];
}

export const CROP_PROFILES: Record<string, CropProfile> = {
  Paddy: {
    id: 'paddy',
    name: 'Paddy / Rice',
    defaultDurationDays: 120,
    stages: [
      {
        name: 'Nursery & Transplanting',
        percentStart: 0,
        percentEnd: 18,
        description: 'Seed treatment, nursery preparation, and field transplanting at 20-25 days.',
        activities: ['Soil puddling and basal fertilizer application', 'Transplant seedlings at 2-3 cm depth'],
        waterRequirement: 'High',
        fertilizerAdvice: 'Apply basal dose of DAP (50 kg/acre) and MOP (25 kg/acre)',
        pestWatch: ['Thrips', 'Stem borer nursery signs']
      },
      {
        name: 'Tillering & Vegetative Growth',
        percentStart: 18,
        percentEnd: 45,
        description: 'Active tillering and root development. Critical vegetative stage.',
        activities: ['First top dressing of Nitrogen', 'Weed removal or conoweeder operation'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Apply 30 kg Urea per acre at active tillering (Day 25-30)',
        pestWatch: ['Yellow stem borer', 'Leaf folder', 'Brown planthopper']
      },
      {
        name: 'Panicle Initiation & Flowering',
        percentStart: 45,
        percentEnd: 75,
        description: 'Booting stage, panicle emergence, and flowering. Moisture stress here causes spikelet sterility.',
        activities: ['Second top dressing of Potash & Urea', 'Maintain 2-5 cm standing water'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Apply 15 kg Urea + 15 kg MOP per acre at panicle initiation',
        pestWatch: ['Rice blast', 'Sheath blight', 'Bacterial leaf blight']
      },
      {
        name: 'Grain Filling & Milking',
        percentStart: 75,
        percentEnd: 92,
        description: 'Milk to dough stage. Grains fill with starch.',
        activities: ['Monitor panicle bending', 'Begin alternate wetting and drying'],
        waterRequirement: 'Moderate',
        fertilizerAdvice: 'Foliar spray of 1% 13-0-45 (Potassium nitrate) if pale',
        pestWatch: ['Earhead bug / Gandhi bug', 'False smut']
      },
      {
        name: 'Maturation & Harvest',
        percentStart: 92,
        percentEnd: 100,
        description: 'Grains turn golden yellow. Drain field 10 days before harvesting.',
        activities: ['Drain standing water', 'Harvest when 85% of grains are golden brown'],
        waterRequirement: 'Low',
        pestWatch: ['Bird damage', 'Grain discoloration']
      }
    ]
  },
  Wheat: {
    id: 'wheat',
    name: 'Wheat',
    defaultDurationDays: 125,
    stages: [
      {
        name: 'Crown Root Initiation (CRI)',
        percentStart: 0,
        percentEnd: 20,
        description: 'First 20-25 days after sowing. Most critical irrigation stage.',
        activities: ['First irrigation at 21 days', 'Weed control spray'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Basal application of NPK 12:32:16 + Zinc sulphate',
        pestWatch: ['Termites', 'Root aphids']
      },
      {
        name: 'Tillering & Jointing',
        percentStart: 20,
        percentEnd: 48,
        description: 'Stem elongation and maximum tiller formation.',
        activities: ['Second irrigation', 'First nitrogen top dressing'],
        waterRequirement: 'High',
        fertilizerAdvice: 'Broadcast 40 kg Urea per acre before irrigation',
        pestWatch: ['Pink stem borer', 'Armyworm']
      },
      {
        name: 'Booting & Heading',
        percentStart: 48,
        percentEnd: 75,
        description: 'Spike emergence and flowering.',
        activities: ['Third irrigation at heading', 'Inspect for rust diseases'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Foliar zinc and boron spray if deficiency observed',
        pestWatch: ['Yellow/Brown rust', 'Powdery mildew']
      },
      {
        name: 'Grain Development & Dough Stage',
        percentStart: 75,
        percentEnd: 92,
        description: 'Soft dough to hard dough grain formation.',
        activities: ['Final light irrigation', 'Protect against strong wind lodging'],
        waterRequirement: 'Moderate',
        pestWatch: ['Aphids', 'Loose smut']
      },
      {
        name: 'Ripening & Harvesting',
        percentStart: 92,
        percentEnd: 100,
        description: 'Straw turns golden yellow and moisture drops below 14%.',
        activities: ['Combine harvesting or manual reaping', 'Grain threshing and storage'],
        waterRequirement: 'Low',
        pestWatch: ['Storage weevils']
      }
    ]
  },
  Tomato: {
    id: 'tomato',
    name: 'Tomato',
    defaultDurationDays: 110,
    stages: [
      {
        name: 'Seedling & Establishment',
        percentStart: 0,
        percentEnd: 22,
        description: 'Transplanting 25-day seedlings to raised beds with drip and mulch.',
        activities: ['Root dip in bio-fungicide', 'Gap filling within 7 days'],
        waterRequirement: 'Moderate',
        fertilizerAdvice: 'Basal FYM 10 tonnes/acre + NPK 19:19:19 fertigation',
        pestWatch: ['Damping off', 'Thrips (leaf curl vector)']
      },
      {
        name: 'Vegetative & Staking',
        percentStart: 22,
        percentEnd: 45,
        description: 'Vigorous branching and shoot elongation. Staking with bamboo & twine.',
        activities: ['Erect stakes and trellising', 'Side shoot pruning'],
        waterRequirement: 'High',
        fertilizerAdvice: 'Fertigate 12:61:0 (MAP) for root & branch vigour',
        pestWatch: ['Pinworm (Tuta absoluta)', 'Leaf miner', 'Whiteflies']
      },
      {
        name: 'Flowering & Early Fruit Set',
        percentStart: 45,
        percentEnd: 70,
        description: 'Profuse blooming and fruit initiation. Consistent watering is vital.',
        activities: ['Pollination enhancement', 'Mulch maintenance to prevent blossom end rot'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Apply Calcium Nitrate + Boron to prevent blossom end rot',
        pestWatch: ['Fruit borer (Helicoverpa)', 'Early blight', 'Bacterial wilt']
      },
      {
        name: 'Fruit Bulking & Color Break',
        percentStart: 70,
        percentEnd: 90,
        description: 'Green fruits expand and develop pink/breaker color.',
        activities: ['Inspect fruit undersides', 'Increase potassium fertigation'],
        waterRequirement: 'High',
        fertilizerAdvice: 'Fertigate 0:0:50 (Potassium sulphate) for fruit firmness',
        pestWatch: ['Late blight', 'Fruit rot']
      },
      {
        name: 'Harvesting Flushes',
        percentStart: 90,
        percentEnd: 100,
        description: 'Multiple pickings every 3-4 days at breaker to red-ripe stage.',
        activities: ['Morning harvesting', 'Grading by size and firmness'],
        waterRequirement: 'Moderate',
        pestWatch: ['Fruit damage', 'Post-harvest rot']
      }
    ]
  },
  Cotton: {
    id: 'cotton',
    name: 'Cotton',
    defaultDurationDays: 160,
    stages: [
      {
        name: 'Germination & Square Formation',
        percentStart: 0,
        percentEnd: 25,
        description: 'Sowing on ridges and initial square (flower bud) initiation.',
        activities: ['Gap filling and thinning', 'Inter-cultivation for weed control'],
        waterRequirement: 'Moderate',
        fertilizerAdvice: 'Basal application of DAP and Potash',
        pestWatch: ['Jassids', 'Aphids', 'Thrips']
      },
      {
        name: 'Peak Flowering & Boll Development',
        percentStart: 25,
        percentEnd: 65,
        description: 'Cream flowers open, turn pink, and young bolls form.',
        activities: ['Monitor square drop', 'Nipping of terminal shoots at 90 days'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Top dress Urea in two splits + 1% Magnesium Sulphate spray',
        pestWatch: ['Pink bollworm', 'Spotted bollworm', 'Whitefly']
      },
      {
        name: 'Boll Maturation & Bursting',
        percentStart: 65,
        percentEnd: 90,
        description: 'Bolls mature and open revealing clean white lint.',
        activities: ['Stop heavy irrigation', 'Avoid chemical spray on open lint'],
        waterRequirement: 'Low',
        pestWatch: ['Red cotton bug', 'Dusky cotton bug', 'Grey mildew']
      },
      {
        name: 'Picking & Field Clean-up',
        percentStart: 90,
        percentEnd: 100,
        description: 'Manual cotton picking in 2-3 flushes on sunny dry mornings.',
        activities: ['Pick clean dry cotton', 'Store in dry ventilated sheds'],
        waterRequirement: 'Low',
        pestWatch: ['Stained lint', 'Residue pests']
      }
    ]
  },
  Sugarcane: {
    id: 'sugarcane',
    name: 'Sugarcane',
    defaultDurationDays: 330,
    stages: [
      {
        name: 'Germination & Sett Establishment',
        percentStart: 0,
        percentEnd: 12,
        description: 'Sett planting in deep furrows and bud sprouting.',
        activities: ['Two-eye sett treatment with carbendazim', 'Light irrigation'],
        waterRequirement: 'Moderate',
        fertilizerAdvice: 'Basal SSP 150 kg/acre + FYM',
        pestWatch: ['Early shoot borer', 'Termites']
      },
      {
        name: 'Tillering & Formative Phase',
        percentStart: 12,
        percentEnd: 35,
        description: 'Active tillering and root development up to 120 days.',
        activities: ['Partial earthing up', 'Weeding and mulching'],
        waterRequirement: 'High',
        fertilizerAdvice: 'Apply 1st and 2nd split of Urea + MOP',
        pestWatch: ['Early shoot borer', 'Scale insect']
      },
      {
        name: 'Grand Growth Phase',
        percentStart: 35,
        percentEnd: 75,
        description: 'Rapid cane elongation and internode formation.',
        activities: ['Heavy earthing up at 150 days', 'Propping and detrashing dry leaves'],
        waterRequirement: 'Critical',
        fertilizerAdvice: 'Final Nitrogen application before 150 days',
        pestWatch: ['Internode borer', 'Top borer', 'Red rot']
      },
      {
        name: 'Ripening & Sucrose Accumulation',
        percentStart: 75,
        percentEnd: 100,
        description: 'Sucrose builds up in stalks as weather cools.',
        activities: ['Withhold water 15 days before harvest', 'Brix testing for maturity'],
        waterRequirement: 'Low',
        pestWatch: ['Pyrilla', 'Smut']
      }
    ]
  }
};

/**
 * Calculates current status, days elapsed, and current stage
 */
export function calculateCropTracking(
  cropType: string,
  plantingDateStr: string,
  customDuration?: number,
  currentDateOverride?: Date
) {
  const profile = CROP_PROFILES[cropType] || CROP_PROFILES['Paddy'];
  const durationDays = customDuration && customDuration > 30 ? customDuration : profile.defaultDurationDays;
  
  const plantingDate = new Date(plantingDateStr);
  const now = currentDateOverride || new Date();
  
  const diffTime = now.getTime() - plantingDate.getTime();
  const rawElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.max(0, Math.min(rawElapsed, durationDays));
  const daysRemaining = Math.max(0, durationDays - daysElapsed);
  const percentComplete = Math.min(100, Math.max(0, Math.round((daysElapsed / durationDays) * 100)));

  // Compute stages with concrete day numbers
  const stages: GrowthStage[] = profile.stages.map((s, idx) => {
    const startDay = Math.round((s.percentStart / 100) * durationDays);
    const endDay = Math.round((s.percentEnd / 100) * durationDays);
    return {
      id: `${profile.id}-stage-${idx + 1}`,
      name: s.name,
      startDay,
      endDay,
      description: s.description,
      activities: s.activities,
      waterRequirement: s.waterRequirement,
      fertilizerAdvice: s.fertilizerAdvice,
      pestWatch: s.pestWatch
    };
  });

  // Find active stage
  let activeStage = stages[stages.length - 1];
  for (const st of stages) {
    if (daysElapsed >= st.startDay && daysElapsed <= st.endDay) {
      activeStage = st;
      break;
    }
  }

  // Next critical activity
  const nextActivity = activeStage.activities[0] || 'Routine crop health monitoring';

  // Projected harvest date
  const harvestDate = new Date(plantingDate);
  harvestDate.setDate(harvestDate.getDate() + durationDays);

  return {
    cropType: profile.name,
    durationDays,
    daysElapsed,
    daysRemaining,
    percentComplete,
    stages,
    activeStage,
    nextActivity,
    harvestDate: harvestDate.toISOString().split('T')[0],
    isHarvested: daysRemaining === 0
  };
}
