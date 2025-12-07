
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
  {
    title: "National Development Plan for the Period 1994-1996",
    url: "https://repository.kippra.or.ke/handle/123456789/1431",
    category: "Historical"
  },
  {
    title: "Sessional Paper No. 09 of 2012 on National Industrialization Policy Framework for Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5585",
    category: "Trade & Industry"
  },
  {
    title: "Sessional Paper No. 04 of 1974 on Government Guarantee for Loans to KTDA",
    url: "https://repository.kippra.or.ke/handle/123456789/1609",
    category: "Finance & Economic"
  },
  {
    title: "Sessional Paper No.3 of 1974 on the Kenya Tea Development Authority (Tea Factory Project)",
    url: "https://repository.kippra.or.ke/handle/123456789/2948",
    category: "Agriculture & Food"
  },
  {
    title: "Sessional Paper No. 1 of 1988 on Government Guarantee of Loans to KTDA",
    url: "https://repository.kippra.or.ke/handle/123456789/2934",
    category: "Finance & Economic"
  },

  // Research Papers
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
    title: "Discussion Paper No. 354 of 2024 on Addressing Kenya's Digital Divide",
    url: "https://repository.kippra.or.ke/handle/123456789/5254",
    category: "ICT"
  },
  {
    title: "Discussion Paper No. 355 of 2024 on Effects of Climate Change on Crop Revenue in Kenya",
    url: "https://repository.kippra.or.ke/handle/123456789/5255",
    category: "Agriculture & Food"
  },
  {
    title: "Discussion Paper No. 356 of 2024 on The Implications of Restoration Programmes on Forest Cover",
    url: "https://repository.kippra.or.ke/handle/123456789/5373",
    category: "Environment"
  },
  {
    title: "Discussion Paper No. 367 of 2024 on Integrating Adaptive Forest Management in Kenya's Tea Industry",
    url: "https://repository.kippra.or.ke/handle/123456789/5522",
    category: "Environment"
  },
   {
      title: "Discussion Paper No 360 of 2024 on Effect of Export Levies on Hides and Skins",
      url: "https://repository.kippra.or.ke/handle/123456789/5392",
      category: "Trade & Industry"
    },
    {
      title: "Discussion Paper No. 195 of 2017 on Analysis of Opportunity Cost of Agroforestry",
      url: "https://repository.kippra.or.ke/handle/123456789/2672",
      category: "Environment"
    },
    {
      title: "Discussion Paper No. 238 of 2020 on Effects of Forest Co-management on Adoption of On-Farm Tree Planting",
      url: "https://repository.kippra.or.ke/handle/123456789/2791",
      category: "Environment"
    },
    {
      title: "Discussion Paper No. 265 of 2021 on The Influence of Pedagogy on Self Efficacy of University Students",
      url: "https://repository.kippra.or.ke/handle/123456789/3862",
      category: "Education"
    },
    {
      title: "Discussion Paper No. 133 of 2012 on The Water Poverty Index",
      url: "https://repository.kippra.or.ke/handle/123456789/2492",
      category: "Water & Sanitation"
    },
    {
      title: "Special Paper No. 30 of 2022 on Research Ecosystem Strengthening",
      url: "https://repository.kippra.or.ke/handle/123456789/3676",
      category: "Trade & Industry"
    },

  // Speeches
  {
    title: "Speech by His Excellency President William Samoei Ruto on Mashujaa Day Oct 20, 2023",
    url: "https://repository.kippra.or.ke/handle/123456789/4562",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President William Samoei Ruto on Madaraka Day June 1, 2023",
    url: "https://repository.kippra.or.ke/handle/123456789/4563",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President Uhuru Kenyatta on Madaraka Day, June 1, 2022",
    url: "https://repository.kippra.or.ke/handle/123456789/3719",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President Uhuru Kenyatta on Mashujaa Day, Oct 20, 2021",
    url: "https://repository.kippra.or.ke/handle/123456789/3274",
    category: "Speeches"
  },
  {
    title: "Speech by His Excellency President Mwai Kibaki on Madaraka Day, June 1, 2010",
    url: "https://repository.kippra.or.ke/handle/123456789/2334",
    category: "Speeches"
  },
  
  // Policies
  {
    title: "The National Reproductive Health Policy 2022-2032",
    url: "https://repository.kippra.or.ke/handle/123456789/5363",
    category: "Health"
  },
  {
    title: "Sector Plan for Sports, Arts and Culture 2018",
    url: "https://repository.kippra.or.ke/handle/123456789/4106",
    category: "Culture & Sports"
  },
  {
    title: "Sector Plan for Land Reforms 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/95",
    category: "Land & Environment"
  },
  {
    title: "Sector Plan for Population, Urbanization and Housing 2013-2017",
    url: "https://repository.kippra.or.ke/handle/123456789/86",
    category: "Governance & Administration"
  }
];
