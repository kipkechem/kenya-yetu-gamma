
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
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left + 15;
        const y = e.clientY - rect.top + 15;
        tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
        className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      <svg
        viewBox="33.5 -5.5 9 11" 
        className="w-full h-auto max-w-4xl max-h-[80vh] drop-shadow-2xl filter"
        aria-label="Map of Kenya"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g transform="scale(1, -1)">
          {counties && counties.map(({ name, path }) => {
            const isHovered = hoveredCounty === name;
            return (
              <path
                key={name}
                d={path}
                strokeWidth={isHovered ? "0.04" : "0.02"}
                className={`transition-all duration-300 cursor-pointer ease-in-out
                  ${isHovered 
                    ? 'fill-primary stroke-white dark:stroke-gray-900 z-10' 
                    : 'fill-gray-200 dark:fill-gray-800 stroke-white dark:stroke-gray-900 hover:fill-primary/80'
                  }
                `}
                style={{ 
                   filter: isHovered ? 'url(#glow)' : 'none',
                   transformOrigin: 'center',
                   zIndex: isHovered ? 100 : 1
                }}
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onCountyClick(name)}
                aria-label={name}
              />
            );
          })}
        </g>
      </svg>
      
      <div
          ref={tooltipRef}
          className={`absolute top-0 left-0 px-3 py-2 text-sm font-semibold bg-gray-900/90 text-white rounded-lg shadow-xl pointer-events-none z-50 transition-opacity duration-150 backdrop-blur-sm border border-gray-700/50 ${tooltipContent ? 'opacity-100' : 'opacity-0'}`}
      >
          {tooltipContent}
      </div>
    </div>
  );
};

export default KenyaMap;
