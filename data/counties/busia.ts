import type { County } from '../../types';

export const busiaCounty: County = {
  name: 'Busia',
  code: 40,
  capital: 'Busia',
  website: 'https://www.busiacounty.go.ke/',
  departments: [
    'Finance, ICT and Economic Planning',
    'Health Services and Sanitation',
    'Agriculture, Livestock, Fisheries and Agribusiness',
    'Education and Vocational Training',
    'Lands, Housing and Urban Development',
    'Trade, Industry, Investment and Cooperatives',
    'Public Works, Roads, Transport and Energy',
    'Water, Irrigation, Environment and Natural Resources',
    'Public Service Management',
    'Culture, Sports and Social Services'
  ],
  constituencies: [
    'Budalang\'i', 'Butula', 'Funyula', 'Nambale', 'Teso North', 'Teso South', 'Matayos'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '893,681 (2019 Census)',
  area: '1,694.5 km²',
  funFacts: [
    'A border county with Uganda.',
    'Busia and Malaba are major border crossing points.',
    'Fishing on Lake Victoria is a key economic activity.'
  ],
};