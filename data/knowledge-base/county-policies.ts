
import type { PolicyDocument } from '../../types';

export type { PolicyDocument };

// Helper to convert county name to exact matching filename
const toKebabCase = (str: string) => {
    return str
        .toLowerCase()
        .replace(/['\/]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
};

/**
 * Dynamically loads county-specific policy documents from modular batches.
 */
export const getCountyPolicies = async (countyName: string): Promise<PolicyDocument[]> => {
  const name = countyName.trim();
  
  try {
    // Determine which batch contains the county
    // Batch 1: Baringo, Bomet, Bungoma
    if (['Baringo', 'Bomet', 'Bungoma'].includes(name)) {
        const m = await import('./county-policies-1');
        return m.countyPoliciesBatch1[name] || [];
    }
    
    // Batch 2: Kakamega, Kericho, Kiambu, Kilifi, Kirinyaga, Kisii
    if (['Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii'].includes(name)) {
        const m = await import('./county-policies-2');
        return m.countyPoliciesBatch2[name] || [];
    }

    // Batch 3: Lamu, Machakos, Makueni, Mandera, Marsabit, Meru, Migori, Mombasa, Murang'a, Nairobi City
    if (['Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', "Murang'a", 'Nairobi City'].includes(name)) {
        const m = await import('./county-policies-3');
        return m.countyPoliciesBatch3[name] || [];
    }

    // Batch 4: Nakuru, Nandi, Narok, Nyamira, Nyandarua, Nyeri, Samburu, Siaya, Taita/Taveta, Tana River
    if (['Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita/Taveta', 'Tana River'].includes(name)) {
        const m = await import('./county-policies-4');
        return m.countyPoliciesBatch4[name] || [];
    }

    // Batch 5: Tharaka-Nithi, Trans Nzoia, Turkana, Uasin Gishu, Vihiga, Wajir, West Pokot
    if (['Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'].includes(name)) {
        const m = await import('./county-policies-5');
        return m.countyPoliciesBatch5[name] || [];
    }

    return [];
  } catch (error) {
    console.warn(`Policies for ${countyName} failed to load.`, error);
    return [];
  }
};
