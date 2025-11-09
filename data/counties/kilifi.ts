import type { County } from '../../types';

export const kilifiCounty: County = {
  name: 'Kilifi',
  code: 3,
  capital: 'Kilifi',
  website: 'http://www.kilifi.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Livestock Development and Fisheries',
    'Education, Youth Affairs, Sports and Culture',
    'Lands, Physical Planning, Housing, Urban Development and Public Works',
    'Trade, Tourism and Co-operative Development',
    'Roads, Transport and Public Works',
    'Water, Environment, Natural Resources and Forestry',
    'Public Service, Management, Devolution and Citizen Participation',
    'Gender and Social Services'
  ],
  constituencies: [
    'Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,453,787 (2019 Census)',
  area: '12,609.7 km²',
  funFacts: [
    'Has a long coastline with popular beaches.',
    'The Gedi Ruins are a major historical site.',
    'Malindi and Watamu are major tourist towns.'
  ],
};