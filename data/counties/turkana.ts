import type { County } from '../../types';

export const turkanaCounty: County = {
  name: 'Turkana',
  code: 23,
  capital: 'Lodwar',
  website: 'https://www.turkana.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Pastoral Economy and Fisheries',
    'Education, Youth Affairs, and Social Protection',
    'Lands, Energy, Housing and Urban Areas Management',
    'Trade, Gender and Youth Affairs',
    'Infrastructure, Transport and Public Works',
    'Water Services, Environment and Mineral Resources',
    'Public Service, Administration and Disaster Management',
    'Tourism, Culture and Heritage'
  ],
  constituencies: [
    'Turkana North', 'Turkana West', 'Turkana Central', 'Loima', 'Turkana South', 'Turkana East'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '926,976 (2019 Census)',
  area: '71,597.8 km²',
  funFacts: [
    'The largest county by area in Kenya.',
    'Home to Lake Turkana, the world\'s largest permanent desert lake.',
    'Significant oil discoveries have been made here.'
  ],
};