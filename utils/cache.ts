
const CACHE_VERSION = '1.3'; // Increment version to invalidate old caches.

interface CacheItem<T> {
  version: string;
  timestamp: number;
  data: T;
}

// In-memory cache store to prevent redundant parsing/loading within the same session
const memoryCache = new Map<string, any>();

export function getMemoryCache<T>(key: string): T | undefined {
    return memoryCache.get(key);
}

export function setMemoryCache<T>(key: string, data: T): void {
    memoryCache.set(key, data);
}

/**
 * Retrieves data from localStorage if it exists, matches version, and is not expired.
 * @param key The key for the data item.
 * @param ttl Optional Time To Live in milliseconds. If 0 or undefined, assumes valid indefinitely (until version change).
 * @returns The cached data, or null if not found, expired, or version mismatch.
 */
export function getCachedData<T>(key: string, ttl: number = 0): T | null {
  try {
    // 1. Check Memory Cache first (Fastest)
    const memData = memoryCache.get(key);
    if (memData) return memData;

    // 2. Check Local Storage (Persistence)
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item: CacheItem<T> = JSON.parse(itemStr);
    
    // Check Version
    if (item.version !== CACHE_VERSION) {
      localStorage.removeItem(key);
      return null;
    }

    // Check TTL if provided
    if (ttl > 0) {
      const now = Date.now();
      if (now - item.timestamp > ttl) {
        localStorage.removeItem(key);
        return null;
      }
    }

    // Populate memory cache for next time
    memoryCache.set(key, item.data);
    
    return item.data;
  } catch (error) {
    // Silently fail on cache read errors
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Stores data in localStorage with the current cache version and timestamp.
 * @param key The key for the data item.
 * @param data The data to store.
 */
export function setCachedData<T>(key: string, data: T): void {
  // Update memory cache immediately
  memoryCache.set(key, data);

  const item: CacheItem<T> = {
    version: CACHE_VERSION,
    timestamp: Date.now(),
    data: data,
  };

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    // Specific check for QuotaExceededError
    if (error instanceof DOMException && 
        (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      console.warn(`LocalStorage quota exceeded for key "${key}". Cache update skipped.`);
      // We do not clear storage here to prevent losing user preferences or other critical app state.
    } else {
      console.error(`Error setting cache for key "${key}":`, error);
    }
  }
}

export interface DiscoveredLink {
  name: string;
  url: string;
}

const DISCOVERED_LINKS_KEY = 'discoveredLinks_v1.3';

export const getDiscoveredLinks = (): DiscoveredLink[] => {
  const cached = getCachedData<DiscoveredLink[]>(DISCOVERED_LINKS_KEY);
  return cached || [];
};

export const addDiscoveredLinks = (newUrls: string[]) => {
  if (newUrls.length === 0) return;
  
  try {
      const existingLinks = getDiscoveredLinks();
      const existingUrls = new Set(existingLinks.map(l => l.url));
      
      const linksToAdd: DiscoveredLink[] = newUrls
        .filter(url => !existingUrls.has(url))
        .map(url => {
            try {
                // Attempt to create a more readable name
                const urlObj = new URL(url);
                const name = urlObj.hostname.replace('www.', '') + (urlObj.pathname === '/' ? '' : urlObj.pathname);
                return { name, url };
            } catch (e) {
                // Fallback for invalid URLs that might slip through regex
                return { name: url, url };
            }
        });

      if (linksToAdd.length > 0) {
        const updatedLinks = [...existingLinks, ...linksToAdd];
        setCachedData(DISCOVERED_LINKS_KEY, updatedLinks);
      }
  } catch (error) {
    console.error(`Error adding discovered links:`, error);
  }
};
