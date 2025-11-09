import type { County } from '../../types';

export const vihigaCounty: County = {
  name: 'Vihiga',
  code: 38,
  capital: 'Vihiga',
  website: 'http://vihiga.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock, Fisheries and Cooperatives',
    'Education, Science, Technical and Vocational Training',
    'Lands, Housing, Urban Development and Physical Planning',
    'Trade, Tourism and Industrialization',
    'Transport and Infrastructure',
    'Water, Environment, Energy and Natural Resources',
    'Public Service and Administration',
    'Gender, Culture, Youth and Sports'
  ],
  constituencies: [
    'Vihiga', 'Sabatia', 'Hamisi', 'Luanda', 'Emuhaya'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '590,013 (2019 Census)',
  area: '531.3 km²',
  funFacts: [
    'The second smallest county in Kenya.',
    'Densely populated.',
    'The Maragoli and Banyore, sub-tribes of the Luhya, are the main inhabitants.'
  ],
};