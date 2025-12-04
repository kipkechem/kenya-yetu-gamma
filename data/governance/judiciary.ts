
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
    name: 'The Judiciary of Kenya',
    description: 'Vested with judicial authority derived from the people, it administers justice in accordance with the Constitution and the law.',
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
            description: 'Consists of the Supreme Court, the Court of Appeal, the High Court, and courts with the status of the High Court.',
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
                    url: 'https://www.judiciary.go.ke/courts/supreme-court/',
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
                    url: 'https://www.judiciary.go.ke/courts/court-of-appeal/',
                },
                {
                    name: 'The High Court',
                    description: 'Has unlimited original jurisdiction in criminal and civil matters.',
                    leadership: [{ title: 'Principal Judge' }],
                    composition: ['Number of judges prescribed by Parliament'],
                    jurisdiction: 'Unlimited original jurisdiction, supervisory jurisdiction over subordinate courts, and interpretation of the Constitution.',
                    powers: [
                        'Determine whether a right or fundamental freedom in the Bill of Rights has been denied, violated, infringed or threatened',
                        'Hear any question respecting the interpretation of the Constitution',
                        'Supervisory jurisdiction over subordinate courts and any person, body or authority exercising a judicial or quasi-judicial function',
                        'Hear appeals from a decision of a tribunal appointed to consider the removal of a person from office'
                    ],
                    url: 'https://www.judiciary.go.ke/courts/high-court/',
                },
                {
                    name: 'Employment and Labour Relations Court',
                    description: 'Has the status of the High Court and deals with employment and labour relations disputes.',
                    leadership: [{ title: 'Principal Judge' }],
                    jurisdiction: 'Exclusive original and appellate jurisdiction to hear and determine all disputes referred to it in accordance with Article 162(2) of the Constitution.',
                    url: 'https://www.judiciary.go.ke/courts/employment-and-labour-relations-court/',
                },
                {
                    name: 'Environment and Land Court',
                    description: 'Has the status of the High Court and deals with disputes relating to the environment and land.',
                    leadership: [{ title: 'Presiding Judge' }],
                    jurisdiction: 'Disputes relating to environmental planning, land use, titles, boundaries, rates, and resource management.',
                    url: 'https://www.judiciary.go.ke/courts/environment-and-land-court/',
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
                    url: 'https://www.judiciary.go.ke/courts/magistrates-court/',
                },
                {
                    name: 'Kadhis\' Courts',
                    description: 'Deal with questions of Muslim law.',
                    jurisdiction: 'Limited to determination of questions of Muslim law relating to personal status, marriage, divorce or inheritance where all parties profess the Muslim religion.',
                    url: 'https://www.judiciary.go.ke/courts/kadhis-court/',
                },
                {
                    name: 'Courts Martial',
                    description: 'Deal with matters concerning members of the Kenya Defence Forces.',
                    jurisdiction: 'Tries offences under the Kenya Defence Forces Act.',
                    url: 'https://www.judiciary.go.ke/courts/courts-martial/',
                },
                {
                    name: 'Tribunals',
                    description: 'Specialised bodies established by Acts of Parliament to hear and determine disputes in specific areas (e.g., tax, rent).',
                    jurisdiction: 'As defined by the specific Act of Parliament establishing the tribunal.',
                    url: 'https://www.judiciary.go.ke/tribunals/',
                }
            ]
        }
    ]
};
