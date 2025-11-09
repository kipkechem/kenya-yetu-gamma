import type { County } from '../../types';

export const taitaTavetaCounty: County = {
  name: 'Taita/Taveta',
  code: 6,
  capital: 'Mwatate',
  website: 'http://taitataveta.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock, Fisheries and Irrigation',
    'Education, Libraries and VTCs',
    'Lands, Mining, Housing, Physical Planning and Public Works',
    'Trade, Tourism, Industrialization and Co-operative Development',
    'Water, Sanitation, Environment and Energy',
    'Public Service, Administration and Devolution',
    'Youth, Sports, Gender, Culture and Social Services'
  ],
  constituencies: [
    'Taveta', 'Wundanyi', 'Mwatate', 'Voi'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '340,671 (2019 Census)',
  area: '17,083.9 km²',
  funFacts: [
    'Home to Tsavo West and Tsavo East National Parks.',
    'Known for its rich mineral deposits, especially gemstones.',
    'The Taita Hills are a key feature of the landscape.'
  ],
};