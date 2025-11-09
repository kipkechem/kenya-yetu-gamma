import type { County } from '../../types';

export const murangaCounty: County = {
  name: 'Murang\'a',
  code: 21,
  capital: 'Murang\'a',
  website: 'http://muranga.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture and Livestock',
    'Education, Youth, Culture and Social Services',
    'Lands, Physical Planning and Urban Development',
    'Trade, Industrialization, Tourism and Cooperatives',
    'Transport and Infrastructure',
    'Water, Irrigation, Environment and Natural Resources',
    'Public Service and Administration'
  ],
  constituencies: [
    'Kangema', 'Mathioya', 'Kiharu', 'Kigumo', 'Maragwa', 'Kandara', 'Gatanga'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,056,640 (2019 Census)',
  area: '2,558.8 km²',
  funFacts: [
    'Considered the ancestral home of the Kikuyu people.',
    'Known for its rich agricultural output, including tea and coffee.',
    'The Aberdare Forest is a major natural resource.'
  ],
};