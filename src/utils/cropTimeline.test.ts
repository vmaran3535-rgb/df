import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCropTracking, CROP_PROFILES } from './cropTimeline';

test('calculates Paddy crop tracking milestones accurately', () => {
  // Sown 30 days ago
  const baseDate = new Date('2026-10-10T00:00:00Z');
  const now = new Date('2026-11-10T00:00:00Z'); // 31 days difference
  
  const result = calculateCropTracking('Paddy', '2026-10-10', 120, now);
  
  assert.equal(result.durationDays, 120);
  assert.equal(result.daysElapsed, 31);
  assert.equal(result.daysRemaining, 89);
  assert.ok(result.percentComplete > 20 && result.percentComplete < 35);
  assert.equal(result.activeStage.name, 'Tillering & Vegetative Growth');
  assert.ok(result.activeStage.waterRequirement === 'Critical');
  assert.ok(result.activeStage.fertilizerAdvice?.includes('Urea'));
});

test('handles completed crop status when days exceed duration', () => {
  const baseDate = new Date('2026-01-01T00:00:00Z');
  const now = new Date('2026-06-01T00:00:00Z'); // > 150 days
  const result = calculateCropTracking('Wheat', '2026-01-01', 125, now);
  
  assert.equal(result.daysElapsed, 125);
  assert.equal(result.daysRemaining, 0);
  assert.equal(result.percentComplete, 100);
  assert.equal(result.isHarvested, true);
});

test('handles custom crop duration if specified by farmer', () => {
  const now = new Date('2026-11-12T00:00:00Z');
  const result = calculateCropTracking('Tomato', '2026-11-01', 90, now);
  assert.equal(result.durationDays, 90);
  assert.equal(result.daysElapsed, 11);
  assert.equal(result.daysRemaining, 79);
});
