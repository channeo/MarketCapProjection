// InputForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface InputFormProps {
  onSubmit: (tokenAddress: string, poolAddress: string, circulatingSupply: number, targetMarketCaps: number[]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [poolAddress, setPoolAddress] = useState('');
  const [circulatingSupply, setCirculatingSupply] = useState('');
  const [targetMarketCaps, setTargetMarketCaps] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const handleSubmit = () => {
    const supply = parseFloat(circulatingSupply);
    const targets = targetMarketCaps
      .split(',')
      .map(val => parseFloat(val.trim()))
      .filter(val => !isNaN(val) && val > 0);

    if (tokenAddress && poolAddress && supply > 0 && targets.length > 0) {
      // Button click animation
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            onSubmit(tokenAddress, poolAddress, supply, targets);
          }
        });
      } else {
        onSubmit(tokenAddress, poolAddress, supply, targets);
      }
    } else {
      // Shake animation for invalid form
      if (formRef.current) {
        gsap.to(formRef.current, {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          onComplete: () => {
            gsap.to(formRef.current, { x: 0, duration: 0.1 });
          }
        });
      }
      alert('Please fill all fields with valid values');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div 
      ref={formRef}
      className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl border border-blue-100 mb-6"
      onKeyPress={handleKeyPress}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Input Parameters
      </h2>
      <div className="space-y-6">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            placeholder="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            className="mt-1 block w-full border-2 border-gray-200 rounded-xl shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pool Address</label>
          <input
            type="text"
            value={poolAddress}
            onChange={e => setPoolAddress(e.target.value)}
            placeholder="0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
            className="mt-1 block w-full border-2 border-gray-200 rounded-xl shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Circulating Supply</label>
          <input
            type="number"
            value={circulatingSupply}
            onChange={e => setCirculatingSupply(e.target.value)}
            placeholder="1000000000"
            className="mt-1 block w-full border-2 border-gray-200 rounded-xl shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Target Market Caps (comma-separated)
          </label>
          <input
            type="text"
            value={targetMarketCaps}
            onChange={e => setTargetMarketCaps(e.target.value)}
            placeholder="100000,200000,1000000"
            className="mt-1 block w-full border-2 border-gray-200 rounded-xl shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <button
          ref={buttonRef}
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-semibold text-lg"
        >
          🚀 Calculate Projections
        </button>
      </div>
    </div>
  );
};

export default InputForm;