import type { Ministry } from '../types';

export const ministries: Ministry[] = [
  {
    name: 'Office of the President',
    cabinetSecretary: 'President',
    url: 'https://www.president.go.ke/',
    principalSecretaries: [
      { title: 'Comptroller of the Household', department: 'State House' },
      { title: 'Principal Secretary', department: 'Cabinet Affairs' },
    ],
    mandatedEntities: [
        'Betting Control and Licensing Board',
        'Kenya Vision 2030 Delivery Secretariat',
        'National Cohesion and Integration Commission',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Office of the Deputy President',
    cabinetSecretary: 'Deputy President',
    url: 'https://www.deputypresident.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'Office of the Deputy President' },
    ],
  },
  {
    name: 'Office of the Prime Cabinet Secretary & Ministry of Foreign and Diaspora Affairs',
    cabinetSecretary: 'Prime Cabinet Secretary',
    url: 'https://www.mfa.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'Office of the Prime Cabinet Secretary' },
      { title: 'Principal Secretary', department: 'State Department for Foreign Affairs' },
      { title: 'Principal Secretary', department: 'State Department for Diaspora Affairs' },
      { title: 'Principal Secretary', department: 'State Department for Parliamentary Affairs' },
    ],
    mandatedEntities: [
        'Kenya National Commission for UNESCO',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Office of the Attorney General & Department of Justice',
    cabinetSecretary: 'Attorney General',
    url: 'https://www.statelaw.go.ke/',
    principalSecretaries: [
        { title: 'Solicitor-General', department: 'Department of Justice' }
    ],
    mandatedEntities: [
        'Advocates Complaints Commission',
        'Auctioneers Licensing Board',
        'Council of Legal Education (CLE)',
        'Kenya Law Reform Commission (KLRC)',
        'Kenya National Human Rights and Equality Commission (KNHREC)',
        'National Council for Law Reporting (Kenya Law)',
        'Office of the Registrar of Political Parties',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Interior and National Administration',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.interior.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Internal Security and National Administration' },
      { title: 'Principal Secretary', department: 'State Department for Correctional Services' },
      { title: 'Principal Secretary', department: 'State Department for Citizen Services' },
    ],
    mandatedEntities: [
        'Independent Policing Oversight Authority (IPOA)',
        'National Authority for the Campaign Against Alcohol and Drug Abuse (NACADA)',
        'National Police Service Commission (NPSC)',
        'NGOs Co-ordination Board',
        'Private Security Regulatory Authority',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'The National Treasury and Economic Planning',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.treasury.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'The National Treasury' },
      { title: 'Principal Secretary', department: 'State Department for Economic Planning' },
    ],
    mandatedEntities: [
        'Capital Markets Authority (CMA)',
        'Central Bank of Kenya (CBK)',
        'Commission on Revenue Allocation (CRA)',
        'Competition Authority of Kenya (CAK)',
        'Financial Reporting Centre',
        'Government Digital Payments Unit (eCitizen)',
        'Institute of Certified Public Accountants',
        'Institute of Certified Public Secretaries of Kenya',
        'Insurance Regulatory Authority (IRA)',
        'Kenya Accountants and Secretaries National Examination Board',
        'Kenya Deposit Insurance Corporation (KDIC)',
        'Kenya Institute of Certified Investments and Financial Analysts',
        'Kenya Institute of Supplies Management',
        'Kenya National Bureau of Statistics (KNBS)',
        'Kenya Revenue Authority (KRA)',
        'Privatization Authority',
        'Public Financial Management Reforms Secretariat (PFMR)',
        'Public Procurement Regulatory Authority (PPRA)',
        'Registration of Certified Public Secretaries Board',
        'Retirement Benefits Authority (RBA)',
        'Salaries and Remuneration Commission (SRC)',
        'Unclaimed Financial Assets Authority (UFAA)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Defence',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://mod.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Defence' },
    ],
  },
  {
    name: 'Ministry of Health',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.health.go.ke/',
    principalSecretaries: [
        { title: 'Principal Secretary', department: 'State Department for Medical Services' },
        { title: 'Principal Secretary', department: 'State Department for Public Health and Professional Standards' },
    ],
    mandatedEntities: [
        'Clinical Officers Council of Kenya',
        'Counsellors and Psychologists Board',
        'Health Records and Information Managers Board',
        'Kenya Health Professionals Oversight Authority',
        'Kenya Medical Laboratories Technicians and Technologists Board',
        'Kenya Medical Practitioners and Dentists Council (KMPDC)',
        'Kenya Medical Research Institute (KEMRI)',
        'Kenya Medical Supplies Authority (KEMSA)',
        'Kenya Medical Training College (KMTC)',
        'Kenya Nuclear Regulatory Authority',
        'Kenya Tissue and Transplant Authority',
        'Kenyatta National Hospital (KNH)',
        'National Syndemic Diseases Control Council',
        'Nursing Council of Kenya',
        'Pharmacy and Poisons Board (PPB)',
        'Physiotherapy Council of Kenya',
        'Public Health Officers and Technicians Council',
        'Social Health Authority (SHA)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Education',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.education.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Basic Education' },
      { title: 'Principal Secretary', department: 'State Department for Technical, Vocational Education and Training' },
      { title: 'Principal Secretary', department: 'State Department for Higher Education and Research' },
    ],
    mandatedEntities: [
        'Commission for University Education',
        'Curriculum Development Assessment and Certification Council',
        'Higher Education Loans Board (HELB)',
        'Jomo Kenyatta Foundation (JKF)',
        'Kenya Institute of Curriculum Development (KICD)',
        'Kenya Literature Bureau (KLB)',
        'Kenya National Examinations Council (KNEC)',
        'Kenya National Library Service (KNLS)',
        'Kenya National Qualifications Authority',
        'Kenya Universities and Colleges Placement Service',
        'National Commission for Science Technology and Innovation',
        'Teachers Service Commission (TSC)',
        'Technical and Vocational Education and Training Authority',
        'Universities Funding Board',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Agriculture and Livestock Development',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.kilimo.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Crop Development' },
      { title: 'Principal Secretary', department: 'State Department for Livestock Development' },
    ],
    mandatedEntities: [
        'Agricultural Development Corporation (ADC)',
        'Agricultural Finance Corporation (AFC)',
        'Agriculture and Food Authority',
        'Kenya Agricultural and Livestock Research Organization (KALRO)',
        'Kenya Dairy Board (KDB)',
        'Kenya Leather Development Council',
        'Kenya Meat Commission (KMC)',
        'Kenya Plant Health Inspectorate Service (KEPHIS)',
        'Kenya Veterinary Board (KVB)',
        'National Biosafety Authority',
        'National Cereals and Produce Board (NCPB)',
        'New Kenya Co-operative Creameries (New KCC)',
        'Pest Control Products Board',
        'Tea Board of Kenya',
        'Veterinary Medicines Directorate',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Investments, Trade and Industry',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.trade.go.ke/',
    principalSecretaries: [
        { title: 'Principal Secretary', department: 'State Department for Trade' },
        { title: 'Principal Secretary', department: 'State Department for Industry' },
        { title: 'Principal Secretary', department: 'State Department for Investment Promotion' },
    ],
    mandatedEntities: [
        'Anti-Counterfeit Authority',
        'East African Portland Cement Company',
        'Export Processing Zones Authority (EPZA)',
        'Industrial and Commercial Development Corporation (ICDC)',
        'Kenya Bureau of Standards (KEBS)',
        'Kenya Export Promotion and Branding Agency (KEPROBA)',
        'Kenya Industrial Estates (KIE)',
        'Kenya Industrial Property Institute (KIPI)',
        'Kenya Investment Authority',
        'Kenya National Accreditation Services',
        'Kenya National Trading Corporation (KNTC)',
        'Numerical Machining Complex (NMC)',
        'Scrap Metal Council',
        'Special Economic Zones Authority',
        'Warehouse Receipt Systems Council',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Lands, Public Works, Housing and Urban Development',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://lands.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Lands and Physical Planning' },
      { title: 'Principal Secretary', department: 'State Department for Public Works' },
      { title: 'Principal Secretary', department: 'State Department for Housing and Urban Development' },
    ],
    mandatedEntities: [
        'Board of Registered Architects and Quantity Surveyors',
        'Building Surveyors Registration Board',
        'Estate Agents Registration Board',
        'Land Surveyors Board',
        'National Construction Authority (NCA)',
        'National Housing Corporation (NHC)',
        'National Land Commission (NLC)',
        'Physical Planners Registration Board',
        'The National Building Inspectorate',
        'Valuers Registration Board',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Environment, Climate Change and Forestry',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.environment.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Environment and Climate Change' },
      { title: 'Principal Secretary', department: 'State Department for Forestry' },
    ],
    mandatedEntities: [
        'Kenya Forest Service (KFS)',
        'Kenya Meteorological Department',
        'Kenya Water Towers Agency (KWTA)',
        'National Climate Change Council',
        'National Environment Management Authority (NEMA)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Youth Affairs, The Arts and Sports',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.youth.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Youth Affairs and The Arts' },
      { title: 'Principal Secretary', department: 'State Department for Sports' },
    ],
    mandatedEntities: [
        'Anti-Doping Agency of Kenya (ADAK)',
        'Kenya Film Classification Board (KFCB)',
        'Kenya Film Commission (KFC)',
        'Sports Kenya',
        'Youth Enterprise Development Fund (YEDF)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Water, Sanitation and Irrigation',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.water.go.ke/',
    principalSecretaries: [
        { title: 'Principal Secretary', department: 'State Department for Water and Sanitation' },
        { title: 'Principal Secretary', department: 'State Department for Irrigation' },
    ],
    mandatedEntities: [
        'Athí Water Works Development Agency',
        'Coast Water Works Development Agency',
        'Eldoret Water and Sanitation Company (ELDOWAS)',
        'Hydrologists Registration Board',
        'Kisumu Water and Sanitation Company (KIWASCO)',
        'Kwale Water and Sewerage Company (KWAWASCO)',
        'Lake Victoria North Water Works Development Agency',
        'Lake Victoria South Water Works Development Agency',
        'Malindi Water and Sewerage Company (MAWASCO)',
        'Mombasa Water Supply & Sanitation Company Ltd. (MOWASCO)',
        'Nairobi City Water and Sewerage Company (NCWSC)',
        'Nakuru Water and Sanitation Services Company (NAWASSCO)',
        'National Irrigation Authority (NIA)',
        'National Water Harvesting and Storage Authority',
        'Northern Water Works Development Agency',
        'Nyeri Water and Sanitation Company (NYEWASCO)',
        'Rift Valley Water Works Development Agency',
        'Tanathi Water Works Development Agency',
        'Thika Water and Sewerage Company (THIWASCO)',
        'Water Resources Authority (WRA)',
        'Water Sector Trust Fund (WaterFund)',
        'Water Services Regulatory Board (WASREB)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Information, Communications and the Digital Economy',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.ict.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Broadcasting and Telecommunications' },
      { title: 'Principal Secretary', department: 'State Department for ICT and the Digital Economy' },
    ],
    mandatedEntities: [
        'Communications Authority of Kenya (CA)',
        'ICT Authority (ICTA)',
        'Kenya Broadcasting Corporation (KBC)',
        'Konza Technopolis Development Authority (KoTDA)',
        'Media Council of Kenya',
        'Office of the Data Protection Commissioner',
        'Postal Corporation of Kenya (Posta)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Tourism and Wildlife',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.tourism.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Tourism' },
      { title: 'Principal Secretary', department: 'State Department for Wildlife' },
    ],
    mandatedEntities: [
        'Kenya Safari Lodges and Hotels',
        'Kenya Tourism Board (KTB)',
        'Kenya Wildlife Service (KWS)',
        'Kenyatta International Convention Centre (KICC)',
        'Tourism Fund',
        'Tourism Regulatory Authority',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Roads and Transport',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.transport.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Roads' },
      { title: 'Principal Secretary', department: 'State Department for Transport' },
    ],
    mandatedEntities: [
        'Engineers Board of Kenya',
        'Kenya Airports Authority (KAA)',
        'Kenya Civil Aviation Authority',
        'Kenya Engineering Technologists Registration Board',
        'Kenya National Highways Authority (KeNHA)',
        'Kenya Pipeline Company (KPC)',
        'Kenya Ports Authority (KPA)',
        'Kenya Railways Corporation',
        'Kenya Roads Board (KRB)',
        'Kenya Rural Roads Authority (KeRRA)',
        'Kenya Urban Roads Authority (KURA)',
        'Lamu Port-South Sudan-Ethiopia-Transport (LAPSSET) Corridor Development Authority',
        'Nairobi Metropolitan Area Transport Authority (NaMATA)',
        'National Transport and Safety Authority (NTSA)',
        'The Railway City Development Authority',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Energy and Petroleum',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.energy.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Energy' },
      { title: 'Principal Secretary', department: 'State Department for Petroleum' },
    ],
    mandatedEntities: [
        'Energy & Petroleum Regulatory Authority (EPRA)',
        'Geothermal Development Company (GDC)',
        'Kenya Electricity Generating Company (KenGen)',
        'Kenya Electricity Transmission Company (KETRACO)',
        'Kenya Power and Lighting Company (KPLC)',
        'Rural Electrification and Renewable Energy Corporation (REREC)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Labour and Social Protection',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.labour.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Labour and Skills Development' },
      { title: 'Principal Secretary', department: 'State Department for Social Protection and Senior Citizen Affairs' },
    ],
    mandatedEntities: [
        'Kenya National Labour Board and the Wages Council',
        'National Council for Children\'s Services',
        'National Council for Persons with Disabilities (NCPWD)',
        'National Employment Authority',
        'National Industrial Training Authority',
        'National Social Security Fund (NSSF)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of East African Community (EAC), The ASALS and Regional Development',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.meac.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for EAC Affairs' },
      { title: 'Principal Secretary', department: 'State Department for ASALs and Regional Development' },
    ],
    mandatedEntities: [
        'Central Kenya Economic Bloc (CKEB)',
        'Coast Development Authority (CDA)',
        'Ewaso Ng\'iro North Development Authority (ENNDA)',
        'Ewaso Ng\'iro South Development Authority (ENSDA)',
        'Frontier Counties Development Council (FCDC)',
        'Intergovernmental Relations Technical Committee (IGRTC)',
        'Jumuiya ya Kaunti za Pwani (JKP)',
        'Kerio Valley Development Authority (KVDA)',
        'Lake Basin Development Authority (LBDA)',
        'Lake Region Economic Bloc (LREB)',
        'National Drought Management Authority',
        'North Rift Economic Bloc (NOREB)',
        'Northern Corridor Transit and Transport Coordination Authority (NCTTCA)',
        'South Eastern Kenya Economic Bloc (SEKEB)',
        'Tana and Athi Rivers Development Authority (TARDA)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Co-operatives and Micro, Small and Medium Enterprises (MSME) Development',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.ushirika.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Co-operatives' },
      { title: 'Principal Secretary', department: 'State Department for MSME Development' },
    ],
    mandatedEntities: [
        'Micro and Small Enterprise Authority',
        'Sacco Societies Regulatory Authority (SASRA)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Mining, Blue Economy and Maritime Affairs',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.mining.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Mining' },
      { title: 'Principal Secretary', department: 'State Department for Blue Economy and Fisheries' },
      { title: 'Principal Secretary', department: 'State Department for Shipping and Maritime Affairs' },
    ],
    mandatedEntities: [
        'Geologists Registration Board',
        'Kenya Fish Marketing Authority',
        'Kenya Fisheries Service',
        'Kenya Marine and Fisheries Research Institute (KMFRI)',
        'Kenya Maritime Authority (KMA)',
        'Mineral Rights Board',
        'National Mining Corporation',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Public Service, Performance and Delivery Management',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.psyg.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Public Service' },
      { title: 'Principal Secretary', department: 'State Department for Performance and Delivery Management' },
    ],
    mandatedEntities: [
        'Institute of Human Resource Management',
        'Kenya School of Government (KSG)',
        'Public Service Commission (PSC)',
    ].sort((a, b) => a.localeCompare(b))
  },
  {
    name: 'Ministry of Gender, Culture, the Arts and Heritage',
    cabinetSecretary: 'Cabinet Secretary',
    url: 'https://www.gender.go.ke/',
    principalSecretaries: [
      { title: 'Principal Secretary', department: 'State Department for Gender and Affirmative Action' },
      { title: 'Principal Secretary', department: 'State Department for Culture, the Arts and Heritage' },
    ],
    mandatedEntities: [
        'Bomas of Kenya',
        'Kenya Copyright Board (KECOBO)',
        'National Government Affirmative Action Fund (NGAAF)',
        'National Museums of Kenya (NMK)',
        'Uwezo Fund',
        'Women Enterprise Fund',
    ].sort((a, b) => a.localeCompare(b))
  }
];