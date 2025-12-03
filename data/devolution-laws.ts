
import type { CountyLaw } from '../types';

export const devolutionLawsData: CountyLaw[] = [
  { name: 'The Constitution of Kenya, 2010 - Chapter 11', url: '#internal:constitution#chapter-11' },
  { name: 'The Council of Governors Act, 2012', url: 'https://new.kenyalaw.org/kl/id/2012/23' },
  { name: 'The County Allocation of Revenue Acts (Annual)', url: 'https://new.kenyalaw.org/kl/index.php?id=search&search[search_word]=County%20Allocation%20of%20Revenue%20Act' },
  { name: 'The County Governments Act, 2012', url: 'https://new.kenyalaw.org/kl/id/2012/17' },
  { name: 'The Division of Revenue Acts (Annual)', url: 'https://new.kenyalaw.org/kl/index.php?id=search&search[search_word]=Division%20of%20Revenue%20Act' },
  { name: 'The Intergovernmental Relations Act, 2012', url: 'https://new.kenyalaw.org/kl/id/2012/2' },
  { name: 'The National Government Co-ordination Act, 2013', url: 'https://new.kenyalaw.org/kl/id/2013/1' },
  { name: 'The Public Finance Management Act, 2012', url: 'https://new.kenyalaw.org/kl/id/2012/18' },
  { name: 'The Transition to Devolved Government Act, 2012', url: 'https://new.kenyalaw.org/kl/id/2012/1' },
  { name: 'The Urban Areas and Cities Act, 2011', url: 'https://new.kenyalaw.org/kl/id/2011/13' },
].sort((a, b) => a.name.localeCompare(b.name));
