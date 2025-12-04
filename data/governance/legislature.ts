
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
    powers?: string[];
    children?: LegislatureBody[];
}

export const legislatureData: LegislatureBody = {
    name: 'The Parliament of Kenya',
    description: 'The bicameral legislature of the Republic of Kenya, consisting of the National Assembly and the Senate.',
    leadership: [
        { title: 'Speaker of the National Assembly' },
        { title: 'Speaker of the Senate' },
    ],
    powers: [
        'Exercise legislative authority derived from the people',
        'Manifest the diversity of the nation and represent the will of the people',
        'Consider and pass amendments to the Constitution',
        'Alter county boundaries as provided in the Constitution',
        'Protect the Constitution and promote democratic governance'
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
            powers: [
                'Determine allocation of national revenue between levels of government',
                'Appropriate funds for expenditure by the national government',
                'Exercise oversight over national revenue and its expenditure',
                'Review the conduct in office of the President, Deputy President and other State officers',
                'Initiate the process of removing State officers from office',
                'Approve declarations of war and extensions of states of emergency',
                'Check the conduct of the Executive and other State organs'
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
            powers: [
                'Represent and protect the interests of the counties and their governments',
                'Participate in the law-making function of Parliament by considering Bills concerning counties',
                'Determine the allocation of national revenue among counties',
                'Exercise oversight over national revenue allocated to the county governments',
                'Consider and determine any resolution to remove the President or Deputy President from office'
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
