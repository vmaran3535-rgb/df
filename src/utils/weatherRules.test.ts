import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWeatherForFarming, classifyDateOutlook } from './weatherRules';

test('recommends against spraying when rain probability is high', () => {
  const advisories = evaluateWeatherForFarming({
    tempC: 28,
    rainMm: 12,
    rainProbability: 75,
    windSpeedKmh: 10,
    humidityPercent: 85,
    uvIndex: 4
  });

  const spray = advisories.find(a => a.category === 'spraying');
  assert.ok(spray);
  assert.equal(spray.status, 'not_recommended');
  assert.ok(spray.reason.includes('rain'));
});

test('cautions against spraying when wind speed is high', () => {
  const advisories = evaluateWeatherForFarming({
    tempC: 26,
    rainMm: 0,
    rainProbability: 10,
    windSpeedKmh: 24, // High wind
    humidityPercent: 60,
    uvIndex: 6
  });

  const spray = advisories.find(a => a.category === 'spraying');
  assert.ok(spray);
  assert.equal(spray.status, 'caution');
  assert.ok(spray.reason.includes('drift'));
});

test('classifies calendar date as past, forecast or future estimate correctly', () => {
  const today = new Date('2026-11-12T00:00:00Z');
  
  const pastDate = new Date('2026-11-05T00:00:00Z');
  const pastResult = classifyDateOutlook(pastDate, today);
  assert.equal(pastResult.type, 'past');

  const forecastDate = new Date('2026-11-15T00:00:00Z');
  const forecastResult = classifyDateOutlook(forecastDate, today);
  assert.equal(forecastResult.type, 'forecast');

  const futureDate = new Date('2026-12-01T00:00:00Z');
  const futureResult = classifyDateOutlook(futureDate, today);
  assert.equal(futureResult.type, 'future_estimate');
});
