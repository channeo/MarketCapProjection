import { MarketCalcInput, MarketCalcOutput } from '../utils/types';
import { calculateMarketCap } from '../utils/marketcapMath';
import { getETHPrice } from './priceService';

export async function calculateMarketCaps(inputs: MarketCalcInput[]): Promise<(MarketCalcInput & MarketCalcOutput)[]> {
  try {
    const priceETHUSD = await getETHPrice();
    return inputs.map(input => ({
      ...input,
      priceETHUSD,
      ...calculateMarketCap({ ...input, priceETHUSD })
    }));
  } catch (error) {
    throw new Error('Calculation failed');
  }
}