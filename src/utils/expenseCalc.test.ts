import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFarmingFinances } from './expenseCalc';

test('calculates farm investment, revenue and ROI correctly', () => {
  const result = calculateFarmingFinances({
    landAreaAcres: 2,
    seedsCost: 4000,
    fertilizerCost: 8000,
    pesticideCost: 3000,
    labourCost: 12000,
    irrigationCost: 2000,
    machineryHireCost: 6000,
    transportOtherCost: 3000,
    estimatedYieldPerAcreQuintals: 25, // Total 50 quintals
    pricePerQuintal: 2300 // MSP or mandi rate
  });

  // Total cost = 4000+8000+3000+12000+2000+6000+3000 = 38,000
  assert.equal(result.totalCost, 38000);
  assert.equal(result.costPerAcre, 19000);
  assert.equal(result.estimatedYieldQuintals, 50);
  // Revenue = 50 * 2300 = 115,000
  assert.equal(result.grossRevenue, 115000);
  // Net profit = 115,000 - 38,000 = 77,000
  assert.equal(result.netProfit, 77000);
  assert.equal(result.profitPerAcre, 38500);
  assert.ok(result.isProfitable);
  assert.ok(result.roiPercent > 200);
});

test('accurately identifies loss scenarios', () => {
  const result = calculateFarmingFinances({
    landAreaAcres: 1,
    seedsCost: 10000,
    fertilizerCost: 10000,
    pesticideCost: 5000,
    labourCost: 15000,
    irrigationCost: 5000,
    machineryHireCost: 5000,
    transportOtherCost: 2000,
    estimatedYieldPerAcreQuintals: 10,
    pricePerQuintal: 1500
  });

  assert.equal(result.totalCost, 52000);
  assert.equal(result.grossRevenue, 15000);
  assert.equal(result.netProfit, -37000);
  assert.equal(result.isProfitable, false);
});
