import { MarketCalcInput, MarketCalcOutput } from './types';

export function calcTargetPrice(mcTarget: number, circulatingSupply: number): number {
  return mcTarget / circulatingSupply;
}

export function calcRequiredETH(priceCurrent: number, priceTarget: number, reserveETH: number): number {
  const p0 = priceCurrent;
  const p1 = priceTarget;
  const deltaY = reserveETH * (Math.sqrt(p1 / p0) - 1);
  return deltaY;
}

export function calcFees(requiredETH: number, feeRate: number, tipPerTx: number, nTx: number, slippage: number): {
  dexFee: number;
  tipFee: number;
  slippageEst: number;
} {
  const dexFee = requiredETH * (feeRate / 100);
  const tipFee = tipPerTx * nTx;
  const slippageEst = requiredETH * (slippage / 100);
  return { dexFee, tipFee, slippageEst };
}

export function calcTotalCost(requiredETH: number, fees: { dexFee: number; tipFee: number; slippageEst: number }, priceETHUSD: number): number {
  return (requiredETH + fees.dexFee + fees.tipFee + fees.slippageEst) * priceETHUSD;
}

export function calculateMarketCap(input: MarketCalcInput): MarketCalcOutput {
  const priceTargetUSD = calcTargetPrice(input.mcTarget, input.circulatingSupply);
  const priceCurrentETH = input.priceCurrentUSD / input.priceETHUSD;
  const priceTargetETH = priceTargetUSD / input.priceETHUSD;
  const requiredETH = calcRequiredETH(priceCurrentETH, priceTargetETH, input.reserveETH);
  const fees = calcFees(requiredETH, input.feeRate, input.tipPerTx, input.nTx, input.slippage);
  const totalCostUSD = calcTotalCost(requiredETH, fees, input.priceETHUSD);
  return {
    priceTargetUSD,
    priceTargetETH,
    requiredETH,
    fees,
    totalCostUSD
  };
}