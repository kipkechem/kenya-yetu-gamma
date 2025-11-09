import type { County } from '../../types';

export const kerichoCounty: County = {
  name: 'Kericho',
  code: 35,
  capital: 'Kericho',
  website: 'http://kericho.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Cooperatives Management',
    'Education, Culture, Libraries, Sports and Social Services',
    'Lands, Housing and Physical Planning',
    'Trade, Industrialization, Tourism and Wildlife',
    'Public Works, Roads and Transport',
    'Water, Environment, Energy and Natural Resources',
    'Public Service Management',
  ],
  constituencies: [
    'Ainamoi', 'Belgut', 'Bureti', 'Kipkelion East', 'Kipkelion West', 'Soin/Sigowet'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '901,777 (2019 Census)',
  area: '2,454.5 km²',
  funFacts: [
    'Known for its vast tea plantations, which are some of the largest in Africa.',
    'The climate is ideal for tea growing.',
    'The Kipsigis are the main ethnic group.'
  ],
};