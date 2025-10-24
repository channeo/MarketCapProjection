export interface MarketCalcInput {
  mcTarget: number;
  circulatingSupply: number;
  priceCurrentUSD: number;
  priceETHUSD: number;
  reserveToken: number;
  reserveETH: number;
  feeRate: number;
  tipPerTx: number;
  baseFee: number;
  nTx: number;
  slippage: number;
}

export interface MarketCalcOutput {
  priceTargetUSD: number;
  priceTargetETH: number;
  requiredETH: number;
  fees: {
    dexFee: number;
    tipFee: number;
    slippageEst: number;
  };
  totalCostUSD: number;
}