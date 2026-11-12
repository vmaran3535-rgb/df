/**
 * Agricultural Expense & Profitability Calculator
 */

export interface ExpenseBreakdown {
  seedsCost: number;
  fertilizerCost: number;
  pesticideCost: number;
  labourCost: number;
  irrigationCost: number;
  machineryHireCost: number;
  transportOtherCost: number;
  totalCost: number;
  costPerAcre: number;
  estimatedYieldQuintals: number;
  pricePerQuintal: number;
  grossRevenue: number;
  netProfit: number;
  roiPercent: number;
  profitPerAcre: number;
  isProfitable: boolean;
}

export function calculateFarmingFinances(params: {
  landAreaAcres: number;
  seedsCost: number;
  fertilizerCost: number;
  pesticideCost: number;
  labourCost: number;
  irrigationCost: number;
  machineryHireCost: number;
  transportOtherCost: number;
  estimatedYieldPerAcreQuintals: number;
  pricePerQuintal: number;
}): ExpenseBreakdown {
  const acres = Math.max(0.1, params.landAreaAcres || 1);
  const totalCost = 
    (params.seedsCost || 0) +
    (params.fertilizerCost || 0) +
    (params.pesticideCost || 0) +
    (params.labourCost || 0) +
    (params.irrigationCost || 0) +
    (params.machineryHireCost || 0) +
    (params.transportOtherCost || 0);

  const costPerAcre = Math.round(totalCost / acres);
  const estimatedYieldQuintals = Math.round((params.estimatedYieldPerAcreQuintals || 0) * acres * 10) / 10;
  const grossRevenue = Math.round(estimatedYieldQuintals * (params.pricePerQuintal || 0));
  const netProfit = grossRevenue - totalCost;
  const roiPercent = totalCost > 0 ? Math.round((netProfit / totalCost) * 100 * 10) / 10 : 0;
  const profitPerAcre = Math.round(netProfit / acres);

  return {
    seedsCost: params.seedsCost || 0,
    fertilizerCost: params.fertilizerCost || 0,
    pesticideCost: params.pesticideCost || 0,
    labourCost: params.labourCost || 0,
    irrigationCost: params.irrigationCost || 0,
    machineryHireCost: params.machineryHireCost || 0,
    transportOtherCost: params.transportOtherCost || 0,
    totalCost,
    costPerAcre,
    estimatedYieldQuintals,
    pricePerQuintal: params.pricePerQuintal || 0,
    grossRevenue,
    netProfit,
    roiPercent,
    profitPerAcre,
    isProfitable: netProfit >= 0
  };
}
