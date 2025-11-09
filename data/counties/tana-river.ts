import type { County } from '../../types';

export const tanaRiverCounty: County = {
  name: 'Tana River',
  code: 4,
  capital: 'Hola',
  website: 'http://www.tanariver.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health and Sanitation',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth, Sports, Gender and Culture',
    'Lands, Physical Planning and Urban Development',
    'Trade, Tourism and Cooperatives',
    'Roads, Public Works and Housing',
    'Water, Energy, Environment and Natural Resources',
    'Public Service, Administration and Disaster Management'
  ],
  constituencies: [
    'Garsen', 'Galole', 'Bura'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '315,943 (2019 Census)',
  area: '35,375.8 km²',
  funFacts: [
    'Named after the Tana River, Kenya\'s longest river.',
    'Predominantly inhabited by pastoralist communities.',
    'The Tana River Primate National Reserve is located here.'
  ],
};