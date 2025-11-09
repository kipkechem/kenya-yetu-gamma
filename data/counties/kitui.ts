import type { County } from '../../types';

export const kituiCounty: County = {
  name: 'Kitui',
  code: 15,
  capital: 'Kitui',
  website: 'https://www.kitui.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture and Livestock',
    'Education, ICT and Youth Development',
    'Lands, Housing and Urban Development',
    'Trade, Cooperatives and Investment',
    'Roads, Public Works and Transport',
    'Environment and Natural Resources',
    'Culture, Gender, Youth, Sports and Social Services',
    'Water and Irrigation'
  ],
  constituencies: [
    'Kitui Central', 'Kitui East', 'Kitui Rural', 'Kitui South', 'Kitui West', 'Mwingi Central', 'Mwingi North', 'Mwingi West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,136,187 (2019 Census)',
  area: '30,496.5 km²',
  funFacts: [
    'Known for its Mwingi National Reserve.',
    'Has a rich cultural heritage, especially in music and dance.',
    'The main economic activity is subsistence agriculture.'
  ],
};