
import React from 'react';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message = "An unexpected error occurred while loading data.", 
  onRetry 
}) => (
  <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center min-h-[300px] animate-fade-in">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Failed to Load Data</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg"
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorDisplay;
