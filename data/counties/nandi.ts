import type { County } from '../../types';

export const nandiCounty: County = {
  name: 'Nandi',
  code: 29,
  capital: 'Kapsabet',
  website: 'http://nandi.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture and Co-operative Development',
    'Education and Vocational Training',
    'Lands, Environment, Natural Resources and Climate Change',
    'Trade, Investment and Industrialization',
    'Transport and Infrastructure',
    'Administration, Public Service and e-Government',
    'Sports, Youth and Arts'
  ],
  constituencies: [
    'Tinderet', 'Aldai', 'Nandi Hills', 'Chesumei', 'Emgwen', 'Mosop'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '885,711 (2019 Census)',
  area: '2,884.5 km²',
  funFacts: [
    'Known as the "Source of Champions" for producing world-class athletes.',
    'The Nandi Hills are a prominent geographical feature and home to large tea plantations.',
    'The Nandi people are famous for their resistance against British colonial rule.'
  ],
};