import type { County } from '../../types';

export const homaBayCounty: County = {
  name: 'Homa Bay',
  code: 43,
  capital: 'Homa Bay',
  website: 'https://www.homabay.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Human Capital Development and Vocational Training',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Industry, Tourism, and Co-operative Development',
    'Roads, Public Works, Transport and Infrastructure',
    'Water, Sanitation, Forestry, Environment, Energy and Climate Change',
    'Governance, Administration and Communication',
    'Youth, Sports, Culture, Gender, and Social Services'
  ],
  constituencies: [
    'Homa Bay Town', 'Kabondo Kasipul', 'Karachuonyo', 'Kasipul', 'Ndhiwa', 'Rangwe', 'Suba North', 'Suba South'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,131,950 (2019 Census)',
  area: '3,154.7 km²',
  funFacts: [
    'Has a long shoreline along Lake Victoria.',
    'Ruma National Park, home to the rare roan antelope, is located here.',
    'Mfangano Island is known for its ancient rock art.'
  ],
};