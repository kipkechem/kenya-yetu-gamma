import type { County } from '../../types';

export const makueniCounty: County = {
  name: 'Makueni',
  code: 17,
  capital: 'Wote',
  website: 'https://www.makueni.go.ke/',
  departments: [
    'Finance, Planning, Budget and Revenue',
    'Health Services',
    'Agriculture, Irrigation, Livestock, Fisheries and Cooperative Development',
    'Education, Sports, and ICT',
    'Lands, Urban Planning and Development, and Environment',
    'Trade, Marketing, Industry, Culture and Tourism',
    'Roads, Transport, and Energy',
    'Water and Sanitation',
    'Devolution, Public Service, and Public Participation',
    'Gender, Children, Youth, and Social Services'
  ],
  constituencies: [
    'Makueni', 'Kibwezi West', 'Kibwezi East', 'Kaiti', 'Mbooni', 'Kilome'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '987,653 (2019 Census)',
  area: '8,008.9 km²',
  funFacts: [
    'Known for fruit farming, especially mangoes and oranges.',
    'Home to parts of the Chyulu Hills National Park.',
    'Pioneered a universal healthcare program.'
  ],
};