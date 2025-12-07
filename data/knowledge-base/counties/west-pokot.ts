
import type { PolicyDocument } from '../county-policies';

export const westPokotPolicies: Record<string, PolicyDocument[]> = {
  "West Pokot": [
    { name: "West Pokot County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5328" },
    { name: "West Pokot County Annual Development Plan 2026/2027", url: "https://repository.kippra.or.ke/handle/123456789/5638" },
    { name: "Policy Brief No. 74 of 2018-2019 on An Assessment of the Public Expenditure and Financial Accountability in West Pokot County", url: "https://repository.kippra.or.ke/handle/123456789/3030" },
    { name: "West Pokot County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4432" },
    { name: "024. County Government of West Pokot", url: "https://repository.kippra.or.ke/handle/123456789/745" },
    { name: "West Pokot County Gender Policy Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5520" },
    { name: "West Pokot County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5329" },
    { name: "West Pokot County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5483" },
    { name: "West Pokot County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5484" },
    { name: "Policy Brief No. 62 of 2023/2024 on Assessing Labour Productivity for West Pokot County", url: "https://repository.kippra.or.ke/handle/123456789/5113" },
    { name: "West Pokot County Debt Management Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5482" },
    { name: "West-Pokot-County-Agro-Ecology-Policy Paper-2025", url: "https://repository.kippra.or.ke/handle/123456789/5521" },
    { name: "West Pokot County Poverty Graduation Policy 2020", url: "https://repository.kippra.or.ke/handle/123456789/3216" },
    { name: "West Pokot County ICT Roadmap", url: "http://10.0.0.19/handle/123456789/779" }
  ].map(p => ({ title: p.name, url: p.url }))
};
