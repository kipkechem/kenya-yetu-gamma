import type { County } from '../../types';

export const kisiiCounty: County = {
  name: 'Kisii',
  code: 45,
  capital: 'Kisii',
  website: 'https://www.kisii.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock, Fisheries and Cooperative Development',
    'Education, Labour and Manpower Development',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Tourism and Industry',
    'Roads, Public Works and Transport',
    'Water, Environment and Natural Resources',
    'Administration, Corporate Services and Stakeholder Management',
    'Youth, Sports, Culture and Social Services'
  ],
  constituencies: [
    'Bobasi', 'Bomachoge Borabu', 'Bomachoge Chache', 'Bonchari', 'Kitutu Chache North', 'Kitutu Chache South', 'Nyaribari Chache', 'Nyaribari Masaba', 'South Mugirango'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,266,860 (2019 Census)',
  area: '1,317.9 km²',
  funFacts: [
    'Known for its soapstone carvings.',
    'A very densely populated agricultural area.',
    'The Gusii people are the main inhabitants.'
  ],
};