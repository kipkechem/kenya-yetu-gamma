
import { countyPoliciesBatch1 } from './county-policies-1';
import { countyPoliciesBatch2 } from './county-policies-2';
import { countyPoliciesBatch3 } from './county-policies-3';
import { countyPoliciesBatch4 } from './county-policies-4';
import { countyPoliciesBatch5 } from './county-policies-5';

export interface PolicyDocument {
  title: string;
  url: string;
}

export const countyPolicyDocuments: Record<string, PolicyDocument[]> = {
  ...countyPoliciesBatch1,
  ...countyPoliciesBatch2,
  ...countyPoliciesBatch3,
  ...countyPoliciesBatch4,
  ...countyPoliciesBatch5,
};
