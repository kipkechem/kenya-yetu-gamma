import type { County } from '../../types';

export const nakuruCounty: County = {
  name: 'Nakuru',
  code: 32,
  capital: 'Nakuru',
  website: 'http://www.nakuru.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth, Gender, Sports and Culture',
    'Lands, Housing and Physical Planning',
    'Trade, Industrialization, Tourism and Co-operatives',
    'Infrastructure',
    'Water, Environment, Energy and Natural Resources',
    'Public Service, Training and Devolution'
  ],
  constituencies: [
    'Molo', 'Njoro', 'Naivasha', 'Gilgil', 'Kuresoi South', 'Kuresoi North', 'Subukia', 'Rongai', 'Bahati', 'Nakuru Town West', 'Nakuru Town East'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '2,162,202 (2019 Census)',
  area: '7,496.5 km²',
  funFacts: [
    'Nakuru is the fourth largest city in Kenya.',
    'Home to Lake Nakuru National Park, famous for its flamingos.',
    'Menengai Crater is one of the largest calderas in the world.'
  ],
};