
export interface NationalPolicy {
  title: string;
  description?: string;
  url: string;
  category: string;
}

export const nationalPoliciesData: NationalPolicy[] = [
  // Key Blueprints & Agendas
  {
    title: 'The Bottom-Up Economic Transformation Agenda (BETA)',
    description: "The current government's economic model focusing on empowering marginalized populations by investing in agriculture, MSMEs, housing, healthcare, and the digital & creative economy.",
    url: 'https://www.industrialization.go.ke/sites/default/files/2023-11/BETA%20STATEMENT%20%281%29.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Kenya Vision 2030',
    description: 'The long-term national development blueprint aimed at transforming Kenya into a newly industrializing, middle-income country providing a high quality of life to all its citizens by 2030.',
    url: 'https://vision2030.go.ke/wp-content/uploads/2021/05/Vision-2030-Popular-Version.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Fourth Medium-Term Plan (MTP IV) 2023-2027',
    description: 'The current five-year implementation plan for Vision 2030, operationalizing the Bottom-Up Economic Transformation Agenda (BETA).',
    url: 'https://www.treasury.go.ke/wp-content/uploads/2023/06/FOURTH-MEDIUM-TERM-PLAN-2023-2027.pdf',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Third Medium Term Plan (MTP III) 2018-2022',
    description: 'Prioritized the "Big Four" Agenda: manufacturing, universal health coverage, affordable housing, and food security.',
    url: 'https://vision2030.go.ke/publication/third-medium-term-plan-2018-2022/',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Digital Master Plan 2022-2032',
    description: 'A strategic framework to guide the countrys digital transformation and growth of the ICT sector.',
    url: 'https://www.ict.go.ke/wp-content/uploads/2022/04/Kenya-Digital-Master-Plan-2022-2032.pdf',
    category: 'Key Blueprints & Agendas',
  },

  // Environment & Climate
  {
    title: 'National Climate Change Action Plan (2023-2027)',
    description: "Outlines strategies and measures to lower greenhouse gas emissions and adapt to the impacts of climate change, aligning with Kenya's sustainable development goals.",
    url: 'https://www.environment.go.ke/wp-content/uploads/2023/09/KENYA-NCCAP-LONG-VERSION-2023-2027-1.pdf',
    category: 'Environment, Water & Climate Change',
  },
  {
    title: "Discussion Paper No. 356 of 2024 on The Implications of Restoration Programmes on Forest Cover in Kenya's Water Towers",
    url: "https://repository.kippra.or.ke/handle/123456789/5373",
    category: "Environment, Water & Climate Change"
  },
  {
    title: "Discussion Paper No. 367 of 2024 on Integrating Adaptive Forest Management and Transition to Alternative Energy Sources in Kenya's Tea Industry",
    url: "https://repository.kippra.or.ke/handle/123456789/5522",
    category: "Environment, Water & Climate Change"
  },
  {
    title: "Sessional Paper No. 07 of 2024 on The National Sanitation Management Policy",
    url: "https://repository.kippra.or.ke/handle/123456789/5584",
    category: "Environment, Water & Climate Change"
  },
  {
    title: "National Energy Policy, 2018",
    description: "Provides a comprehensive framework for the sustainable, adequate, affordable, competitive, secure and reliable supply of energy.",
    url: "https://kplc.co.ke/img/full/i3qK4P5L7s4s_National_Energy_Policy_October_2018.pdf",
    category: "Environment, Water & Climate Change"
  },

  // Governance & Security
  {
    title: "Sector Plan for Security Peace Building and Conflict Management 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/96",
    category: "Governance & Security"
  },
  {
    title: "Special Paper No. 36 of 2024 on Devolution at 10 years: Achievements and Opportunities for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5393",
    category: "Governance & Security"
  },
  {
    title: "Policy Brief No. 15 of 2023-2024 on Leveraging Role of Non-Governmental Organizations to Spur Development in Arid and Semi-Arid Lands of Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/4639",
    category: "Governance & Security"
  },

  // Economy & Trade
  {
    title: "Kenya Digital Economy Blueprint",
    description: "A framework to transform Kenya into a digital economy.",
    url: "https://www.ict.go.ke/wp-content/uploads/2019/05/Kenya-Digital-Economy-2019.pdf",
    category: "Economy, Trade & Finance"
  },
  {
    title: "National Tax Policy",
    description: "Provides guidelines for the administration of tax laws and development of tax policies to ensure predictability and certainty.",
    url: "https://www.treasury.go.ke/wp-content/uploads/2023/06/National-Tax-Policy.pdf",
    category: "Economy, Trade & Finance"
  },
  {
    title: "Special Paper No. 37 of 2024 on County Business Environment for Micro and Small Enterprises in Kenya 2024",
    url: "https://repository.kippra.or.ke/handle/123456789/5447",
    category: "Economy, Trade & Finance"
  },
  {
    title: "Sector Plan for Tourism 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/91",
    category: "Economy, Trade & Finance"
  },
  {
    title: "Sessional Paper No. 09 of 2012 on National Industrialization Policy Framework for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5585",
    category: "Economy, Trade & Finance"
  },

  // Social Services
  {
    title: "The National Reproductive Health Policy 2022-2032",
    url: "https://repository.kippra.or.ke/handle/123456789/5363",
    category: "Social Services & Human Capital"
  },
  {
    title: "Kenya Mental Health Policy 2015-2030",
    description: "Provides a framework for interventions to secure mental health systems reforms in Kenya.",
    url: "https://health.go.ke/sites/default/files/2023-06/Kenya%20Mental%20Health%20Policy%202015-2030.pdf",
    category: "Social Services & Human Capital"
  },
  {
    title: "Sector Plan for Sports, Arts and Culture 2018",
    url: "https://repository.kippra.or.ke/handle/123456789/4106",
    category: "Social Services & Human Capital"
  },
  {
    title: "Working Paper No. 04 of 2001 on Education Indicators in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/2872",
    category: "Social Services & Human Capital"
  },

  // Land & Housing
  {
    title: "National Housing Policy for Kenya (Sessional Paper No. 3 of 2016)",
    url: "https://repository.kippra.or.ke/handle/123456789/5586",
    category: "Land, Housing & Infrastructure"
  },
  {
    title: "Sessional Paper No. 1 of 2017 on National Land Use Policy",
    description: "Guides the optimal utilization of land in the country.",
    url: "https://lands.go.ke/wp-content/uploads/2018/08/National-Land-Use-Policy-2017.pdf",
    category: "Land, Housing & Infrastructure"
  },
  {
    title: "Discussion Paper No. 354 of 2024 on Addressing Kenya's Digital Divide: County Disparities and Strategies for Inclusive Growth",
    url: "https://repository.kippra.or.ke/handle/123456789/5254",
    category: "Land, Housing & Infrastructure"
  },
  {
    title: "Sector Plan for Land Reforms 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/95",
    category: "Land, Housing & Infrastructure"
  },

  // Agriculture
  {
    title: "Discussion Paper No. 355 of 2024 on Effects of Climate Change on Crop Revenue in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5255",
    category: "Agriculture & Food Security"
  },
  {
    title: "Guidelines for Promotion, Development and Management of Irrigation in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5588",
    category: "Agriculture & Food Security"
  },

  // Historical & Speeches
  {
    title: "Speech by His Excellency President William Samoei Ruto on Jamhuri Day December 12, 2024",
    url: "https://repository.kippra.or.ke/handle/123456789/5652",
    category: "Presidential Speeches"
  },
  {
    title: "Speech by His Excellency President William Samoei Ruto on Madaraka Day June 1, 2025",
    url: "https://repository.kippra.or.ke/handle/123456789/5324",
    category: "Presidential Speeches"
  },
  {
    title: 'Sessional Paper No. 10 of 1965',
    description: 'African Socialism and its Application to Planning in Kenya.',
    url: 'https://knls.ac.ke/wp-content/uploads/AFRICAN-SOCIALISM-AND-ITS-APPLICATION-TO-PLANNING-IN-KENYA.pdf',
    category: 'Historical Documents',
  },
  {
    title: "National Development Plan for the Period 1994-1996",
    url: "https://repository.kippra.or.ke/handle/123456789/1431",
    category: "Historical Documents"
  }
];
