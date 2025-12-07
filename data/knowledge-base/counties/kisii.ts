
import type { PolicyDocument } from '../county-policies';

export const kisiiPolicies: Record<string, PolicyDocument[]> = {
  "Kisii": [
    { name: "Kisii County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5314" },
    { name: "Kisii County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4334" },
    { name: "045. County Government of Kisii", url: "https://repository.kippra.or.ke/handle/123456789/1293" },
    { name: "Kisii County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5315" },
    { name: "Kisii County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5424" },
    { name: "Kisii County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5313" },
    { name: "Policy Brief No. 47 of 2023/2024 on Assessing Labour Productivity for Kisii County", url: "https://repository.kippra.or.ke/handle/123456789/5078" },
    { name: "Kisii County Climate Change Framework Policy 2019", url: "https://repository.kippra.or.ke/handle/123456789/4593" },
    { name: "Kisii County ICT Policy and Procedures 2017", url: "https://repository.kippra.or.ke/handle/123456789/3279" }
  ].map(p => ({ title: p.name, url: p.url }))
};
