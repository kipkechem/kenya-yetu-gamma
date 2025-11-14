import React, { useState } from 'react';
import { BookOpenIcon, ExternalLinkIcon, ChevronDownIcon } from './icons';

// Define types for the different kinds of document cards
interface SubDocument {
  title: string;
  url: string;
}

interface Document {
  title: string;
  description: string;
  url: string;
  subDocuments?: undefined;
}

interface CollapsibleDocument {
  title: string;
  description: string;
  url?: undefined;
  subDocuments: SubDocument[];
}

type DocumentItem = Document | CollapsibleDocument;

// Data for the page
const documents: DocumentItem[] = [
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


const DocumentCard: React.FC<{ doc: Document }> = ({ doc }) => (
  <a
    href={doc.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{doc.title}</h3>
      <ExternalLinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{doc.description}</p>
  </a>
);

const CollapsibleDocumentCard: React.FC<{ doc: CollapsibleDocument }> = ({ doc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden transition-all duration-300 md:col-span-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6"
        aria-expanded={isExpanded}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{doc.title}</h3>
          <ChevronDownIcon className={`h-6 w-6 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{doc.description}</p>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 border-t border-border dark:border-dark-border">
          <ul className="mt-4 space-y-3">
            {doc.subDocuments.map(subDoc => (
              <li key={subDoc.title}>
                <a
                  href={subDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary dark:text-dark-primary hover:underline group"
                >
                  <ExternalLinkIcon className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500 transition-colors flex-shrink-0" />
                  <span className="truncate">{subDoc.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HistoricalDocumentsPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BookOpenIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Historical Documents</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A collection of key papers, drafts, and constitutions that have shaped the legal and political history of Kenya.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {documents.map(doc => 
            doc.subDocuments ? 
// Fix: Explicitly cast 'doc' to 'CollapsibleDocument' as TypeScript was not correctly narrowing the type within the ternary expression.
              <CollapsibleDocumentCard key={doc.title} doc={doc as CollapsibleDocument} /> :
              <DocumentCard key={doc.title} doc={doc as Document} />
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoricalDocumentsPage;