import type { County } from '../../types';

export const machakosCounty: County = {
  name: 'Machakos',
  code: 16,
  capital: 'Machakos',
  website: 'http://www.machakosgovernment.com/',
  departments: [
    'Finance and Economic Planning',
    'Health and Emergency Services',
    'Agriculture, Food Security and Cooperatives',
    'Education, Youth, Sports and Social Welfare',
    'Lands, Urban Development, Housing and Energy',
    'Trade, Industrialization and Innovation',
    'Roads, Transport and Public Works',
    'Water, Irrigation, Environment and Climate Change',
    'Devolution, Public Service and Administration',
    'Tourism, Culture and Creative Arts'
  ],
  constituencies: [
    'Machakos Town', 'Mavoko', 'Masinga', 'Yatta', 'Kangundo', 'Kathiani', 'Matungulu', 'Mwala'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,421,932 (2019 Census)',
  area: '6,208 km²',
  funFacts: [
    'Was the first capital city of Kenya.',
    'Known for the Machakos People\'s Park.',
    'A fast-growing county due to its proximity to Nairobi.'
  ],
};