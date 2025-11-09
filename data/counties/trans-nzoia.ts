import type { County } from '../../types';

export const transNzoiaCounty: County = {
  name: 'Trans Nzoia',
  code: 26,
  capital: 'Kitale',
  website: 'https://www.transnzoia.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services and Sanitation',
    'Agriculture, Livestock, Fisheries and Cooperatives',
    'Education and Vocational Training',
    'Lands, Housing, Physical Planning and Urban Development',
    'Trade, Commerce and Industry',
    'Public Works, Roads and Transport',
    'Water, Environment and Natural Resources',
    'Public Service Management',
    'Gender, Youth, Sports and Culture'
  ],
  constituencies: [
    'Kwanza', 'Endebess', 'Saboti', 'Kiminini', 'Cherangany'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '990,341 (2019 Census)',
  area: '2,495.5 km²',
  funFacts: [
    'Considered one of Kenya\'s breadbaskets due to its large-scale maize and wheat farming.',
    'Kitale is its administrative and commercial headquarters.',
    'Mount Elgon National Park is partly located in this county.'
  ],
};