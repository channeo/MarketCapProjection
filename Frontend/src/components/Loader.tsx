// Loader.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader: React.FC = () => {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center my-8 py-8">
      <div 
        ref={spinnerRef}
        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 shadow-lg"
      ></div>
      <span className="ml-3 text-blue-600 font-medium">Calculating...</span>
    </div>
  );
};

export default Loader;