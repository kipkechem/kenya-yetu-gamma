import type { County } from '../../types';

export const migoriCounty: County = {
  name: 'Migori',
  code: 44,
  capital: 'Migori',
  website: 'http://www.migori.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health',
    'Agriculture, Livestock and Fisheries Management',
    'Education, Youth, Gender, Sports and Social Services',
    'Lands, Housing, Physical Planning and Urban Development',
    'Trade, Tourism, and Co-operatives',
    'Roads, Transport and Public Works',
    'Water, Energy, Environment and Natural Resources',
    'Public Service Management and Administration',
  ],
  constituencies: [
    'Rongo', 'Awendo', 'Suna East', 'Suna West', 'Uriri', 'Nyatike', 'Kuria West', 'Kuria East'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,116,436 (2019 Census)',
  area: '2,586.4 km²',
  funFacts: [
    'A border county with Tanzania.',
    'Gold mining is a significant economic activity.',
    'The county is ethnically diverse.'
  ],
};