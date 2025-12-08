
import type { PolicyDocument } from '../../components/CountyDetailPage'; 

// Re-export type for consumers
export type { PolicyDocument };

// Helper to convert county name to filename (e.g. "Uasin Gishu" -> "uasin-gishu")
const toKebabCase = (str: string) => {
    return str
        .toLowerCase()
        .replace(/['\/]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
};

// Dynamic loader function
export const getCountyPolicies = async (countyName: string): Promise<PolicyDocument[]> => {
  const fileName = toKebabCase(countyName);
  
  try {
    // Dynamic import based on convention
    // Note: We use a switch/map approach or direct import if the bundler supports dynamic template strings
    // explicitly mapping them ensures bundler creates chunks correctly.
    
    switch (fileName) {
        case 'baringo': return (await import('./counties/baringo')).policies;
        case 'bomet': return (await import('./counties/bomet')).policies;
        case 'bungoma': return (await import('./counties/bungoma')).policies;
        case 'busia': return (await import('./counties/busia')).policies;
        case 'elgeyomarakwet': return (await import('./counties/elgeyo-marakwet')).policies;
        case 'embu': return (await import('./counties/embu')).policies;
        case 'garissa': return (await import('./counties/garissa')).policies;
        case 'homa-bay': return (await import('./counties/homa-bay')).policies;
        case 'isiolo': return (await import('./counties/isiolo')).policies;
        case 'kajiado': return (await import('./counties/kajiado')).policies;
        case 'kakamega': return (await import('./counties/kakamega')).policies;
        case 'kericho': return (await import('./counties/kericho')).policies;
        case 'kiambu': return (await import('./counties/kiambu')).policies;
        case 'kilifi': return (await import('./counties/kilifi')).policies;
        case 'kirinyaga': return (await import('./counties/kirinyaga')).policies;
        case 'kisii': return (await import('./counties/kisii')).policies;
        case 'kisumu': return (await import('./counties/kisumu')).policies;
        case 'kitui': return (await import('./counties/kitui')).policies;
        case 'kwale': return (await import('./counties/kwale')).policies;
        case 'laikipia': return (await import('./counties/laikipia')).policies;
        case 'lamu': return (await import('./counties/lamu')).policies;
        case 'machakos': return (await import('./counties/machakos')).policies;
        case 'makueni': return (await import('./counties/makueni')).policies;
        case 'mandera': return (await import('./counties/mandera')).policies;
        case 'marsabit': return (await import('./counties/marsabit')).policies;
        case 'meru': return (await import('./counties/meru')).policies;
        case 'migori': return (await import('./counties/migori')).policies;
        case 'mombasa': return (await import('./counties/mombasa')).policies;
        case 'muranga': return (await import('./counties/muranga')).policies;
        case 'nairobi-city': return (await import('./counties/nairobi')).policies;
        case 'nakuru': return (await import('./counties/nakuru')).policies;
        case 'nandi': return (await import('./counties/nandi')).policies;
        case 'narok': return (await import('./counties/narok')).policies;
        case 'nyamira': return (await import('./counties/nyamira')).policies;
        case 'nyandarua': return (await import('./counties/nyandarua')).policies;
        case 'nyeri': return (await import('./counties/nyeri')).policies;
        case 'samburu': return (await import('./counties/samburu')).policies;
        case 'siaya': return (await import('./counties/siaya')).policies;
        case 'taitataveta': return (await import('./counties/taita-taveta')).policies;
        case 'tana-river': return (await import('./counties/tana-river')).policies;
        case 'tharaka-nithi': return (await import('./counties/tharaka-nithi')).policies;
        case 'trans-nzoia': return (await import('./counties/trans-nzoia')).policies;
        case 'turkana': return (await import('./counties/turkana')).policies;
        case 'uasin-gishu': return (await import('./counties/uasin-gishu')).policies;
        case 'vihiga': return (await import('./counties/vihiga')).policies;
        case 'wajir': return (await import('./counties/wajir')).policies;
        case 'west-pokot': return (await import('./counties/west-pokot')).policies;
        default: return [];
    }
  } catch (error) {
    console.error(`Failed to load policies for ${countyName}`, error);
    return [];
  }
};
