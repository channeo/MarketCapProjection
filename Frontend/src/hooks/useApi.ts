import { useState } from 'react';
import { fetchPrice, fetchPool, calculateMarketCaps } from '../services/api';
import { MarketCalcInput, MarketCalcOutput } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async <T>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchPrice: (tokenAddress: string) => apiCall(() => fetchPrice(tokenAddress)),
    fetchPool: (poolAddress: string) => apiCall(() => fetchPool(poolAddress)),
    calculateMarketCaps: (inputs: MarketCalcInput[]) =>
      apiCall(() => calculateMarketCaps(inputs)) as Promise<(MarketCalcInput & MarketCalcOutput)[]>,
    loading,
    error,
  };
};