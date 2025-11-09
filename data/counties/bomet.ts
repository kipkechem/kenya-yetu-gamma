import type { County } from '../../types';

export const bometCounty: County = {
  name: 'Bomet',
  code: 36,
  capital: 'Bomet',
  website: 'https://www.bomet.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Medical Services and Public Health',
    'Agriculture, Livestock and Co-operatives',
    'Education, Youth, Sports and Vocational Training',
    'Lands, Housing, Urban Planning and Physical Planning',
    'Trade, Energy, Tourism and Investment',
    'Roads, Public Works and Transport',
    'Water, Sanitation, Environment and Natural Resources',
    'Administration, Public Service and Special Programmes'
  ],
  constituencies: [
    'Bomet Central', 'Bomet East', 'Chepalungu', 'Konoin', 'Sotik'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '875,689 (2019 Census)',
  area: '1,997.9 km²',
  funFacts: [
    'The main economic activities are tea farming and dairy production.',
    'Part of the Mau Forest complex is in Bomet.',
    'The Kipsigis are the dominant ethnic group.'
  ],
};