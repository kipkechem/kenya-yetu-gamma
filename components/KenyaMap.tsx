import React, { useState } from 'react';

interface KenyaMapProps {
  onCountyClick: (countyName: string) => void;
  counties: { name: string; path: string }[];
}

const KenyaMap: React.FC<KenyaMapProps> = ({ onCountyClick, counties }) => {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const handleMouseMove = (e: React.MouseEvent, name: string) => {
    // Offset the tooltip slightly from the cursor
    setTooltip({ x: e.clientX + 15, y: e.clientY + 15, content: name });
  };
  
  const handleMouseLeave = () => {
    setHoveredCounty(null);
    setTooltip(null);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="360 80 250 250" // This viewBox is an estimate to center the placeholder shapes
        className="w-full h-auto max-w-2xl max-h-[70vh] drop-shadow-lg"
        aria-label="Map of Kenya"
      >
        <g>
          {counties.map(({ name, path }) => (
            <path
              key={name}
              d={path}
              className={`transition-all duration-200 cursor-pointer stroke-surface dark:stroke-dark-surface stroke-[0.5] ${hoveredCounty === name ? 'fill-primary dark:fill-dark-primary' : 'fill-primary/60 dark:fill-dark-primary/50'}`}
              onMouseEnter={() => setHoveredCounty(name)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => handleMouseMove(e, name)}
              onClick={() => onCountyClick(name)}
              aria-label={name}
            >
              <title>{name}</title>
            </path>
          ))}
        </g>
      </svg>
      {tooltip && (
        <div
          className="fixed p-2 text-sm bg-gray-900/80 backdrop-blur-sm text-white rounded-md pointer-events-none z-50 animate-fade-in"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default KenyaMap;
