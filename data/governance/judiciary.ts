
export interface JudicialBody {
    name: string;
    description: string;
    leadership?: { title: string; name?: string; }[];
    composition?: string[];
    jurisdiction?: string;
    powers?: string[];
    url?: string;
    children?: JudicialBody[];
}

export const judiciaryData: JudicialBody = {
    name: 'The Judiciary & Case Law',
    description: 'The system of courts and tribunals that interprets and applies the law in Kenya, as organized in the Kenya Law Case Law database.',
    leadership: [{ title: 'The Chief Justice & President of the Supreme Court' }],
    url: 'https://www.judiciary.go.ke/',
    powers: [
        'Administer justice irrespective of status',
        'Promote alternative forms of dispute resolution',
        'Interpret the Constitution',
        'Protect and promote the purposes and principles of the Constitution'
    ],
    children: [
        {
            name: 'Superior Courts',
            description: 'Courts with the status of a High Court or above, established by the Constitution.',
            children: [
                {
                    name: 'The Supreme Court',
                    description: 'The highest court in Kenya.',
                    leadership: [
                        { title: 'The Chief Justice (President)' },
                        { title: 'The Deputy Chief Justice (Vice-President)' },
                    ],
                    composition: ['5 Other Judges'],
                    jurisdiction: 'Exclusive original jurisdiction in presidential election disputes; appellate jurisdiction on constitutional matters and matters of general public importance.',
                    powers: [
                        'Hear and determine disputes relating to the elections to the office of President',
                        'Hear appeals from the Court of Appeal',
                        'Provide advisory opinions at the request of the National Government, any State organ, or any County Government',
                        'Review certifications by the Court of Appeal on matters of general public importance'
                    ],
                    url: 'https://new.kenyalaw.org/judgments/KESC/',
                },
                {
                    name: 'The Court of Appeal',
                    description: 'Hears appeals from the High Court and other tribunals.',
                    leadership: [{ title: 'President of the Court of Appeal' }],
                    composition: ['Not fewer than 12 Judges'],
                    jurisdiction: 'Appellate jurisdiction over the High Court and other courts/tribunals as prescribed by law.',
                    powers: [
                        'Hear appeals from the High Court',
                        'Hear appeals from any other court or tribunal as prescribed by an Act of Parliament'
                    ],
                    url: 'https://new.kenyalaw.org/judgments/KECA/',
                },
                {
                    name: 'The High Court',
                    description: 'Has unlimited original jurisdiction in criminal and civil matters. It is organised into specific divisions for administrative efficiency.',
                    leadership: [{ title: 'Principal Judge' }],
                    composition: ['Number of judges prescribed by Parliament'],
                    jurisdiction: 'Unlimited original jurisdiction, supervisory jurisdiction over subordinate courts, and interpretation of the Constitution.',
                    powers: [
                        'Determine whether a right or fundamental freedom in the Bill of Rights has been denied, violated, infringed or threatened',
                        'Hear any question respecting the interpretation of the Constitution',
                        'Supervisory jurisdiction over subordinate courts',
                        'Hear appeals from a decision of a tribunal appointed to consider the removal of a person from office'
                    ],
                    url: 'https://new.kenyalaw.org/judgments/KEHC/',
                    children: [
                        {
                            name: 'Anti-Corruption and Economic Crimes Division',
                            description: 'Deals with cases relating to corruption and economic crimes.'
                        },
                        {
                            name: 'Civil Division',
                            description: 'Deals with general civil disputes including personal injury, contracts, and torts.'
                        },
                        {
                            name: 'Commercial and Tax Division',
                            description: 'Deals with commercial transactions, banking, intellectual property, and tax disputes.'
                        },
                        {
                            name: 'Constitutional and Human Rights Division',
                            description: 'Deals with matters pertaining to the interpretation of the Constitution and enforcement of fundamental rights.'
                        },
                        {
                            name: 'Criminal Division',
                            description: 'Deals with serious criminal cases such as murder and appeals from lower courts.'
                        },
                        {
                            name: 'Family Division',
                            description: 'Deals with administration of estates, adoption, matrimonial property, divorce, and child custody.'
                        },
                        {
                            name: 'Judicial Review Division',
                            description: 'Reviews administrative actions of public bodies to ensure legality, fairness, and rationality.'
                        }
                    ]
                },
                {
                    name: 'Employment and Labour Relations Court',
                    description: 'Has the status of the High Court and deals with employment and labour relations disputes.',
                    leadership: [{ title: 'Principal Judge' }],
                    jurisdiction: 'Exclusive original and appellate jurisdiction to hear and determine all disputes referred to it in accordance with Article 162(2) of the Constitution.',
                    url: 'https://new.kenyalaw.org/judgments/KEELRC/',
                },
                {
                    name: 'Environment and Land Court',
                    description: 'Has the status of the High Court and deals with disputes relating to the environment and land.',
                    leadership: [{ title: 'Presiding Judge' }],
                    jurisdiction: 'Disputes relating to environmental planning, land use, titles, boundaries, rates, and resource management.',
                    url: 'https://new.kenyalaw.org/judgments/KEELC/',
                }
            ]
        },
        {
            name: 'Subordinate Courts',
            description: 'These are the lower courts established by Parliament.',
            children: [
                {
                    name: 'Magistrates\' Courts',
                    description: 'Have jurisdiction over a wide range of criminal and civil cases, as determined by law.',
                    jurisdiction: 'Geographical and pecuniary jurisdiction as defined by the Magistrates\' Courts Act.',
                    url: 'https://new.kenyalaw.org/judgments/KEMC/',
                },
                {
                    name: 'Kadhis\' Courts',
                    description: 'Deal with questions of Muslim law.',
                    jurisdiction: 'Limited to determination of questions of Muslim law relating to personal status, marriage, divorce or inheritance where all parties profess the Muslim religion.',
                    url: 'https://new.kenyalaw.org/judgments/KEKC/',
                },
                {
                    name: 'Small Claims Court',
                    description: 'A subordinate court designed to settle civil and commercial disputes with a monetary value of less than Ksh 1,000,000.',
                    jurisdiction: 'Simple pecuniary claims with proceedings designed to be simple, inexpensive, and expeditious.',
                    url: 'https://new.kenyalaw.org/judgments/SCC/',
                }
            ]
        },
        {
            name: 'Tribunals',
            description: 'Specialised bodies established by Acts of Parliament to hear and determine disputes in specific areas.',
            jurisdiction: 'As defined by the specific Act of Parliament establishing the tribunal.',
            url: 'https://new.kenyalaw.org/judgments/court-class/tribunals/',
            children: [
                {
                    name: 'Civil and Human Rights Tribunals',
                    description: 'Tribunals dealing with civil matters and human rights issues, including the HIV and AIDS Tribunal, Political Parties Disputes Tribunal, and Sports Disputes Tribunal.',
                    url: 'https://new.kenyalaw.org/judgments/court-class/civil-and-human-rights-tribunals/'
                },
                {
                    name: 'Commercial Tribunals',
                    description: 'Tribunals handling commercial and business disputes, including the Competition Tribunal, Cooperative Tribunal, and Standards Tribunal.',
                    url: 'https://new.kenyalaw.org/judgments/court-class/commercial-tribunals/'
                },
                {
                    name: 'Environment and Land Tribunals',
                    description: 'Tribunals focused on environmental and land disputes, including the National Environment Tribunal and Rent Restriction Tribunals.',
                    url: 'https://new.kenyalaw.org/judgments/court-class/environment-and-land-tribunals/'
                },
                {
                    name: 'Intellectual Property Tribunals',
                    description: 'Tribunals resolving disputes related to intellectual property rights, including the Industrial Property Tribunal.',
                    url: 'https://new.kenyalaw.org/judgments/court-class/intellectual-property-tribunals/'
                }
            ]
        },
        {
            name: 'Regional and International Courts',
            description: 'Judicial bodies with jurisdiction extending beyond Kenya, often established by treaties to which Kenya is a signatory.',
            children: [
                {
                    name: 'East African Court of Justice (EACJ)',
                    description: 'The judicial organ of the East African Community, ensuring adherence to the Treaty for the Establishment of the EAC.',
                    url: 'https://www.eacj.org/',
                },
                {
                    name: 'African Court on Human and Peoples\' Rights',
                    description: 'A continental court established to ensure the protection of human and peoples\' rights in Africa.',
                    url: 'https://www.african-court.org/',
                },
                {
                    name: 'COMESA Court of Justice',
                    description: 'The judicial organ of the Common Market for Eastern and Southern Africa.',
                    url: 'https://comesacourt.org/',
                }
            ]
        }
    ]
};
