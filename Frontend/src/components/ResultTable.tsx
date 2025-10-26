// ResultTable.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MarketCalcInput, MarketCalcOutput } from '../types';

interface ResultTableProps {
  results: (MarketCalcInput & MarketCalcOutput)[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(tableRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, results.length);
    
    rowRefs.current.forEach((row, index) => {
      if (row) {
        gsap.fromTo(row,
          {
            opacity: 0,
            x: -50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
          }
        );
      }
    });
  }, [results]);

  const addToRowRefs = (el: HTMLTableRowElement | null, index: number) => {
    rowRefs.current[index] = el;
  };

  return (
    <div ref={tableRef} className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        📊 Calculation Results
      </h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Target MC (USD)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Target Price (USD)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Required ETH
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                DEX Fee (ETH)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Tip Fee (ETH)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Slippage Est. (ETH)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total Cost (USD)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr 
                key={index}
                ref={el => addToRowRefs(el, index)}
                className="hover:bg-blue-50 transition-colors duration-200 transform hover:scale-[1.01]"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-100">
                  ${result.mcTarget.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-100">
                  ${result.priceTargetUSD.toFixed(6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold border-r border-gray-100">
                  {result.requiredETH.toFixed(6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 border-r border-gray-100">
                  {result.fees.dexFee.toFixed(6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 border-r border-gray-100">
                  {result.fees.tipFee.toFixed(6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 border-r border-gray-100">
                  {result.fees.slippageEst.toFixed(6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ${result.totalCostUSD.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;