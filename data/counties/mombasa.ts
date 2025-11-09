import type { County } from '../../types';

export const mombasaCounty: County = {
  name: 'Mombasa',
  code: 1,
  capital: 'Mombasa City',
  website: 'http://www.mombasa.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Health and Sanitation Services',
    'Education and Digital Transformation',
    'Lands, Housing and Urban Planning',
    'Public Service Administration, Youth, Gender, Social Services and Sports',
    'Transport and Infrastructure',
    'Water, Natural Resources and Climate Change Resilience',
    'Tourism, Culture and Trade',
    'Agriculture, Livestock Development and Fisheries',
    'Blue Economy'
  ],
  constituencies: [
    'Changamwe', 'Jomvu', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,208,333 (2019 Census)',
  area: '219 km²',
  funFacts: [
    'Known as the "White and Blue City".',
    'Home to the largest port in East Africa.',
    'Fort Jesus, a UNESCO World Heritage site, is located here.'
  ],
};