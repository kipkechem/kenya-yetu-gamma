import type { County } from '../../types';

export const laikipiaCounty: County = {
  name: 'Laikipia',
  code: 31,
  capital: 'Rumuruti',
  website: 'http://www.laikipiacounty.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health',
    'Agriculture and Livestock',
    'Education, Youth, Sports and Social Services',
    'Infrastructure and Urban Development',
    'Trade, Tourism and Cooperatives',
    'Water, Environment and Natural Resources',
    'Administration and Public Service'
  ],
  constituencies: [
    'Laikipia East', 'Laikipia North', 'Laikipia West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '518,560 (2019 Census)',
  area: '9,462 km²',
  funFacts: [
    'Located on the Equator.',
    'Hosts a significant number of wildlife conservancies and ranches.',
    'Nanyuki town is a major hub for tourism and British Army training.'
  ],
};