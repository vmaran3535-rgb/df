/**
 * Agricultural Weather Advisory Engine
 * Determines safe, advised, and cautioned farming operations based on microclimate conditions
 */

export interface WeatherConditionSummary {
  tempC: number;
  rainMm: number;
  rainProbability: number;
  windSpeedKmh: number;
  humidityPercent: number;
  uvIndex: number;
}

export interface FarmingActivityAdvisory {
  activity: string;
  category: 'spraying' | 'irrigation' | 'fertilizer' | 'harvesting' | 'sowing' | 'fieldwork';
  status: 'recommended' | 'caution' | 'not_recommended';
  reason: string;
  tip: string;
}

export function evaluateWeatherForFarming(weather: WeatherConditionSummary): FarmingActivityAdvisory[] {
  const advisories: FarmingActivityAdvisory[] = [];

  // 1. Chemical/Biopesticide Spraying
  if (weather.rainProbability > 40 || weather.rainMm > 2) {
    advisories.push({
      activity: 'Pesticide & Foliar Spraying',
      category: 'spraying',
      status: 'not_recommended',
      reason: 'High risk of rain washing away foliar sprays and wasting inputs.',
      tip: 'Postpone spraying until weather clears for at least 4-6 dry hours.'
    });
  } else if (weather.windSpeedKmh > 18) {
    advisories.push({
      activity: 'Pesticide & Foliar Spraying',
      category: 'spraying',
      status: 'caution',
      reason: 'Wind speed exceeds 18 km/h causing spray drift and uneven droplet deposit.',
      tip: 'Spray early in the morning when wind speeds are usually lower (< 12 km/h).'
    });
  } else if (weather.tempC > 35) {
    advisories.push({
      activity: 'Pesticide & Foliar Spraying',
      category: 'spraying',
      status: 'caution',
      reason: 'High daytime temperatures accelerate droplet evaporation and risk leaf scorch.',
      tip: 'Conduct foliar application in late afternoon (after 4 PM).'
    });
  } else {
    advisories.push({
      activity: 'Pesticide & Foliar Spraying',
      category: 'spraying',
      status: 'recommended',
      reason: 'Calm winds and low rain probability provide optimal spray retention.',
      tip: 'Ideal window. Use a sticker/spreader agent for maximum absorption.'
    });
  }

  // 2. Field Irrigation
  if (weather.rainMm > 8 || weather.rainProbability > 65) {
    advisories.push({
      activity: 'Heavy Field Irrigation',
      category: 'irrigation',
      status: 'not_recommended',
      reason: 'Substantial natural rainfall expected. Extra irrigation causes waterlogging.',
      tip: 'Conserve water and power. Clear drainage furrows in low-lying fields.'
    });
  } else if (weather.tempC > 34 && weather.humidityPercent < 45) {
    advisories.push({
      activity: 'Crop Irrigation / Drip Run',
      category: 'irrigation',
      status: 'recommended',
      reason: 'High evapotranspiration due to hot, dry air; root zone needs moisture replenishment.',
      tip: 'Run drip systems during early morning to reduce direct evaporation loss.'
    });
  } else {
    advisories.push({
      activity: 'Routine Irrigation',
      category: 'irrigation',
      status: 'recommended',
      reason: 'Normal climatic demand.',
      tip: 'Irrigate based on crop critical stages (tillering, flowering, or fruit bulking).'
    });
  }

  // 3. Fertilizer Broadcasting (Granular Urea/DAP)
  if (weather.rainMm > 25) {
    advisories.push({
      activity: 'Granular Fertilizer Application',
      category: 'fertilizer',
      status: 'not_recommended',
      reason: 'Torrential rain risks nutrient runoff and leaching beyond root zones.',
      tip: 'Hold broadcast fertilizers until soil is moist but not saturated.'
    });
  } else if (weather.rainMm >= 2 && weather.rainMm <= 15) {
    advisories.push({
      activity: 'Granular Fertilizer Top-Dressing',
      category: 'fertilizer',
      status: 'recommended',
      reason: 'Light rainfall aids immediate dissolution and uptake of nitrogen/potash in soil.',
      tip: 'Broadcast right before or after light showers for rapid absorption.'
    });
  } else {
    advisories.push({
      activity: 'Fertilizer Application',
      category: 'fertilizer',
      status: 'caution',
      reason: 'Soil must have sufficient moisture before top-dressing Urea.',
      tip: 'Always ensure light irrigation follows fertilizer broadcasting in dry spells.'
    });
  }

  // 4. Harvesting & Threshing
  if (weather.rainProbability > 30 || weather.rainMm > 1) {
    advisories.push({
      activity: 'Crop Harvesting & Sun Drying',
      category: 'harvesting',
      status: 'not_recommended',
      reason: 'Rain will increase grain/produce moisture, risking mold, rotting, or lodging.',
      tip: 'Cover harvested produce with tarpaulins and delay combine harvesting.'
    });
  } else {
    advisories.push({
      activity: 'Harvesting & Threshing',
      category: 'harvesting',
      status: 'recommended',
      reason: 'Clear skies and dry air ensure low grain moisture and clean threshing.',
      tip: 'Harvest produce when morning dew has fully evaporated.'
    });
  }

  // 5. Land Preparation & Tillage
  if (weather.rainMm > 20) {
    advisories.push({
      activity: 'Deep Tillage & Tractor Operations',
      category: 'fieldwork',
      status: 'not_recommended',
      reason: 'Wet clayey soil leads to compaction, tractor tyre slip, and poor tilth.',
      tip: 'Wait 2-3 sunny days for soil to reach friable "vattara" condition.'
    });
  } else {
    advisories.push({
      activity: 'Land Preparation & Ploughing',
      category: 'fieldwork',
      status: 'recommended',
      reason: 'Suitable soil workable moisture level.',
      tip: 'Plough across slope contours to enhance rain infiltration.'
    });
  }

  return advisories;
}

/**
 * Determines whether a date is in historical past, 7-day forecast window, or extended future
 */
export function classifyDateOutlook(targetDate: Date, today: Date = new Date()): {
  type: 'past' | 'forecast' | 'future_estimate';
  dayDiff: number;
  label: string;
} {
  const t = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const c = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((t.getTime() - c.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      type: 'past',
      dayDiff: diffDays,
      label: `Historical Record (${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago)`
    };
  } else if (diffDays <= 7) {
    return {
      type: 'forecast',
      dayDiff: diffDays,
      label: diffDays === 0 ? 'Today (Live Forecast)' : `Official Forecast (+${diffDays} day${diffDays > 1 ? 's' : ''})`
    };
  } else {
    return {
      type: 'future_estimate',
      dayDiff: diffDays,
      label: `Climatological Projection (+${diffDays} days)`
    };
  }
}
