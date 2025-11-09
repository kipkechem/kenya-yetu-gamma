import type { County } from '../../types';

export const nyandaruaCounty: County = {
  name: 'Nyandarua',
  code: 18,
  capital: 'Ol Kalou',
  website: 'http://www.nyandarua.go.ke/',
  departments: [
    'Finance and Economic Development',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Culture, Arts, Tourism and Social Services',
    'Lands, Housing, Physical Planning and Urban Development',
    'Transport, Energy and Public Works',
    'Water, Environment and Natural Resources',
    'Public Administration and ICT',
    'Industrialization, Trade and Cooperatives',
    'Youth, Sports and The Arts'
  ],
  constituencies: [
    'Kinangop', 'Kipipiri', 'Ol Kalou', 'Ol Jorok', 'Ndaragwa'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '638,289 (2019 Census)',
  area: '3,245.3 km²',
  funFacts: [
    'Located in the former Central Province.',
    'Main economic activity is agriculture, especially potato farming.',
    'The Aberdare Ranges are a prominent geographical feature.'
  ],
};