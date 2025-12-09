
import React, { useState, useRef } from 'react';

interface KenyaMapProps {
  onCountyClick: (countyName: string) => void;
  counties: { name: string; path: string }[];
}

const KenyaMap: React.FC<KenyaMapProps> = ({ onCountyClick, counties }) => {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipRef.current && tooltipContent) {
        // Direct DOM manipulation for performance (avoids React re-render on every pixel move)
        const x = e.clientX + 15;
        const y = e.clientY + 15;
        tooltipRef.current.style.top = `${y}px`;
        tooltipRef.current.style.left = `${x}px`;
    }
  };

  const handleMouseEnter = (name: string) => {
      setHoveredCounty(name);
      setTooltipContent(name);
  };
  
  const handleMouseLeave = () => {
    setHoveredCounty(null);
    setTooltipContent(null);
  };

  return (
    <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseMove={handleMouseMove}
    >
      <svg
        viewBox="34 -5 8 10"
        className="w-full h-auto max-w-2xl max-h-[70vh] drop-shadow-lg"
        aria-label="Map of Kenya"
      >
        <g transform="scale(1, -1)">
          {counties.map(({ name, path }) => (
            <path
              key={name}
              d={path}
              strokeWidth="0.02"
              className={`transition-all duration-200 cursor-pointer stroke-surface dark:stroke-dark-surface ${hoveredCounty === name ? 'fill-primary dark:fill-dark-primary' : 'fill-primary/60 dark:fill-dark-primary/50'}`}
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onCountyClick(name)}
              aria-label={name}
            >
              <title>{name}</title>
            </path>
          ))}
        </g>
      </svg>
      
      {/* Tooltip */}
      <div
          ref={tooltipRef}
          className={`fixed p-2 text-sm bg-gray-900/90 backdrop-blur-sm text-white rounded-md pointer-events-none z-50 transition-opacity duration-150 ${tooltipContent ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: 0, left: 0 }}
      >
          {tooltipContent}
      </div>
    </div>
  );
};

export default KenyaMap;
