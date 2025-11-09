import type { County } from '../../types';

export const garissaCounty: County = {
  name: 'Garissa',
  code: 7,
  capital: 'Garissa',
  website: 'http://garissa.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Livestock, Fisheries and Cooperatives',
    'Education, Youth, Sports and Social Services',
    'Land, Housing, Urban Development and Public Works',
    'Trade, Enterprise Development, and Tourism',
    'Roads and Transport',
    'Water, Environment, Natural Resources and Energy',
    'Public Service, Administration and Citizen Participation'
  ],
  constituencies: [
    'Garissa Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi', 'Ijara'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '841,353 (2019 Census)',
  area: '45,720.2 km²',
  funFacts: [
    'A major commercial hub in North Eastern Kenya.',
    'The Garissa Solar Power Station is one of the largest in East and Central Africa.',
    'Predominantly inhabited by Somali communities.'
  ],
};