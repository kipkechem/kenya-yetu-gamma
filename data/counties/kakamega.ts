import type { County } from '../../types';

export const kakamegaCounty: County = {
  name: 'Kakamega',
  code: 37,
  capital: 'Kakamega',
  website: 'https://www.kakamega.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock, Fisheries and Cooperatives',
    'Education, Science and Technology',
    'Lands, Housing, Urban Areas and Physical Planning',
    'Trade and Tourism',
    'Roads, Public Works and Energy',
    'Water, Environment and Natural Resources',
    'Public Service and Administration',
    'Social Services, Youth and Sports'
  ],
  constituencies: [
    'Butere', 'Khwisero', 'Likuyani', 'Lugari', 'Lurambi', 'Malava', 'Matungu', 'Mumias East', 'Mumias West', 'Navakholo', 'Shinyalu', 'Ikolomani'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,867,579 (2019 Census)',
  area: '3,033.8 km²',
  funFacts: [
    'Home to Kakamega Forest, the only tropical rainforest in Kenya.',
    'Known for the "crying stone of Ilesi".',
    'The Luhya community is the largest ethnic group.'
  ],
};