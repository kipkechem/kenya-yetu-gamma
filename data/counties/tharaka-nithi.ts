import type { County } from '../../types';

export const tharakaNithiCounty: County = {
  name: 'Tharaka-Nithi',
  code: 13,
  capital: 'Kathwana',
  website: 'http://www.tharakanithi.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services and Sanitation',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth, Culture, Sports and Tourism',
    'Physical Planning, Lands, Urban Development, Housing, Energy and Public Works',
    'Trade, Industry and Cooperative Development',
    'Roads, Transport and Infrastructure',
    'Water, Irrigation and Environment',
    'Public Service, Administration and Devolution'
  ],
  constituencies: [
    'Maara', 'Chuka/Igambang\'ombe', 'Tharaka'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '393,177 (2019 Census)',
  area: '2,609.5 km²',
  funFacts: [
    'Chuka town is its largest urban center.',
    'Home to the Chuka University.',
    'Main economic activities are agriculture, particularly tea and coffee.'
  ],
};