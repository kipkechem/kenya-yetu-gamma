import type { County } from '../../types';

export const nyeriCounty: County = {
  name: 'Nyeri',
  code: 19,
  capital: 'Nyeri',
  website: 'http://www.nyeri.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education and Sports',
    'Lands, Physical Planning, Housing and Urbanization',
    'Trade, Tourism, Culture and Cooperatives',
    'Transport, Public Works, Infrastructure and Energy',
    'Water, Irrigation, Environment and Climate Change',
    'County Public Service, Administration and Communication'
  ],
  constituencies: [
    'Tetu', 'Kieni', 'Mathira', 'Othaya', 'Mukurwe-ini', 'Nyeri Town'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '759,164 (2019 Census)',
  area: '3,337.1 km²',
  funFacts: [
    'Located in the central highlands of Kenya.',
    'Final resting place of Lord Baden-Powell, founder of the Scouting movement.',
    'Rich in coffee and tea production.'
  ],
};