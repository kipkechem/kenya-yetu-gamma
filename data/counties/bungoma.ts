import type { County } from '../../types';

export const bungomaCounty: County = {
  name: 'Bungoma',
  code: 39,
  capital: 'Bungoma',
  website: 'https://www.bungoma.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Livestock, Fisheries, Irrigation, and Cooperatives',
    'Education and Vocational Training',
    'Lands, Urban Planning, Housing, and Municipalities',
    'Trade, Energy, and Industrialization',
    'Roads, Transport, Infrastructure, and Public Works',
    'Environment, Natural Resources, Water, and Energy',
    'Public Service Management and Administration',
    'Gender, Culture, Youth and Sports'
  ],
  constituencies: [
    'Bumula', 'Kabuchai', 'Kanduyi', 'Kimilili', 'Mt. Elgon', 'Sirisia', 'Tongaren', 'Webuye East', 'Webuye West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,670,570 (2019 Census)',
  area: '3,032.2 km²',
  funFacts: [
    'A major sugar-producing county.',
    'Mount Elgon is a significant geographical feature.',
    'The Bukusu and Sabaot communities are predominant.'
  ],
};