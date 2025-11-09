import type { County } from '../../types';

export const wajirCounty: County = {
  name: 'Wajir',
  code: 8,
  capital: 'Wajir',
  website: 'http://www.wajir.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Medical Services',
    'Public Health',
    'Agriculture and Livestock',
    'Education, Youth, Sports and Social Services',
    'Lands, Housing and Physical Planning',
    'Trade, Cooperatives and Industrialization',
    'Roads, Public Works and Transport',
    'Water, Environment and Energy',
    'Public Service and Labour Relations'
  ],
  constituencies: [
    'Wajir North', 'Wajir East', 'Tarbaj', 'Wajir West', 'Eldas', 'Wajir South'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '781,263 (2019 Census)',
  area: '55,840.6 km²',
  funFacts: [
    'Known for its arid and semi-arid landscape.',
    'Livestock farming is the main economic activity.',
    'Wajir town has a rich history as a trading post.'
  ],
};