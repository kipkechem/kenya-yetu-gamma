
export interface NationalPolicy {
  title: string;
  description: string;
  url: string;
  category: 'Blueprint' | 'Agenda' | 'Plan' | 'Historical';
}

export const nationalPoliciesData: NationalPolicy[] = [
  {
    title: 'The Bottom-Up Economic Transformation Agenda (BETA)',
    description: "The current government's economic model focusing on empowering marginalized populations by investing in agriculture, MSMEs, housing, healthcare, and the digital & creative economy.",
    url: 'https://www.industrialization.go.ke/sites/default/files/2023-11/BETA%20STATEMENT%20%281%29.pdf',
    category: 'Agenda',
  },
  {
    title: 'Kenya Vision 2030',
    description: 'The long-term national development blueprint aimed at transforming Kenya into a newly industrializing, middle-income country providing a high quality of life to all its citizens by 2030.',
    url: 'https://vision2030.go.ke/wp-content/uploads/2021/05/Vision-2030-Popular-Version.pdf',
    category: 'Blueprint',
  },
  {
    title: 'Fourth Medium-Term Plan (MTP IV) 2023-2027',
    description: 'The current five-year implementation plan for Vision 2030, operationalizing the Bottom-Up Economic Transformation Agenda (BETA).',
    url: 'https://www.treasury.go.ke/wp-content/uploads/2023/06/FOURTH-MEDIUM-TERM-PLAN-2023-2027.pdf',
    category: 'Plan',
  },
  {
    title: 'National Climate Change Action Plan (2023-2027)',
    description: "Outlines strategies and measures to lower greenhouse gas emissions and adapt to the impacts of climate change, aligning with Kenya's sustainable development goals.",
    url: 'https://www.environment.go.ke/wp-content/uploads/2023/09/KENYA-NCCAP-LONG-VERSION-2023-2027-1.pdf',
    category: 'Plan',
  },
  {
    title: 'The Big Four Agenda (2018-2022)',
    description: "The previous administration's development agenda focusing on four pillars: food security, affordable housing, manufacturing, and affordable healthcare for all.",
    url: 'https://www.president.go.ke/the-big-four/',
    category: 'Agenda',
  },
  {
    title: 'Sessional Paper No. 10 of 1965',
    description: 'Titled "African Socialism and its Application to Planning in Kenya," this paper provided the foundational policy framework for post-independence economic development.',
    url: 'https://knls.ac.ke/wp-content/uploads/AFRICAN-SOCIALISM-AND-ITS-APPLICATION-TO-PLANNING-IN-KENYA.pdf',
    category: 'Historical',
  },
];
