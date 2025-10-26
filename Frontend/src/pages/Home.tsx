// Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import InputForm from '../components/InputForm';
import ResultTable from '../components/ResultTable';
import Loader from '../components/Loader';
import { useApi } from '../hooks/useApi';
import { MarketCalcInput, MarketCalcOutput } from '../types';
import { gsap } from 'gsap';

const Home: React.FC = () => {
  const { fetchPrice, fetchPool, calculateMarketCaps, loading, error } = useApi();
  const [results, setResults] = useState<(MarketCalcInput & MarketCalcOutput)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Container animation
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.3 }
      );
    }
  }, []);

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
    <div ref={containerRef} className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 
        ref={titleRef}
        className="text-4xl font-bold text-center mb-8 mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
      >
        🚀 MarketCap Projection & Trade Cost Estimator
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center transform animate-pulse">
          {error}
        </div>
      )}
      
      {loading && <Loader />}
      
      <InputForm onSubmit={handleCalculate} />
      
      {results.length > 0 && (
        <div className="mt-8">
          <ResultTable results={results} />
        </div>
      )}
    </div>
  );
};

export default Home;