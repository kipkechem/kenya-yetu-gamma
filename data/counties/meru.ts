import type { County } from '../../types';

export const meruCounty: County = {
  name: 'Meru',
  code: 12,
  capital: 'Meru',
  website: 'http://meru.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health Services',
    'Agriculture, Livestock Development and Fisheries',
    'Education, Technology, Gender and Social Development',
    'Lands, Physical Planning and Urban Development',
    'Trade, Investment, Industrialization, Tourism and Cooperatives',
    'Roads, Transport and Energy',
    'Water, Irrigation, Environment and Natural Resources',
    'Legal Affairs, Public Service Management and Administration',
  ],
  constituencies: [
    'Igembe South', 'Igembe Central', 'Igembe North', 'Tigania West', 'Tigania East', 'North Imenti', 'Buuri', 'Central Imenti', 'South Imenti'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,545,714 (2019 Census)',
  area: '7,003.1 km²',
  funFacts: [
    'Located on the eastern slopes of Mount Kenya.',
    'Known for its rich agricultural production, including miraa (khat), tea, and coffee.',
    'Meru National Park is famous for being the setting of "Born Free".'
  ],
};