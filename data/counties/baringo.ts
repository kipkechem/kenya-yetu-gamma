import type { County } from '../../types';

export const baringoCounty: County = {
  name: 'Baringo',
  code: 30,
  capital: 'Kabarnet',
  website: 'https://www.baringo.go.ke/',
  departments: [
      'Finance and Economic Planning',
      'Health Services',
      'Agriculture, Livestock and Fisheries',
      'Education, Sports, Culture and Social Services',
      'Lands, Housing and Urban Development',
      'Trade, Cooperatives and Industrialization',
      'Transport, Public Works and Infrastructure',
      'Water, Environment, Natural Resources and Energy',
      'Public Service, Administration and Devolution'
  ],
  constituencies: [
    'Baringo Central', 'Baringo North', 'Baringo South', 'Eldama Ravine', 'Mogotio', 'Tiaty'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '666,763 (2019 Census)',
  area: '11,075.3 km²',
  funFacts: [
    'Home to Lake Baringo and Lake Bogoria, which are famous for flamingos.',
    'Rich in geothermal activity.',
    'The Tugen, Pokot, and Njemps are the main communities.'
  ],
};