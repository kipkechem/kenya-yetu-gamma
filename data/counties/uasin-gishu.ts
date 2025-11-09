import type { County } from '../../types';

export const uasinGishuCounty: County = {
  name: 'Uasin Gishu',
  code: 27,
  capital: 'Eldoret',
  website: 'http://uasingishu.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Agribusiness, Livestock and Fisheries',
    'Education, Technical Training, Gender, Youth Affairs, Sports, Culture and Social Services',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Industrialization, Cooperatives and Tourism',
    'Roads, Transport and Public Works',
    'Water, Sanitation, Energy, Environment and Natural Resources',
    'Public Service Management, Administration and Devolution'
  ],
  constituencies: [
    'Soy', 'Turbo', 'Moiben', 'Ainabkoi', 'Kapseret', 'Kesses'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,163,186 (2019 Census)',
  area: '3,345.2 km²',
  funFacts: [
    'Eldoret town is its capital and a major commercial hub.',
    'Known as the "Home of Champions" for producing many famous Kenyan runners.',
    'Agriculture, particularly maize and dairy farming, is the main economic activity.'
  ],
};