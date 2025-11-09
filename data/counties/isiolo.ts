import type { County } from '../../types';

export const isioloCounty: County = {
  name: 'Isiolo',
  code: 11,
  capital: 'Isiolo',
  website: 'https://isiolo.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Science, Technology, Youth, Sports, Culture and Social Services',
    'Lands, Physical Planning, Public Works and Urban Development',
    'Trade, Cooperative Development, Tourism and Hospitality Management',
    'Water, Energy, Environment and Natural Resources',
    'Transport and Infrastructure',
    'Public Service and County Administration'
  ],
  constituencies: [
    'Isiolo North', 'Isiolo South'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '268,002 (2019 Census)',
  area: '25,336.1 km²',
  funFacts: [
    'Considered a gateway to Northern Kenya.',
    'Part of the LAPSSET corridor project.',
    'Home to Buffalo Springs and Shaba National Reserves.'
  ],
};