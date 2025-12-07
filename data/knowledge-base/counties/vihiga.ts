
import type { PolicyDocument } from '../county-policies';

export const vihigaPolicies: Record<string, PolicyDocument[]> = {
  "Vihiga": [
    { name: "Policy Brief No. 60 of 2023/2024 on Assessing Labour Productivity for Vihiga County", url: "https://repository.kippra.or.ke/handle/123456789/5111" },
    { name: "Vihiga County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4340" },
    { name: "Vihiga County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5185" },
    { name: "Vihiga County Programme Based Budget 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5187" },
    { name: "Vihiga County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5462" },
    { name: "Vihiga County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5253" },
    { name: "Vihiga County Climate Change Action Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/5337" },
    { name: "Vihiga County Agroecology Policy 2025", url: "https://repository.kippra.or.ke/handle/123456789/5335" },
    { name: "Vihiga County  Integrated Transport Policy 2015", url: "http://10.0.0.19/handle/123456789/1164" },
    { name: "Socio-Economic Status of Vihiga County with COVID-19", url: "https://repository.kippra.or.ke/handle/123456789/4524" }
  ].map(p => ({ title: p.name, url: p.url }))
};
