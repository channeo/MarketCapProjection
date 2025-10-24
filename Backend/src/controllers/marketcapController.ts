import { Request, Response } from 'express';
import { getTokenPrice } from '../services/priceService';
import { getPoolReserves } from '../services/poolService';
import { calculateMarketCaps } from '../services/calculationService';
import { MarketCalcInput } from '../utils/types';

export async function getPrice(req: Request, res: Response): Promise<void> {
  const { token } = req.params;
  try {
    const priceUSD = await getTokenPrice(token);
    res.json({ priceUSD });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPool(req: Request, res: Response): Promise<void> {
  const { pair } = req.params;
  try {
    const reserves = await getPoolReserves(pair);
    res.json(reserves);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function calculate(req: Request, res: Response): Promise<void> {
  const inputs: MarketCalcInput[] = req.body;
  try {
    const results = await calculateMarketCaps(inputs);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}