import type { County } from '../../types';

export const samburuCounty: County = {
  name: 'Samburu',
  code: 25,
  capital: 'Maralal',
  website: 'https://www.samburu.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth Affairs, Gender and Social Services',
    'Lands, Housing, Physical Planning and Urban Development',
    'Tourism, Trade, Enterprise and Co-operative Development',
    'Roads, Public Works and Transport',
    'Water, Environment and Natural Resources',
    'Public Service and Administration'
  ],
  constituencies: [
    'Samburu West', 'Samburu North', 'Samburu East'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '310,327 (2019 Census)',
  area: '21,022.2 km²',
  funFacts: [
    'Home to the Samburu National Reserve.',
    'The Samburu people are known for their distinct culture.',
    'The Ewaso Ng\'iro river runs through the county.'
  ],
};