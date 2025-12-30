
export const kenyaFlagDescription = `The flag of Kenya is a tricolour of black, red, and green with two white fimbriations, and a Maasai shield and two crossed spears in the centre. The colours symbolise black for the people of Kenya, red for the blood shed during the struggle for independence, green for the country's landscape and natural wealth, and white for peace and honesty. The shield and spears symbolise the defence of freedom.`;

export const kenyaCoatOfArmsDescription = `The Coat of Arms of Kenya features two lions, a symbol of protection, holding spears and a traditional Maasai shield. The shield and spears symbolise unity and defence of freedom. The shield contains the national colours. In the centre of the shield is a rooster holding an axe, which symbolises a new and prosperous life. The shield and lions stand on a silhouette of Mount Kenya containing in the foreground examples of Kenya's agricultural produce. The scroll supporting the lions has the national motto, 'Harambee', which means 'pulling together'.`;

import type { SymbolData } from '../../types/index';

export const symbolsData: Record<string, SymbolData> = {
    'national-flag': {
        title: "The National Flag",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
        description: kenyaFlagDescription,
        fileName: "kenya-national-flag.svg"
    },
    'coat-of-arms': {
        title: "The Coat of Arms",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Coat_of_arms_of_Kenya_%28Official%29.svg",
        description: kenyaCoatOfArmsDescription,
        fileName: "kenya-coat-of-arms.svg"
    }
};
