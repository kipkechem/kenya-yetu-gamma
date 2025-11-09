import type { County } from '../../types';

export const manderaCounty: County = {
  name: 'Mandera',
  code: 9,
  capital: 'Mandera',
  website: 'http://www.mandera.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth and Sports',
    'Lands, Housing and Physical Planning',
    'Trade, Industrialization and Cooperatives',
    'Roads, Public Works and Transport',
    'Water, Energy, Environment and Natural Resources',
    'Public Service, Administration and Devolution'
  ],
  constituencies: [
    'Mandera West', 'Banissa', 'Mandera North', 'Mandera South', 'Mandera East', 'Lafey'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '867,457 (2019 Census)',
  area: '25,991.5 km²',
  funFacts: [
    'The northeasternmost county in Kenya.',
    'Borders both Somalia and Ethiopia.',
    'Experiences some of the highest temperatures in the country.'
  ],
};