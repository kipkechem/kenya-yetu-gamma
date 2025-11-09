import type { County } from '../../types';

export const nyamiraCounty: County = {
  name: 'Nyamira',
  code: 46,
  capital: 'Nyamira',
  website: 'https://www.nyamira.go.ke/',
  departments: [
    'Finance, ICT and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education and Vocational Training',
    'Lands, Housing, Physical Planning and Urban Development',
    'Trade, Tourism, Industry and Cooperatives',
    'Roads, Transport and Public Works',
    'Environment, Water, Energy, Mining and Natural Resources',
    'Public Service and Administration',
    'Gender, Youth, Sports, Culture and Social Services'
  ],
  constituencies: [
    'Kitutu Masaba', 'North Mugirango', 'West Mugirango', 'Borabu'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '605,576 (2019 Census)',
  area: '912.5 km²',
  funFacts: [
    'One of the smaller counties in Kenya.',
    'Tea is a major cash crop.',
    'The Gusii people are the predominant community.'
  ],
};