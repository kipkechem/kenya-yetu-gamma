
import { useState, useEffect, useCallback } from 'react';
import { getCachedData, setCachedData } from '../utils/cache';

interface LazyDataOptions {
  ttl?: number; // Time to live in milliseconds. 0 means no expiration based on time.
  skipCache?: boolean; // If true, bypasses localStorage entirely (useful for large static datasets)
  enabled?: boolean; // If false, data loading is deferred until this becomes true. Default: true.
}

/**
 * A hook to lazily load data from a dynamic import, with caching and manual refetch support.
 * 
 * @param cacheKey The key used to store/retrieve data from localStorage/cache.
 * @param importFn The function that imports the data (e.g., () => import('../data/file').then(m => m.data)).
 * @param dependencies Optional array of dependencies that should trigger a re-load if changed.
 * @param options Configuration options for caching (e.g., TTL).
 * @returns An object containing the data, loading state, error state, and a refetch function.
 */
export function useLazyData<T>(
  cacheKey: string,
  importFn: () => Promise<T>,
  dependencies: any[] = [],
  options: LazyDataOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { enabled = true } = options;

  const loadData = useCallback(async (forceRefresh = false) => {
    if (!enabled) {
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Try to get from cache first (if not forcing refresh and cache is enabled)
      if (!forceRefresh && !options.skipCache) {
        const cached = getCachedData<T>(cacheKey, options.ttl || 0);
        if (cached) {
          setData(cached);
          setIsLoading(false);
          return;
        }
      }

      // 2. If not in cache or expired/forced, perform dynamic import
      const result = await importFn();

      setData(result);
      
      // Only cache if skipCache is false
      if (!options.skipCache) {
        setCachedData(cacheKey, result);
      }
      
      setIsLoading(false);
      
    } catch (err) {
      console.error(`Failed to load data for key: ${cacheKey}`, err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setIsLoading(false);
    }
  }, [cacheKey, options.skipCache, options.ttl, enabled, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    data, 
    isLoading, 
    error, 
    refetch: () => loadData(true) 
  };
}
