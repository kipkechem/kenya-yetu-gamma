
import type { CountyLegislation } from '../../types';
import { countyLawsBatch1 } from '../county-laws-1';
import { countyLawsBatch2 } from '../county-laws-2';
import { countyLawsBatch3 } from '../county-laws-3';

// Consolidate data from batches. 
// This file acts as the single source of truth for the 'county-laws' module.
const consolidatedData: CountyLegislation[] = [
  ...countyLawsBatch1,
  ...countyLawsBatch2,
  ...countyLawsBatch3
].sort((a, b) => a.countyName.localeCompare(b.countyName));

export const countyLawsData = consolidatedData;

// Re-export devolution laws from here for a single entry point
export { devolutionLawsData } from './devolution-laws';
