
import type { PolicyDocument } from '../county-policies';

export const makueniPolicies: Record<string, PolicyDocument[]> = {
  "Makueni": [
    { name: "Makueni County Annual Development Plan 2013/2014", url: "http://10.0.0.19/handle/123456789/617" },
    { name: "Makueni County Annual Development Plan 2014/2015", url: "http://10.0.0.19/handle/123456789/618" },
    { name: "Makueni County Integrated Development Plan 2013-2017", url: "http://10.0.0.19/handle/123456789/643" },
    { name: "Policy Brief No. 69 of 2018-2019 on An Assessment of the Public Expenditure and Financial Accountability in Makueni County", url: "https://repository.kippra.or.ke/handle/123456789/3026" },
    { name: "Makueni County Transport Policy 2022", url: "https://repository.kippra.or.ke/handle/123456789/4205" },
    { name: "017. County Government of Makueni", url: "https://repository.kippra.or.ke/handle/123456789/341" },
    { name: "Makueni County Annual Development Plan 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5543" },
    { name: "Makueni County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4356" },
    { name: "Makueni County Programme Based Budget 2025/2026", url: "https://repository.kippra.or.ke/handle/123456789/5415" },
    { name: "Makueni County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5414" },
    { name: "Makueni County Budget Review and Outlook Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5625" },
    { name: "Policy Brief No. 73 of 2023/2024 on Assessing Labour Productivity for Makueni County", url: "https://repository.kippra.or.ke/handle/123456789/5095" },
    { name: "Makueni County Vision 2025", url: "https://repository.kippra.or.ke/handle/123456789/2307" },
    { name: "Makueni County Spatial Plan 2019-2029", url: "http://10.0.0.19/handle/123456789/648" },
    { name: "Socio-Economic Status of Makueni County with COVID-19", url: "https://repository.kippra.or.ke/handle/123456789/4252" }
  ].map(p => ({ title: p.name, url: p.url }))
};
