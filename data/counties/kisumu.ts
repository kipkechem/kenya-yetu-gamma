import type { County } from '../../types';

export const kisumuCounty: County = {
  name: 'Kisumu',
  code: 42,
  capital: 'Kisumu City',
  website: 'https://www.kisumu.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Medical Services, Public Health and Sanitation',
    'Agriculture, Fisheries, Livestock Development & Irrigation',
    'Education, Technical Training, Innovation and Social Services',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Tourism, Industry and Marketing',
    'Roads, Transport and Public Works',
    'Water, Environment, and Natural Resources',
    'Public Service, County Administration and Participatory Development',
    'Sports, Culture, Gender and Youth Affairs'
  ],
  constituencies: [
    'Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando', 'Muhoroni', 'Nyakach'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,155,574 (2019 Census)',
  area: '2,085.9 km²',
  funFacts: [
    'It is the third-largest city in Kenya.',
    'Located on the shores of Lake Victoria.',
    'Known for its vibrant fish market.'
  ],
};