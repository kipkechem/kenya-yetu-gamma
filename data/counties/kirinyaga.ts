import type { County } from '../../types';

export const kirinyagaCounty: County = {
  name: 'Kirinyaga',
  code: 20,
  capital: 'Kerugoya / Kutus',
  website: 'http://www.kirinyaga.go.ke/',
  departments: [
    'Finance, Economic Planning and ICT',
    'Health',
    'Agriculture, Livestock, Veterinary and Fisheries',
    'Education and Public Service',
    'Lands, Physical Planning, Housing and Urban Development',
    'Trade, Tourism, Cooperatives and Industrialization',
    'Transport, Roads, Public Works and Housing',
    'Water, Sanitation, Environment and Natural Resources',
    'Gender, Culture and Social Services',
    'Sports and Youth'
  ],
  constituencies: [
    'Mwea', 'Gichugu', 'Ndia', 'Kirinyaga Central'
  ],
  // Fix: Add missing properties to satisfy the County type.
  population: '610,411 (2019 Census)',
  area: '1,479.1 km²',
  funFacts: [
    'Located at the foot of Mount Kenya.',
    'Known for its extensive rice irrigation schemes in Mwea.',
    'The name is a Kikuyu spelling of Mount Kenya.'
  ],
};