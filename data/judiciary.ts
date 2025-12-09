export interface JudicialBody {
    name: string;
    description: string;
    leadership?: { title: string; name?: string; }[];
    composition?: string[];
    jurisdiction?: string;
    url?: string;
    children?: JudicialBody[];
}

export const judiciaryData: JudicialBody = {
    name: 'The Judiciary of Kenya',
    description: 'Vested with judicial authority derived from the people, it administers justice in accordance with the Constitution and the law.',
    leadership: [{ title: 'The Chief Justice & President of the Supreme Court' }],
    url: 'https://www.judiciary.go.ke/',
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
                    url: 'https://new.kenyalaw.org/judgments/KESC/',
                },
                {
                    name: 'The Court of Appeal',
                    description: 'Hears appeals from the High Court and other tribunals.',
                    leadership: [{ title: 'President of the Court of Appeal' }],
                    composition: ['Not fewer than 12 Judges'],
                    jurisdiction: 'Appellate jurisdiction over the High Court and other courts/tribunals as prescribed by law.',
                    url: 'https://new.kenyalaw.org/judgments/KECA/',
                },
                {
                    name: 'The High Court',
                    description: 'Has unlimited original jurisdiction in criminal and civil matters.',
                    leadership: [{ title: 'Principal Judge' }],
                    composition: ['Number of judges prescribed by Parliament'],
                    jurisdiction: 'Unlimited original jurisdiction, supervisory jurisdiction over subordinate courts, and interpretation of the Constitution.',
                    url: 'https://new.kenyalaw.org/judgments/KEHC/',
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
                },
                {
                    name: 'Industrial Court',
                    description: 'Has the status of the High Court and deals with disputes relating to the Industries',
                    leadership: [{ title: 'Presiding Judge' }],
                    jurisdiction: 'Disputes relating to industries and commerce.',
                    url: 'https://new.kenyalaw.org/judgments/KEIC/',
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
                    name: 'Courts Martial',
                    description: 'Deal with matters concerning members of the Kenya Defence Forces.',
                    jurisdiction: 'Tries offences under the Kenya Defence Forces Act.',
                    url: 'https://www.judiciary.go.ke/courts/courts-martial/',
                }
            ]
        }
    ]
};