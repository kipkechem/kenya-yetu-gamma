
import type { PolicyDocument } from '../county-policies';

export const nakuruPolicies: Record<string, PolicyDocument[]> = {
  "Nakuru": [
    { name: "Nakuru District  Development Plan 1994-1996", url: "https://repository.kippra.or.ke/handle/123456789/4012" },
    { name: "Nakuru District Development Plan 1989-1993", url: "https://repository.kippra.or.ke/handle/123456789/4011" },
    { name: "Nakuru County Annual Development Plan 2026/2027", url: "https://repository.kippra.or.ke/handle/123456789/5510" },
    { name: "Nakuru District Development Plan 2002-2008", url: "https://repository.kippra.or.ke/handle/123456789/4014" },
    { name: "032.County Government of Nakuru", url: "https://repository.kippra.or.ke/handle/123456789/933" },
    { name: "Nakuru District Development Plan 1989-1993", url: "https://repository.kippra.or.ke/handle/123456789/4011" },
    { name: "Nakuru District Development Plan 2002-2008", url: "https://repository.kippra.or.ke/handle/123456789/4014" },
    { name: "Nakuru District Development Plan 1989-1993", url: "https://repository.kippra.or.ke/handle/123456789/4011" },
    { name: "Nakuru City County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4814" },
    { name: "Nakuru County Approved Budget Estimates 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5509" },
    { name: "Nakuru City County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5451" },
    { name: "Nakuru City County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5450" },
    { name: "Policy Brief No. 78 of 2023/2024 on Assessing Labour Productivity for Nakuru County", url: "https://repository.kippra.or.ke/handle/123456789/5105" },
    { name: "Nakuru District Development Plan 1997-2001", url: "https://repository.kippra.or.ke/handle/123456789/4013" }
  ].map(p => ({ title: p.name, url: p.url }))
};
