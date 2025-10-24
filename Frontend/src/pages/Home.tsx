import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultTable from '../components/ResultTable';
import Loader from '../components/Loader';
import { useApi } from '../hooks/useApi';
import { MarketCalcInput, MarketCalcOutput } from '../types';

const Home: React.FC = () => {
  const { fetchPrice, fetchPool, calculateMarketCaps, loading, error } = useApi();
  const [results, setResults] = useState<(MarketCalcInput & MarketCalcOutput)[]>([]);

  const handleCalculate = async (
    tokenAddress: string,
    poolAddress: string,
    circulatingSupply: number,
    targetMarketCaps: number[]
  ) => {
    try {
      // Fetch price
      const priceResponse = await fetchPrice(tokenAddress);
      const priceCurrentUSD = priceResponse.priceUSD;

      // Fetch pool reserves
      const poolResponse = await fetchPool(poolAddress);
      const { reserveToken, reserveETH } = poolResponse;

      // Prepare inputs for /calculate
      const inputs: MarketCalcInput[] = targetMarketCaps.map(mcTarget => ({
        mcTarget,
        circulatingSupply,
        priceCurrentUSD,
        priceETHUSD: 0, // Will be fetched by backend
        reserveToken,
        reserveETH,
        feeRate: 0.3, // Uniswap V2 fee
        tipPerTx: 0.0005,
        baseFee: 0,
        nTx: 1,
        slippage: 0.5,
      }));

      // Call /calculate
      const calcResults = await calculateMarketCaps(inputs);
      setResults(calcResults);
    } catch (err) {
      console.error('Error in Home:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">MarketCap Projection & Trade Cost Estimator</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <Loader />}
      <InputForm onSubmit={handleCalculate} />
      {results.length > 0 && <ResultTable results={results} />}
    </div>
  );
};

export default Home;