
import type { PolicyDocument } from '../county-policies';

export const transNzoiaPolicies: Record<string, PolicyDocument[]> = {
  "Trans Nzoia": [
    { name: "Trans Nzoia County Annual Development Plan 2016/2017", url: "https://repository.kippra.or.ke/handle/123456789/4886" },
    { name: "Trans Nzoia County Integrated Development Plan 2013-2017", url: "http://10.0.0.19/handle/123456789/820" },
    { name: "Trans Nzoia County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4357" },
    { name: "026. County Government of Trans-Nzoia", url: "https://repository.kippra.or.ke/handle/123456789/804" },
    { name: "Trans Nzoia County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5341" },
    { name: "Trans Nzoia County Annual Development Plan 2026/2027", url: "https://repository.kippra.or.ke/handle/123456789/5645" },
    { name: "Trans Nzoia County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5340" },
    { name: "Trans Nzoia County Approved Budget Estimates 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5438" },
    { name: "Trans Nzoia County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5646" },
    { name: "Trans Nzoia County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5342" },
    { name: "Policy Brief No. 57 of 2023/2024 on Assessing Labour Productivity for Trans Nzoia County", url: "https://repository.kippra.or.ke/handle/123456789/5108" },
    { name: "Trans Nzoia County Investment Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5647" },
    { name: "Trans Nzoia County Monitoring and Evaluation Policy 2019", url: "http://10.0.0.19/handle/123456789/826" },
    { name: "The Trans Nzoia County Public Particiation and Civic Education Policy Framework 2020", url: "https://repository.kippra.or.ke/handle/123456789/3995" }
  ].map(p => ({ title: p.name, url: p.url }))
};
