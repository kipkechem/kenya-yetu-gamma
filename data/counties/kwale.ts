import type { County } from '../../types';

export const kwaleCounty: County = {
  name: 'Kwale',
  code: 2,
  capital: 'Kwale',
  website: 'http://www.kwalecountygov.com/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Research and Human Resource Development',
    'Lands, Housing and Urban Development',
    'Tourism, Trade and Enterprise Development',
    'Roads, Public Works and Utilities',
    'Water Services, Environment and Natural Resources',
    'Public Service and Administration',
    'Community Development, Culture and Talent Management'
  ],
  constituencies: [
    'Msambweni', 'Lunga Lunga', 'Matuga', 'Kinango'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '866,820 (2019 Census)',
  area: '8,270.3 km²',
  funFacts: [
    'Famous for Diani Beach.',
    'Home to the Shimba Hills National Reserve.',
    'The main economic activities are tourism and agriculture.'
  ],
};