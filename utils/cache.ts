const CACHE_VERSION = '1.1'; // Increment version to invalidate old caches.

interface CacheItem<T> {
  version: string;
  data: T;
}

/**
 * Retrieves data from localStorage if it exists and matches the current cache version.
 * @param key The key for the data item.
 * @returns The cached data, or null if not found, expired, or version mismatch.
 */
export function getCachedData<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item: CacheItem<T> = JSON.parse(itemStr);
    
    if (item.version === CACHE_VERSION) {
      return item.data;
    } else {
      // Version mismatch, invalidate this specific cache entry
      localStorage.removeItem(key);
      console.log(`Cache for key "${key}" invalidated due to version mismatch.`);
      return null;
    }
  } catch (error) {
    console.error(`Error reading cache for key "${key}":`, error);
    // In case of parsing error, remove the corrupted item
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Stores data in localStorage with the current cache version.
 * @param key The key for the data item.
 * @param data The data to store.
 */
export function setCachedData<T>(key: string, data: T): void {
  try {
    const item: CacheItem<T> = {
      version: CACHE_VERSION,
      data: data,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting cache for key "${key}":`, error);
    // This could happen if localStorage is full.
  }
}

export interface DiscoveredLink {
  name: string;
  url: string;
}

const DISCOVERED_LINKS_KEY = 'discoveredLinks_v1.1';

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
