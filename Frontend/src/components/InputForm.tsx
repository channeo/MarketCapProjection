import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (tokenAddress: string, poolAddress: string, circulatingSupply: number, targetMarketCaps: number[]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [poolAddress, setPoolAddress] = useState('');
  const [circulatingSupply, setCirculatingSupply] = useState('');
  const [targetMarketCaps, setTargetMarketCaps] = useState('');

  const handleSubmit = () => {
    const supply = parseFloat(circulatingSupply);
    const targets = targetMarketCaps
      .split(',')
      .map(val => parseFloat(val.trim()))
      .filter(val => !isNaN(val) && val > 0);

    if (tokenAddress && poolAddress && supply > 0 && targets.length > 0) {
      onSubmit(tokenAddress, poolAddress, supply, targets);
    } else {
      alert('Please fill all fields with valid values');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            placeholder="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pool Address</label>
          <input
            type="text"
            value={poolAddress}
            onChange={e => setPoolAddress(e.target.value)}
            placeholder="0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Circulating Supply</label>
          <input
            type="number"
            value={circulatingSupply}
            onChange={e => setCirculatingSupply(e.target.value)}
            placeholder="1000000000"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Market Caps (comma-separated)</label>
          <input
            type="text"
            value={targetMarketCaps}
            onChange={e => setTargetMarketCaps(e.target.value)}
            placeholder="100000,200000,1000000"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InputForm;