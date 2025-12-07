
import type { PolicyDocument } from '../county-policies';

export const wajirPolicies: Record<string, PolicyDocument[]> = {
  "Wajir": [
    { name: "Wajir County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5330" },
    { name: "Wajir County Annual Development Plan 2023/2024", url: "https://repository.kippra.or.ke/handle/123456789/5331" },
    { name: "Wajir County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5550" },
    { name: "Wajir County Annual Development Plan 2026/2027", url: "https://repository.kippra.or.ke/handle/123456789/5574" },
    { name: "Wajir County Revenue Enhancement Action Plan 2025", url: "https://repository.kippra.or.ke/handle/123456789/5553" },
    { name: "Wajir County integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4365" },
    { name: "Wajir County Integrated Development Plan 2018-2022", url: "http://10.0.0.19/handle/123456789/499" },
    { name: "Policy Brief No. 15 of 2023-2024 on Leveraging Role of Non-Governmental Organizations to Spur Development in Arid and Semi-Arid Lands of Kenya", url: "https://repository.kippra.or.ke/handle/123456789/4639" },
    { name: "Wajir County Integrated Development Plan 2013-2017", url: "http://10.0.0.19/handle/123456789/498" },
    { name: "Wajir County Hazards Atlas Map 2023", url: "https://repository.kippra.or.ke/handle/123456789/5026" },
    { name: "008. County Government of Wajir", url: "https://repository.kippra.or.ke/handle/123456789/234" },
    { name: "Wajir County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5554" },
    { name: "Wajir County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5551" },
    { name: "Wajir County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5332" },
    { name: "Policy Brief No. 61 of 2023/2024 on Assessing Labour Productivity for Wajir County", url: "https://repository.kippra.or.ke/handle/123456789/5112" },
    { name: "Wajir County Climate Change Action Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/5242" },
    { name: "Wajir County Solid Waste Management Policy 2023", url: "https://repository.kippra.or.ke/handle/123456789/5552" },
    { name: "Wajir County Covid 19 Socio-Economic Re-engineering Recovery Strategy 2020/2021-2022-2023", url: "https://repository.kippra.or.ke/handle/123456789/5243" },
    { name: "Socio-economic Status of Wajir County with Covid 19", url: "https://repository.kippra.or.ke/handle/123456789/4899" }
  ].map(p => ({ title: p.name, url: p.url }))
};
