
export interface SubDocument {
  title: string;
  url: string;
}

export interface DocumentItem {
  title: string;
  description: string;
  url?: string;
  subDocuments?: SubDocument[];
}

export const documentsData: DocumentItem[] = [
  {
    title: 'The Constitution of Kenya, 1963 (Independence Constitution)',
    description: 'The first constitution of independent Kenya, which established a parliamentary system of government within the Commonwealth.',
    url: 'http://kenyalaw.org/kl/fileadmin/pdfdownloads/1963_Constitution.pdf',
  },
  {
    title: 'Sessional Paper No. 10 of 1965',
    description: 'Titled "African Socialism and Its Application to Planning in Kenya", this influential paper guided Kenya\'s post-independence economic policies.',
    url: 'https://knls.ac.ke/wp-content/uploads/AFRICAN-SOCIALISM-AND-ITS-APPLICATION-TO-PLANNING-IN-KENYA.pdf',
  },
  {
    title: 'The Constitution of Kenya Review Commission (CKRC) Report, 2002',
    description: 'The main report and draft bill from the CKRC (Ghai Commission) which collected public views on constitutional reform across the country.',
    url: 'http://citizenshiprightsafrica.org/wp-content/uploads/2016/01/Kenya-Const-Rev-Commission-2002.pdf',
  },
  {
    title: 'The Bomas Draft Constitution, 2004',
    description: 'A comprehensive draft produced by the National Constitutional Conference at the Bomas of Kenya, reflecting extensive public participation.',
    url: 'https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/118273/Kenya-4-Draft-Constitution-Bomas-Draft-2004.pdf',
  },
  {
    title: 'The Wako Draft Constitution, 2005',
    description: 'The Attorney General\'s proposed amendments to the Bomas Draft, which was subsequently presented at the 2005 constitutional referendum.',
    url: 'https://constitutionnet.org/sites/default/files/KETD-006.pdf',
  },
  {
    title: 'Report of the Commission of Inquiry into Post-Election Violence (CIPEV/Waki Report), 2008',
    description: 'The report investigated the facts and circumstances surrounding the 2007-2008 post-election violence in Kenya.',
    url: 'https://libraryir.parliament.go.ke/bitstreams/98cf8fd1-7135-41f9-9c49-1b38c3a7e07e/download',
  },
  {
    title: 'The Naivasha Draft / Harmonized Draft Constitution, 2010',
    description: 'The harmonized draft produced by the Committee of Experts in Naivasha, which formed the basis for the final Constitution of Kenya, 2010.',
    url: 'https://constitutionnet.org/sites/default/files/draft_from_the_parliamentary_select_committee_to_the_coe.pdf',
  },
  {
    title: 'Truth, Justice and Reconciliation Commission (TJRC) Report, 2013',
    description: 'A comprehensive report in several volumes detailing historical injustices, gross human rights violations, and recommendations for reconciliation.',
    subDocuments: [
      {
        title: 'Volume 1: Main Report',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1000&context=tjrc-core',
      },
      {
        title: 'Volume 2A: Land, Economic Crimes & Marginalization',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1001&context=tjrc-core',
      },
      {
        title: 'Volume 2B: Political Assassinations & Massacres',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1002&context=tjrc-core',
      },
      {
        title: 'Volume 2C: Repression & Women\'s Rights',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1003&context=tjrc-core',
      },
      {
        title: 'Volume 3: Accountability',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1006&context=tjrc-core',
      },
      {
        title: 'Volume 3: Annexes to Accountability',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1007&context=tjrc-core',
      },
      {
        title: 'Volume 4: Reparations',
        url: 'https://digitalcommons.law.seattleu.edu/cgi/viewcontent.cgi?article=1005&context=tjrc-core',
      },
    ]
  },
  {
    title: 'The Building Bridges Initiative (BBI) Report, 2019',
    description: 'The final report of the task force appointed to address nine key national challenges, proposing constitutional and legislative changes.',
    url: 'http://kenyalaw.org/kl/fileadmin/pdfdownloads/BBIFinalVersion.pdf',
  },
];
