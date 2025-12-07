
import type { PolicyDocument } from '../county-policies';

export const tanaRiverPolicies: Record<string, PolicyDocument[]> = {
  "Tana River": [
    { name: "Tana River County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5348" },
    { name: "Tana River County Fiscal Strategy Paper 2023", url: "https://repository.kippra.or.ke/handle/123456789/4358" },
    { name: "Tana River County Annual Development Plan 2026/2027", url: "https://repository.kippra.or.ke/handle/123456789/5516" },
    { name: "Tana River County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4867" },
    { name: "004. County Government of Tana River", url: "https://repository.kippra.or.ke/handle/123456789/182" },
    { name: "Tana River County Fiscal Strategy Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/4949" },
    { name: "Tana River County Integrated Development Plan 2013-2017", url: "http://10.0.0.19/handle/123456789/419" },
    { name: "Tana River County Programme Based Budget 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5120" },
    { name: "Tana River County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5349" },
    { name: "Tana River County Budget Review and Outlook Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5583" },
    { name: "Policy Brief No. 55 of 2023/2024 on Assessing Labour Productivity for Tana River County", url: "https://repository.kippra.or.ke/handle/123456789/5086" },
    { name: "Tana River County Budget Estimates 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5410" },
    { name: "Tana River County COVID-19 Social Economic Re-Engineering Recovery Strategy", url: "https://repository.kippra.or.ke/handle/123456789/4068" },
    { name: "Tana River County Monitoring and Evaluation Policy 2019", url: "https://repository.kippra.or.ke/handle/123456789/2048" }
  ].map(p => ({ title: p.name, url: p.url }))
};
