import type { County } from '../../types';

export const kiambuCounty: County = {
  name: 'Kiambu',
  code: 22,
  capital: 'Kiambu',
  website: 'http://kiambu.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health Services',
    'Agriculture, Livestock and Irrigation',
    'Education, Gender, Culture and Social Services',
    'Lands, Housing, Physical Planning and Urban Development',
    'Trade, Industrialization, Tourism and Cooperatives',
    'Roads, Transport, Public Works and Utilities',
    'Water, Environment, Energy and Natural Resources',
    'Administration and Public Service',
    'Youth and Sports'
  ],
  constituencies: [
    'Gatundu South', 'Gatundu North', 'Juja', 'Thika Town', 'Ruiru', 'Githunguri', 'Kiambu', 'Kiambaa', 'Kabete', 'Kikuyu', 'Limuru', 'Lari'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '2,417,735 (2019 Census)',
  area: '2,543.5 km²',
  funFacts: [
    'Borders Nairobi and is part of its metropolitan area.',
    'A major agricultural hub, especially for coffee, tea, and dairy.',
    'Has a high concentration of industries.'
  ],
};