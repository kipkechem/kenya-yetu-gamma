
export interface NationalPolicy {
  title: string;
  description?: string;
  url: string;
  category: string;
}

export const nationalPoliciesData: NationalPolicy[] = [
  // Existing Blueprints & Agendas
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
    title: 'The Big Four Agenda (2018-2022)',
    description: "Previous administration's agenda focusing on food security, housing, manufacturing, and healthcare.",
    url: 'https://www.president.go.ke/the-big-four/',
    category: 'Key Blueprints & Agendas',
  },
  {
    title: 'Sessional Paper No. 10 of 1965',
    description: 'African Socialism and its Application to Planning in Kenya.',
    url: 'https://knls.ac.ke/wp-content/uploads/AFRICAN-SOCIALISM-AND-ITS-APPLICATION-TO-PLANNING-IN-KENYA.pdf',
    category: 'Key Blueprints & Agendas',
  },

  // Agriculture & Food
  {
    title: "Sessional Paper No. 02 of 2021 on The National Agricultural Policy",
    url: "https://repository.kippra.or.ke/handle/123456789/5326",
    category: "Agriculture & Food"
  },
  {
    title: "Guidelines for Promotion, Development and Management of Irrigation in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5588",
    category: "Agriculture & Food"
  },

  // Education
  {
    title: "National Policy on Linking industry to Education, Training and Research 2024",
    url: "https://repository.kippra.or.ke/handle/123456789/5587",
    category: "Education"
  },

  // Environment
  {
    title: "Sessional Paper No. 03 of 1971 on Kenya Government Guarantee of a Loan to the Tana River Development Company",
    url: "https://repository.kippra.or.ke/handle/123456789/2947",
    category: "Environment"
  },
  {
    title: "Sessional Paper No. 02 of 1984 on Kenya Government Guarantee of a Loan to the Tana and Athi Rivers Development Authority",
    url: "https://repository.kippra.or.ke/handle/123456789/2999",
    category: "Environment"
  },
  {
    title: "Sessional Paper No. 01 of 1984 on Kenya Government Guarantee of a Loan to the Tana and Athi Rivers Development Authority (IBRD)",
    url: "https://repository.kippra.or.ke/handle/123456789/2991",
    category: "Environment"
  },
  {
    title: "National Climate Change Action Plan (2023-2027)",
    description: "Strategies to lower greenhouse gas emissions and adapt to climate change.",
    url: 'https://www.environment.go.ke/wp-content/uploads/2023/09/KENYA-NCCAP-LONG-VERSION-2023-2027-1.pdf',
    category: 'Environment',
  },

  // Finance & Economic
  {
    title: "Sessional paper No 01 of 2008 on Government of Kenya Guarantee Loan From Japan Bank for International Cooperation to The Kenya Ports Authority",
    url: "https://repository.kippra.or.ke/handle/123456789/1286",
    category: "Finance & Economic"
  },
  {
    title: "Sessional Paper No. 06 of 1968/69 on Guarantee for a Loan from the Commonwealth Development Corporation to the National Housing Corporation",
    url: "https://repository.kippra.or.ke/handle/123456789/1757",
    category: "Finance & Economic"
  },

  // General
  {
    title: "Sessional Paper No. 09 of 1976 on Government Guarantee for a Loan by First National City Bank to Pan-African Paper Mills",
    url: "https://repository.kippra.or.ke/handle/123456789/1583",
    category: "General"
  },

  // Governance & Administration
  {
    title: "Sessional Paper No. 03 of 2016 on National Housing Policy for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5586",
    category: "Governance & Administration"
  },
  {
    title: "Sessional Paper No. 03 of 2019 on National Policy for the Eradication of Female Genital Mutilation",
    url: "https://repository.kippra.or.ke/handle/123456789/552",
    category: "Governance & Administration"
  },

  // Health
  {
    title: "Sessional Paper No. 07 of 2024 on The National Sanitation Management Policy",
    url: "https://repository.kippra.or.ke/handle/123456789/5584",
    category: "Health"
  },
  {
    title: "The National Reproductive Health Policy 2022-2032",
    url: "https://repository.kippra.or.ke/handle/123456789/5363",
    category: "Health"
  },
  {
    title: "National Guidance on Integrating Mental Health into Key and Vulnerable Populations Programming",
    url: "https://repository.kippra.or.ke/handle/123456789/5591",
    category: "Health"
  },

  // Strategic National Plans
  {
    title: "National Development Plan of 1974-1978 Part II",
    url: "https://repository.kippra.or.ke/handle/123456789/1428",
    category: "Strategic National Plans"
  },
  {
    title: "National Development Plan for the Period 1994-1996",
    url: "https://repository.kippra.or.ke/handle/123456789/1431",
    category: "Strategic National Plans"
  },

  // Tourism
  {
    title: "National Tourism Blueprint 2030",
    url: "https://repository.kippra.or.ke/handle/123456789/1842",
    category: "Tourism"
  },

  // Trade & Industry
  {
    title: "Sessional Paper No. 09 of 2012 on National Industrialization Policy Framework for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5585",
    category: "Trade & Industry"
  }
];
