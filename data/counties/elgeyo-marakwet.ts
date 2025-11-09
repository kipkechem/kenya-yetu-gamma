import type { County } from '../../types';

export const elgeyoMarakwetCounty: County = {
  name: 'Elgeyo/Marakwet',
  code: 28,
  capital: 'Iten',
  website: 'https://www.elgeyomarakwet.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Co-operatives',
    'Education and Technical Training',
    'Lands, Water, Environment and Climate Change',
    'Roads, Public Works and Transport',
    'Trade, Energy, Tourism and Industry',
    'Public Service Management and Administration',
    'Sports, Youth Affairs, Culture, Children and Social Services'
  ],
  constituencies: [
    'Marakwet East', 'Marakwet West', 'Keiyo North', 'Keiyo South'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '454,480 (2019 Census)',
  area: '3,049.7 km²',
  funFacts: [
    'Famous for its stunning Great Rift Valley escarpment.',
    'Home to many of Kenya\'s elite long-distance runners.',
    'Iten, the county capital, is a high-altitude training center.'
  ],
};