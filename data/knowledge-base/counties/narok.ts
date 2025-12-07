
import type { PolicyDocument } from '../county-policies';

export const narokPolicies: Record<string, PolicyDocument[]> = {
  "Narok": [
    { name: "Narok County Fiscal Strategy Paper 2023", url: "https://repository.kippra.or.ke/handle/123456789/5369" },
    { name: "Narok County Fiscal Strategy Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5370" },
    { name: "Narok County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5368" },
    { name: "Narok County Annual Development Plan 2023/2024", url: "https://repository.kippra.or.ke/handle/123456789/5367" },
    { name: "Narok County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5650" },
    { name: "Narok County COVID-19 Social Economic Re-Engineering Recovery Strategy 2020/2021-2022/2023", url: "https://repository.kippra.or.ke/handle/123456789/4185" },
    { name: "Policy Brief No. 48 of 2023/2024 on Assessing Labour Productivity for Narok County", url: "https://repository.kippra.or.ke/handle/123456789/5079" },
    { name: "Narok County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4910" },
    { name: "Narok County Programme Based Budget 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5366" },
    { name: "Narok County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5372" },
    { name: "Socio-Economic Status of Narok County with COVID-19", url: "https://repository.kippra.or.ke/handle/123456789/4348" }
  ].map(p => ({ title: p.name, url: p.url }))
};
