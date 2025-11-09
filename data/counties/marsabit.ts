import type { County } from '../../types';

export const marsabitCounty: County = {
  name: 'Marsabit',
  code: 10,
  capital: 'Marsabit',
  website: 'http://marsabit.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health Services',
    'Agriculture, Livestock and Fisheries',
    'Education, Skills and Labour',
    'Lands, Physical Planning and Urban Development',
    'Trade, Industry and Enterprise Development',
    'Roads, Transport and Public Works',
    'Water, Environment and Natural Resources',
    'Public Administration and ICT',
    'Tourism, Culture and Social Services'
  ],
  constituencies: [
    'Moyale', 'North Horr', 'Saku', 'Laisamis'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '459,785 (2019 Census)',
  area: '66,923.1 km²',
  funFacts: [
    'Home to Marsabit National Park, an oasis in an arid landscape.',
    'Lake Paradise is a scenic crater lake within the park.',
    'The county has a diverse mix of ethnic groups.'
  ],
};