
import * as counties from './counties/index';

export interface PolicyDocument {
  title: string;
  url: string;
}

export const countyPolicyDocuments: Record<string, PolicyDocument[]> = {
  ...Object.values(counties).reduce((acc, countyData) => ({ ...acc, ...countyData }), {})
};
