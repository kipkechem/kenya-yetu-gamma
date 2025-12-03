

import type { AppView } from '../../types';

export interface LegislatureMember {
    title: string;
    name?: string;
}

export interface CommitteeInfo {
    category: string;
    list: string[];
}

export interface LegislatureBody {
    name: string;
    description: string;
    leadership: LegislatureMember[];
    membership?: { category: string; count: string; }[];
    committees?: CommitteeInfo[];
    children?: LegislatureBody[];
}

export const legislatureData: LegislatureBody = {
    name: 'The Parliament of Kenya',
    description: 'The bicameral legislature of the Republic of Kenya, consisting of the National Assembly and the Senate.',
    leadership: [
        { title: 'Speaker of the National Assembly' },
        { title: 'Speaker of the Senate' },
    ],
    committees: [
        {
            category: 'Joint Committees',
            list: [
                'Joint Committee on National Cohesion and Equal Opportunity',
                'Joint Committee on Parliamentary Broadcasting and Library',
            ]
        }
    ],
    children: [
        {
            name: 'The National Assembly',
            description: 'Represents the people of the constituencies and special interests. Enacts legislation, determines revenue allocation, appropriates funds, and oversees the national executive.',
            leadership: [
                { title: 'The Speaker' },
                { title: 'The Deputy Speaker' },
                { title: 'Leader of the Majority Party' },
                { title: 'Leader of the Minority Party' },
                { title: 'The Clerk of the National Assembly' }
            ],
            membership: [
                { category: 'Constituency Representatives', count: '290' },
                { category: 'County Women Representatives', count: '47' },
                { category: 'Nominated Members', count: '12' },
            ],
            committees: [
                {
                    category: 'Standing Committees',
                    list: [
                        'Budget and Appropriations Committee',
                        'Justice and Legal Affairs Committee',
                        'Defence, Intelligence and Foreign Relations Committee',
                        'Health Committee',
                        'Education and Research Committee',
                        'Finance and National Planning Committee',
                    ]
                }
            ]
        },
        {
            name: 'The Senate',
            description: 'Represents the counties and serves to protect the interests of the counties and their governments. Participates in law-making concerning counties and oversees revenue allocation.',
            leadership: [
                { title: 'The Speaker' },
                { title: 'The Deputy Speaker' },
                { title: 'The Clerk of the Senate' }
            ],
            membership: [
                { category: 'Elected County Senators', count: '47' },
                { category: 'Nominated Women Members', count: '16' },
                { category: 'Youth Representatives', count: '2 (one man, one woman)' },
                { category: 'PWD Representatives', count: '2 (one man, one woman)' },
            ],
            committees: [
                {
                    category: 'Standing Committees',
                    list: [
                        'County Public Accounts Committee',
                        'County Public Investments and Special Funds Committee',
                        'Finance and Budget Committee',
                        'Health Committee',
                        'National Security, Defence and Foreign Relations Committee',
                        'Justice, Legal Affairs and Human Rights Committee',
                    ]
                }
            ]
        }
    ]
};
