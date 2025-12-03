
import type { CountyLegislation } from '../types';
import { countyLawsBatch1 } from './county-laws-1';
import { countyLawsBatch2 } from './county-laws-2';
import { countyLawsBatch3 } from './county-laws-3';
export { devolutionLawsData } from './devolution-laws';

export const countyLawsData: CountyLegislation[] = [
  ...countyLawsBatch1,
  ...countyLawsBatch2,
  ...countyLawsBatch3
].sort((a, b) => a.countyName.localeCompare(b.countyName));
