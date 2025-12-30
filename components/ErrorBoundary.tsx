
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Explicitly initialize state as a class property to ensure the TypeScript compiler correctly identifies it on the class instance.
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  // Fix: Use an explicit constructor that calls super(props) to properly link props to the component instance.
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  /**
   * Updates state so the next render will show the fallback UI.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error information for debugging or to an error reporting service.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    // Fix: Destructuring state from this.state to fix the "Property 'state' does not exist" error in the render method.
    const { hasError, error } = this.state;
    // Fix: Destructuring children from this.props to fix the "Property 'props' does not exist" error.
    const { children } = this.props;

    if (hasError) {
      // Render fallback UI when an error is caught
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                    {error?.message || "We encountered an unexpected error. Please try refreshing the page."}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg"
                >
                    Refresh Page
                </button>
            </div>
        </div>
      );
    }

    // Fix: Return children from the component's props.
    return children;
  }
}

export default ErrorBoundary;
