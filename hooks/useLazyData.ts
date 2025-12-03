import { useState, useEffect } from 'react';
import { getCachedData, setCachedData } from '../utils/cache';

/**
 * A hook to lazily load data from a dynamic import, with caching support.
 * 
 * @param cacheKey The key used to store/retrieve data from localStorage/cache.
 * @param importFn The function that imports the data (e.g., () => import('../data/file').then(m => m.data)).
 * @param dependencies Optional array of dependencies that should trigger a re-load if changed.
 * @returns An object containing the data, loading state, and error state.
 */
export function useLazyData<T>(
  cacheKey: string,
  importFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Try to get from cache first
        const cached = getCachedData<T>(cacheKey);
        if (cached) {
          if (isMounted) {
            setData(cached);
            setIsLoading(false);
          }
          return;
        }

        // 2. If not in cache, perform dynamic import
        const result = await importFn();

        if (isMounted) {
          setData(result);
          setCachedData(cacheKey, result);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(`Failed to load data for key: ${cacheKey}`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, cacheKey]);

  return { data, isLoading, error };
}
