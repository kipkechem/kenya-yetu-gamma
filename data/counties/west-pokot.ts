import type { County } from '../../types';

export const westPokotCounty: County = {
  name: 'West Pokot',
  code: 24,
  capital: 'Kapenguria',
  website: 'https://www.westpokot.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Livestock, Irrigation and Fisheries',
    'Education and Technical Training',
    'Lands, Housing, Physical Planning and Urban Development',
    'Trade, Cooperatives, and Energy',
    'Public Works, Roads and Transport',
    'Water, Environment and Natural Resources',
    'Public Service Management, ICT and Devolved Units',
    'Tourism, Culture, and Sports'
  ],
  constituencies: [
    'Kapenguria', 'Sigor', 'Kacheliba', 'Pokot South'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '621,241 (2019 Census)',
  area: '9,169.4 km²',
  funFacts: [
    'Known for its unique culture and traditional practices.',
    'The Cherangani Hills are a prominent feature.',
    'Livestock keeping is a major economic activity.'
  ],
};