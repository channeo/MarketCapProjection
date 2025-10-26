import { Request, Response } from 'express';
  import { getTokenPrice } from '../services/priceService';
  import { getPoolReserves } from '../services/poolService';
  import { calculateMarketCaps } from '../services/calculationService';
  import { MarketCalcInput } from '../utils/types';

  export async function getPrice(req: Request, res: Response): Promise<void> {
    const { token } = req.params;
    try {
      console.log('Fetching price for token:', token);
      const priceUSD = await getTokenPrice(token);
      res.json({ priceUSD });
    } catch (error: any) {
      console.error('Error in getPrice:', error.message, error);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  export async function getPool(req: Request, res: Response): Promise<void> {
    const { pair } = req.params;
    try {
      console.log('Handling getPool for pair:', pair);
      const reserves = await getPoolReserves(pair);
      res.json(reserves);
    } catch (error: any) {
      console.error('Error in getPool:', error.message, error);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  export async function calculate(req: Request, res: Response): Promise<void> {
    const inputs: MarketCalcInput[] = req.body;
    try {
      console.log('Calculating for inputs:', inputs);
      const results = await calculateMarketCaps(inputs);
      res.json(results);
    } catch (error: any) {
      console.error('Error in calculate:', error.message, error);
      res.status(500).json({ error: (error as Error).message });
    }
  }