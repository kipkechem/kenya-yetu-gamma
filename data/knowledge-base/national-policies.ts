
export interface NationalPolicy {
  title: string;
  description?: string;
  url: string;
  category: string;
}

export const nationalPoliciesData: NationalPolicy[] = [
  // Key Blueprints
  {
    title: 'The Bottom-Up Economic Transformation Agenda (BETA)',
    description: "The current government's economic model focusing on empowering marginalized populations.",
    url: 'https://www.industrialization.go.ke/sites/default/files/2023-11/BETA%20STATEMENT%20%281%29.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Kenya Vision 2030',
    description: 'The long-term national development blueprint aimed at transforming Kenya into a newly industrializing, middle-income country.',
    url: 'https://vision2030.go.ke/wp-content/uploads/2021/05/Vision-2030-Popular-Version.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Fourth Medium-Term Plan (MTP IV) 2023-2027',
    description: 'The current five-year implementation plan for Vision 2030.',
    url: 'https://www.treasury.go.ke/wp-content/uploads/2023/06/FOURTH-MEDIUM-TERM-PLAN-2023-2027.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'National Climate Change Action Plan (2023-2027)',
    description: "Strategies to lower greenhouse gas emissions and adapt to climate change.",
    url: 'https://www.environment.go.ke/wp-content/uploads/2023/09/KENYA-NCCAP-LONG-VERSION-2023-2027-1.pdf',
    category: 'Environment',
  },
  
  // Historical & Sessional Papers
  {
    title: 'Sessional Paper No. 10 of 1965',
    description: 'African Socialism and its Application to Planning in Kenya.',
    url: 'https://knls.ac.ke/wp-content/uploads/AFRICAN-SOCIALISM-AND-ITS-APPLICATION-TO-PLANNING-IN-KENYA.pdf',
    category: 'Historical',
  },
  {
    title: "National Development Plan of 1974-1978 Part II",
    url: "https://repository.kippra.or.ke/handle/123456789/1428",
    category: "Historical"
  },
  
  // Research & Special Papers
  {
    title: "Special Paper No. 36 of 2024 on Devolution at 10 years: Achievements and Opportunities for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5393",
    category: "Governance & Administration"
  },
  {
    title: "Special Paper No. 37 of 2024 on County Business Environment for Micro and Small Enterprises in Kenya 2024",
    url: "https://repository.kippra.or.ke/handle/123456789/5447",
    category: "Finance & Economic"
  },
  {
    title: "Discussion Paper No. 354 of 2024 on Addressing Kenya's Digital Divide: County Disparities and Strategies for Inclusive Growth",
    url: "https://repository.kippra.or.ke/handle/123456789/5254",
    category: "ICT"
  },
  {
    title: "Discussion Paper No. 355 of 2024 on Effects of Climate Change on Crop Revenue in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5255",
    category: "Agriculture & Food"
  },
  {
    title: "Resettlement Policy Framework",
    url: "https://repository.kippra.or.ke/handle/123456789/5590",
    category: "Land & Environment"
  },

  // Speeches
  {
    title: "Speech by His Excellency President William Samoei Ruto on Jamhuri Day December 12, 2022",
    url: "https://repository.kippra.or.ke/handle/123456789/3974",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President William Samoei Ruto on Madaraka Day June 1, 2025",
    url: "https://repository.kippra.or.ke/handle/123456789/5324",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President William Samoei Ruto on Mashujaa Day October 20, 2022",
    url: "https://repository.kippra.or.ke/handle/123456789/3873",
    category: "Speeches"
  },
  
  // Sector Plans
  {
    title: "Sector Plan for Tourism 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/91",
    category: "Culture & Sports"
  },
  {
    title: "Sector Plan for Security Peace Building and Conflict Management 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/96",
    category: "Governance & Administration"
  },
  {
    title: "Sector Plan for Land Reforms 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/95",
    category: "Land & Environment"
  }
];
