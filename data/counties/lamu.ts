import type { County } from '../../types';

export const lamuCounty: County = {
  name: 'Lamu',
  code: 5,
  capital: 'Lamu',
  website: 'https://www.lamu.go.ke/',
  departments: [
    'Finance, Strategy and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Co-operative Development',
    'Education, Vocational Training, Youth Affairs, Sports, Gender and Social Services',
    'Lands, Physical Planning, Urban Development, Infrastructure, and Public Works',
    'Trade, Tourism, and Industrialization',
    'Water, Environment, and Natural Resources',
    'Public Service Management and Administration',
    'Fisheries and Blue Economy'
  ],
  constituencies: [
    'Lamu East', 'Lamu West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '143,920 (2019 Census)',
  area: '6,497.7 km²',
  funFacts: [
    'Lamu Old Town is a UNESCO World Heritage site.',
    'Known for its unique Swahili architecture.',
    'Transport is mainly by foot or donkey.'
  ],
};