import type { County } from '../../types';

export const kajiadoCounty: County = {
  name: 'Kajiado',
  code: 34,
  capital: 'Kajiado',
  website: 'https://www.kajiado.go.ke/',
  departments: [
    'Finance and Economic Planning',
    'Medical Services and Public Health',
    'Agriculture, Livestock and Fisheries',
    'Education, Vocational Training, Youth and Sports',
    'Lands, Physical Planning, Urban Development and Housing',
    'Trade, Cooperatives, Tourism and Enterprise Development',
    'Roads, Public Works and Energy',
    'Water, Environment and Natural Resources',
    'Public Service, Administration and Citizen Participation',
    'Gender, Culture and Social Services'
  ],
  constituencies: [
    'Kajiado Central', 'Kajiado East', 'Kajiado North', 'Kajiado South', 'Kajiado West'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '1,117,840 (2019 Census)',
  area: '21,292.7 km²',
  funFacts: [
    'Borders Nairobi and is experiencing rapid urbanization.',
    'Amboseli National Park is located here, famous for its large elephant herds and views of Mount Kilimanjaro.',
    'The Maasai culture is prominent.'
  ],
};