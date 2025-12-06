
import type { County } from '../../types';

export const kisumuCounty: County = {
  name: 'Kisumu',
  code: 42,
  capital: 'Kisumu City',
  website: 'https://www.kisumu.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT Services',
    'Medical Services, Public Health and Sanitation',
    'Infrastructure, Energy and Public Works',
    'Education, Technical Training, Innovation and Social Services',
    'Agriculture, Fisheries, Livestock Development and Irrigation',
    'Water, Environment, Natural Resources and Climate Change',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Tourism, Industry and Marketing',
    'Public Service, County Administration and Participatory Development',
    'Sports, Culture, Gender and Youth Affairs'
  ],
  constituencies: [
    'Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando', 'Muhoroni', 'Nyakach'
  ],
  population: '1,155,574 (2019 Census)',
  area: '2,085.9 km²',
  funFacts: [
    'It is the third-largest city in Kenya.',
    'Located on the shores of Lake Victoria.',
    'Known for its vibrant fish market.'
  ],
};
