'use client';

import React from 'react';
import { cityPaths } from '@/data/cityPaths';

interface TurkeyMapProps {
  getPathStyle: (svgId: string) => React.CSSProperties;
  handleMouseEnter: (svgId: string) => void;
  handleMouseLeave: () => void;
  handleSvgCityClick: (svgId: string) => void;
}

export default function TurkeyMap({
  getPathStyle,
  handleMouseEnter,
  handleMouseLeave,
  handleSvgCityClick
}: TurkeyMapProps) {return (
    <svg 
      viewBox="0 0 1000 422" 
      className="w-full h-auto max-h-[400px]"
      style={{ backgroundColor: '#f8fafc' }}    >
      <g id="features">        {cityPaths.map((city) => (
          <path
            key={city.id}
            d={city.path}
            id={city.id}
            style={getPathStyle(city.id)}
            onMouseEnter={() => handleMouseEnter(city.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSvgCityClick(city.id)}
            role="button"
            aria-label={city.name}
          />
        ))}
      </g>
    </svg>
  );
}
