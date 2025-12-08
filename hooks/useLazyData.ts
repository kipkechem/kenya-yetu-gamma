
import { useState, useEffect, useCallback, useRef } from 'react';
import { getCachedData, setCachedData, getMemoryCache, setMemoryCache } from '../utils/cache';

interface LazyDataOptions<T, R> {
  ttl?: number; // Time to live in milliseconds.
  skipCache?: boolean; // If true, bypasses localStorage (but uses memory cache)
  enabled?: boolean; // If false, data loading is deferred.
  select?: (data: T) => R; // Transform/Select subset of data immediately after load
}

/**
 * A hook to lazily load data from a dynamic import with Memory -> LocalStorage caching strategy.
 */
export function useLazyData<T, R = T>(
  cacheKey: string,
  importFn: () => Promise<T>,
  dependencies: any[] = [],
  options: LazyDataOptions<T, R> = {}
) {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const isMounted = useRef(true);
  const { enabled = true, select } = options;

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const processData = useCallback((rawData: T): R => {
      return select ? select(rawData) : (rawData as unknown as R);
  }, [select]);

  const loadData = useCallback(async (forceRefresh = false) => {
    if (!enabled) return;

    // 1. Check Memory Cache (Fastest)
    const memData = getMemoryCache<T>(cacheKey);
    if (!forceRefresh && memData) {
        setData(processData(memData));
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 2. Check LocalStorage (Persistence)
      if (!forceRefresh && !options.skipCache) {
        const cached = getCachedData<T>(cacheKey, options.ttl || 0);
        if (cached) {
          if (isMounted.current) {
            setMemoryCache(cacheKey, cached); // Sync to memory
            setData(processData(cached));
            setIsLoading(false);
          }
          return;
        }
      }

      // 3. Perform Dynamic Import (Network/Bundle)
      const result = await importFn();

      if (isMounted.current) {
        // Update Caches with raw data
        setMemoryCache(cacheKey, result);
        
        if (!options.skipCache) {
          setCachedData(cacheKey, result);
        }

        // Set state with processed data
        setData(processData(result));
        setIsLoading(false);
      }
      
    } catch (err) {
      console.error(`Failed to load data for key: ${cacheKey}`, err);
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    }
  }, [cacheKey, options.skipCache, options.ttl, enabled, processData, ...dependencies]);

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
