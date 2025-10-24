import React from 'react';
import { MarketCalcInput, MarketCalcOutput } from '../types';

interface ResultTableProps {
  results: (MarketCalcInput & MarketCalcOutput)[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target MC (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target Price (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required ETH</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DEX Fee (ETH)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tip Fee (ETH)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slippage Est. (ETH)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost (USD)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{result.mcTarget.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.priceTargetUSD.toFixed(6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.requiredETH.toFixed(6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.fees.dexFee.toFixed(6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.fees.tipFee.toFixed(6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.fees.slippageEst.toFixed(6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.totalCostUSD.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;