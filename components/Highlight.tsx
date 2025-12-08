
import React from 'react';

interface HighlightProps {
  text: string;
  highlight: string;
}

const Highlight: React.FC<HighlightProps> = React.memo(({ text, highlight }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  
  // Use a try-catch block for regex generation to prevent crashing on invalid regex chars (e.g. "[")
  try {
      const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);

      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-50 rounded px-0.5">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </span>
      );
  } catch (e) {
      return <span>{text}</span>;
  }
});

export default Highlight;
