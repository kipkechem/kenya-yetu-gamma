
import type { PolicyDocument } from '../county-policies';

export const nairobiPolicies: Record<string, PolicyDocument[]> = {
  "Nairobi City": [
    { name: "Nairobi District Development Plan 2008-2012", url: "https://repository.kippra.or.ke/handle/123456789/1935" },
    { name: "Nairobi City County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5548" },
    { name: "Nairobi City County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4344" },
    { name: "Nairobi City County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5444" },
    { name: "Nairobi City County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5376" },
    { name: "Nairobi City County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5378" },
    { name: "Policy Brief No. 77 of 2023/2024 on Assessing Labour Productivity for Nairobi County", url: "https://repository.kippra.or.ke/handle/123456789/5104" },
    { name: "Nairobi City County Climate Action Plan 2020-2050", url: "https://repository.kippra.or.ke/handle/123456789/4133" },
    { name: "Nairobi City County Food System Strategy 2022", url: "https://repository.kippra.or.ke/handle/123456789/4129" },
    { name: "Socio-Economic Status of Nairobi County with COVID-19", url: "https://repository.kippra.or.ke/handle/123456789/3950" },
    { name: "The Project on Integrated Urban Development Master Plan for the City of Nairobi", url: "https://repository.kippra.or.ke/handle/123456789/1348" }
  ].map(p => ({ title: p.name, url: p.url }))
};
