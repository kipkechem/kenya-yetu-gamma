
import type { PolicyDocument } from '../county-policies';

export const marsabitPolicies: Record<string, PolicyDocument[]> = {
  "Marsabit": [
    { name: "Marsabit County Annual Development Plan 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5532" },
    { name: "Marsabit County Fiscal Strategy Paper 2018", url: "http://10.0.0.19/handle/123456789/517" },
    { name: "Marsabit County Integrated Development Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/4513" },
    { name: "010. County Government of Marsabit", url: "https://repository.kippra.or.ke/handle/123456789/60" },
    { name: "Marsabit County Programme Based Budget 2024/2025", url: "https://repository.kippra.or.ke/handle/123456789/5434" },
    { name: "Marsabit County Fiscal Strategy Paper 2025", url: "https://repository.kippra.or.ke/handle/123456789/5624" },
    { name: "Marsabit County Budget Review and Outlook Paper 2024", url: "https://repository.kippra.or.ke/handle/123456789/5431" },
    { name: "Policy Brief No. 75 of 2023/2024 on Assessing Labour Productivity for Marsabit County", url: "https://repository.kippra.or.ke/handle/123456789/5097" },
    { name: "Marsabit County Climate Change Action Plan 2023-2027", url: "https://repository.kippra.or.ke/handle/123456789/5239" }
  ].map(p => ({ title: p.name, url: p.url }))
};
