
import type { PolicyDocument } from '../county-policies';

export const murangaPolicies: Record<string, PolicyDocument[]> = {
  "Murang'a": [
    { name: "Murang'a County Budget Review and Outlook Paper 2019", url: "https://repository.kippra.or.ke/handle/123456789/4991" },
    { name: "Murang'a County Spatial Plan 2015-2030", url: "https://repository.kippra.or.ke/handle/123456789/4790" },
    { name: "Murang'a County Annual Development Plan 2020/2021", url: "https://repository.kippra.or.ke/handle/123456789/3511" },
    { name: "Murang'a County Annual Development Plan 2019/2020", url: "http://10.0.0.19/handle/123456789/684" },
    { name: "Murang'a County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4474" },
    { name: "Murang'a County Annual Development Plan 2018/2019", url: "http://10.0.0.19/handle/123456789/683" },
    { name: "Murang'a County Integrated Development Plan 2018-2022", url: "http://10.0.0.19/handle/123456789/155" },
    { name: "Murang'a County Integrated Development Plan 2013-2017", url: "http://10.0.0.19/handle/123456789/145" },
    { name: "Murang'a County School Feeding Policy 2025", url: "https://repository.kippra.or.ke/handle/123456789/5504" },
    { name: "Murang'a County Annual Development Plan 2023/2024", url: "https://repository.kippra.or.ke/handle/123456789/4702" },
    { name: "Murang'a County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5485" },
    { name: "Murang'a County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5487" },
    { name: "Murang'a County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5512" },
    { name: "Murangá County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5421" },
    { name: "Murangá County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5420" },
    { name: "Policy Brief No. 71 of 2023/2024 on Assessing Labour Productivity for Murangá County", url: "https://repository.kippra.or.ke/handle/123456789/5102" },
    { name: "Muranga County Debt Management Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5635" },
    { name: "Murang'a County Multi Sectoral Food and Nutrition Security Policy 2024", url: "https://repository.kippra.or.ke/handle/123456789/5495" },
    { name: "Murang'a County Fiscal Strategy Paper 2015", url: "https://repository.kippra.or.ke/handle/123456789/4987" },
    { name: "Murang'a County Fiscal Strategy Paper 2014", url: "https://repository.kippra.or.ke/handle/123456789/4988" }
  ].map(p => ({ title: p.name, url: p.url }))
};
