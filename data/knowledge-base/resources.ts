
export interface Link {
  name: string;
  url: string;
}

export interface DataSourceCategory {
  title: string;
  key: string;
  links: Link[];
}

export const dataSourceCategories: DataSourceCategory[] = [
  {
    title: 'International Data',
    key: 'international',
    links: [
      { name: 'Amnesty International', url: 'https://www.amnesty.org/en/' },
      { name: 'Citizenship Rights in Africa Initiative', url: 'http://citizenshiprightsafrica.org/' },
      { name: 'ConstitutionNet (International IDEA)', url: 'https://constitutionnet.org/' },
      { name: 'geoBoundaries', url: 'https://www.geoboundaries.org/' },
      { name: 'Human Rights Watch', url: 'https://www.hrw.org/' },
      { name: 'International Court of Justice (ICJ)', url: 'https://www.icj-cij.org/' },
      { name: 'Seattle University School of Law Digital Commons', url: 'https://digitalcommons.law.seattleu.edu/' },
      { name: 'SourceAfrica', url: 'https://sourceafrica.net/' },
      { name: 'United Nations Human Rights Office (OHCHR)', url: 'https://www.ohchr.org/en' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Continental Data',
    key: 'continental',
    links: [
      { name: 'African Court on Human and Peoples\' Rights', url: 'https://www.african-court.org/en' },
      { name: 'African Union (AU)', url: 'https://au.int/' },
      { name: 'East African Community (EAC)', url: 'https://www.eac.int/' },
      { name: 'East African Court of Justice (EACJ)', url: 'http://eacj.org/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'National Data',
    key: 'national',
    links: [
      { name: 'Kenya Gazette', url: 'https://new.kenyalaw.org/gazettes/' },
      { name: 'Kenya Law Reports (National Council for Law Reporting)', url: 'http://kenyalaw.org/' },
      { name: 'Kenya National Commission on Human Rights (KNCHR)', url: 'https://www.knchr.org/' },
      { name: 'Parliament of Kenya', url: 'http://www.parliament.go.ke/' },
      { name: 'State Law Office & Department of Justice', url: 'https://www.statelaw.go.ke/' },
      { name: 'The Judiciary of Kenya', url: 'https://www.judiciary.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Government Ministries',
    key: 'ministries',
    links: [
      { name: 'Ministry of Agriculture and Livestock Development', url: 'https://www.kilimo.go.ke/' },
      { name: 'Ministry of Co-operatives and MSME Development', url: 'https://www.ushirika.go.ke/' },
      { name: 'Ministry of Defence', url: 'https://mod.go.ke/' },
      { name: 'Ministry of EAC, The ASALS and Regional Development', url: 'https://www.meac.go.ke/' },
      { name: 'Ministry of Education', url: 'https://www.education.go.ke/' },
      { name: 'Ministry of Energy and Petroleum', url: 'https://www.energy.go.ke/' },
      { name: 'Ministry of Environment, Climate Change and Forestry', url: 'https://www.environment.go.ke/' },
      { name: 'Ministry of Gender, Culture, the Arts and Heritage', url: 'https://www.gender.go.ke/' },
      { name: 'Ministry of Health', url: 'https://www.health.go.ke/' },
      { name: 'Ministry of Information, Communications and the Digital Economy', url: 'https://www.ict.go.ke/' },
      { name: 'Ministry of Interior and National Administration', url: 'https://www.interior.go.ke/' },
      { name: 'Ministry of Investments, Trade and Industry', url: 'https://www.trade.go.ke/' },
      { name: 'Ministry of Labour and Social Protection', url: 'https://www.labour.go.ke/' },
      { name: 'Ministry of Lands, Public Works, Housing and Urban Development', url: 'https://lands.go.ke/' },
      { name: 'Ministry of Mining, Blue Economy and Maritime Affairs', url: 'https://www.mining.go.ke/' },
      { name: 'Ministry of Public Service, Performance and Delivery Management', url: 'https://www.psyg.go.ke/' },
      { name: 'Ministry of Roads and Transport', url: 'https://www.transport.go.ke/' },
      { name: 'Ministry of Tourism and Wildlife', url: 'https://www.tourism.go.ke/' },
      { name: 'Ministry of Water, Sanitation and Irrigation', url: 'https://www.water.go.ke/' },
      { name: 'Ministry of Youth Affairs, The Arts and Sports', url: 'https://www.youth.go.ke/' },
      { name: 'Office of the Attorney General & Department of Justice', url: 'https://www.statelaw.go.ke/' },
      { name: 'Office of the Deputy President', url: 'https://www.deputypresident.go.ke/' },
      { name: 'Office of the President', url: 'https://www.president.go.ke/' },
      { name: 'Office of the Prime Cabinet Secretary & Ministry of Foreign and Diaspora Affairs', url: 'https://www.mfa.go.ke/' },
      { name: 'The National Treasury and Economic Planning', url: 'https://www.treasury.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Commissions & Independent Offices',
    key: 'commissions-offices',
    links: [
        { name: 'Commission on Revenue Allocation (CRA)', url: 'https://cra.go.ke/' },
        { name: 'Independent Electoral and Boundaries Commission (IEBC)', url: 'https://www.iebc.or.ke/' },
        { name: 'Judicial Service Commission (JSC)', url: 'https://www.jsc.go.ke/' },
        { name: 'Kenya National Human Rights and Equality Commission (KNHREC)', url: 'https://www.knchr.org/' },
        { name: 'National Land Commission (NLC)', url: 'https://landcommission.go.ke/' },
        { name: 'National Police Service Commission (NPSC)', url: 'https://www.npsc.go.ke/' },
        { name: 'Office of the Auditor-General (OAG)', url: 'https://www.oagkenya.go.ke/' },
        { name: 'Office of the Controller of Budget (OCOB)', url: 'https://cob.go.ke/' },
        { name: 'Parliamentary Service Commission (PSC)', url: 'http://www.parliament.go.ke/the-psc' },
        { name: 'Public Service Commission (PSC)', url: 'https://www.publicservice.go.ke/' },
        { name: 'Salaries and Remuneration Commission (SRC)', url: 'https://www.src.go.ke/' },
        { name: 'Teachers Service Commission (TSC)', url: 'https://www.tsc.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Regional/County Data',
    key: 'regional-county',
    links: [
      { name: 'County Assemblies Forum (CAF)', url: 'https://www.countyassemblies.or.ke/' },
      { name: 'Council of Governors (CoG)', url: 'https://cog.go.ke/' },
      { name: 'Frontier Counties Development Council (FCDC)', url: 'https://fcdc.or.ke/' },
      { name: 'Jumuiya ya Kaunti za Pwani (JKP)', url: 'https://jumuiya.org/' },
      { name: 'Lake Region Economic Bloc (LREB)', url: 'https://lreb.or.ke/' },
      { name: 'North Rift Economic Bloc (NOREB)', url: 'https://noreb.go.ke/' },
      { name: 'The Intergovernmental Relations Technical Committee (IGRTC)', url: 'https://www.igrtc.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
];
