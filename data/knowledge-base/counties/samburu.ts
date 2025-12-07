
import type { PolicyDocument } from '../county-policies';

export const samburuPolicies: Record<string, PolicyDocument[]> = {
  "Samburu": [
    { name: "Samburu County Fiscal Strategy Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5360" },
    { name: "Samburu County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4522" },
    { name: "Samburu County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5358" },
    { name: "Samburu County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5170" },
    { name: "Samburu County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5637" },
    { name: "Samburu County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5361" },
    { name: "Samburu County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5359" },
    { name: "Policy Brief No. 52 of 2023/2024 on Assessing Labour Productivity for Samburu County", url: "https://repository.kippra.or.ke/handle/123456789/5083" },
    { name: "Samburu County Spatial Plan 2021-2031", url: "https://repository.kippra.or.ke/handle/123456789/4497" },
    { name: "Samburu County Debt Management Strategy 2024", url: "https://repository.kippra.or.ke/handle/123456789/5582" },
    { name: "Samburu County Sector Strategic and Investment Plan 2018/19-2022/23", url: "https://repository.kippra.or.ke/handle/123456789/2612" },
    { name: "Samburu County Health Sector Monitoring and Evaluation Plan 2018-2022", url: "https://repository.kippra.or.ke/handle/123456789/3191" },
    { name: "Samburu County Gender Policy 2024", url: "https://repository.kippra.or.ke/handle/123456789/5642" }
  ].map(p => ({ title: p.name, url: p.url }))
};
