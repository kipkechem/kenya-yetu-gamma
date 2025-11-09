import type { County } from '../../types';

export const embuCounty: County = {
  name: 'Embu',
  code: 14,
  capital: 'Embu',
  website: 'http://www.embu.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health',
    'Agriculture, Livestock and Co-operative Management',
    'Education, Science and Technology',
    'Lands, Water, Environment and Natural Resources',
    'Infrastructure and Public Works',
    'Trade, Tourism, Investment and Industrialization',
    'Public Service, Administration and Devolution',
    'Youth, Sports and Creative Arts',
    'Gender, Children and Social Services'
  ],
  constituencies: [
    'Manyatta', 'Runyenjes', 'Mbeere South', 'Mbeere North'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '608,599 (2019 Census)',
  area: '2,818 km²',
  funFacts: [
    'Located on the southeastern slopes of Mount Kenya.',
    'Known for its tea and coffee plantations.',
    'The name Embu is derived from the Aembu people.'
  ],
};