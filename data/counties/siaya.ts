import type { County } from '../../types';

export const siayaCounty: County = {
  name: 'Siaya',
  code: 41,
  capital: 'Siaya',
  website: 'https://www.siaya.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Food, Livestock and Fisheries',
    'Education, Youth Affairs, Gender and Social Services',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Enterprise and Industrial Development',
    'Public Works, Roads, Energy and Transport',
    'Water, Environment and Natural Resources',
    'Governance and Administration',
    'Tourism, Culture, and Sports'
  ],
  constituencies: [
    'Ugenya', 'Ugunja', 'Alego Usonga', 'Gem', 'Bondo', 'Rarieda'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '993,183 (2019 Census)',
  area: '2,530 km²',
  funFacts: [
    'Located on the shores of Lake Victoria.',
    'Home to the Kogelo village, ancestral home of former U.S. President Barack Obama.',
    'Fishing and agriculture are the main economic activities.'
  ],
};