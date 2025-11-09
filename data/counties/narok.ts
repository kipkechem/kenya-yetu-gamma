import type { County } from '../../types';

export const narokCounty: County = {
  name: 'Narok',
  code: 33,
  capital: 'Narok',
  website: 'http://www.narok.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation',
    'Agriculture, Livestock and Fisheries',
    'Education, Youth, Sports, Culture and Social Services',
    'Lands, Housing and Urban Development',
    'Trade, Industrialization and Cooperatives',
    'Roads, Public Works and Transport',
    'Water, Environment and Natural Resources',
    'Public Service, Administration and Devolution',
    'Tourism and Wildlife'
  ],
  constituencies: [
    'Kilgoris', 'Emurua Dikirr', 'Narok North', 'Narok East', 'Narok South', 'Narok West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,157,873 (2019 Census)',
  area: '17,921.2 km²',
  funFacts: [
    'Home to the world-famous Maasai Mara National Reserve.',
    'The annual wildebeest migration is a major tourist attraction.',
    'The Maasai community is predominant here.'
  ],
};