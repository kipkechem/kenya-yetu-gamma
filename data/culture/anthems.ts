
import type { Anthem } from '../../types';

export const kenyanAnthem: Anthem = {
  id: 'kenyan',
  englishTitle: 'Kenyan National Anthem',
  swahiliTitle: 'Wimbo wa Taifa wa Kenya',
  lyrics: [
    {
      type: 'stanza',
      number: 1,
      swahili: 'Ee Mungu nguvu yetu,\nIlete baraka kwetu.\nHaki iwe ngao na mlinzi,\nNatukae na undugu,\nAmani na uhuru,\nRaha tupate na ustawi.',
      english: 'O God of all creation,\nBless this our land and nation.\nJustice be our shield and defender,\nMay we dwell in unity,\nPeace and liberty,\nPlenty be found within our borders.'
    },
    {
      type: 'stanza',
      number: 2,
      swahili: 'Amkeni ndugu zetu,\nTufanye sote bidii,\nNasi tujitoe kwa nguvu,\nNchi yetu ya Kenya,\nTunayoipenda,\nTuwe tayari kuilinda.',
      english: 'Let one and all arise,\nWith hearts both strong and true.\nService be our earnest endeavour,\nAnd our Homeland of Kenya,\nHeritage of splendour,\nFirm may we stand to defend.'
    },
    {
      type: 'stanza',
      number: 3,
      swahili: 'Natujenge taifa letu,\nEe, ndio wajibu wetu,\nKenya istahili heshima,\nTuungane mikono,\nPamoja kazini,\nKila siku tuwe na shukrani.',
      english: 'Let all with one accord,\nIn common bond united,\nBuild this our nation together,\nAnd the glory of Kenya,\nThe fruit of our labour,\nFill every heart with thanksgiving.'
    }
  ]
};

export const eastAfricanAnthem: Anthem = {
  id: 'east-african',
  englishTitle: 'East African Community Anthem',
  swahiliTitle: 'Wimbo wa Jumuiya ya Afrika Mashariki',
  lyrics: [
    {
      type: 'stanza',
      number: 1,
      swahili: 'Ee Mungu twaomba ulinde\nJumuiya yetu ya Afrika Mashariki\nTuwezeshe kuishi kwa amani\nTujenge umoja wetu',
      english: 'O God, we pray you to protect\nOur East African Community\nEnable us to live in peace\nLet\'s build our unity'
    },
    {
      type: 'chorus',
      swahili: 'Jumuiya Yetu sote tuilinde\nTuwajibike tuimarike\nUmoja wetu ni nguzo yetu\nIdumu Jumuiya yetu.',
      english: 'Our Community, let\'s all protect it\nLet\'s be responsible, let\'s become strong\nOur unity is our pillar\nLong live our Community.'
    },
    {
      type: 'stanza',
      number: 2,
      swahili: 'Wajibu wetu ni kulinda\nAmani na ustawi wetu\nTufanye kazi kwa bidii\nTujenge Jumuiya bora.',
      english: 'Our duty is to protect\nOur peace and prosperity\nLet\'s work with diligence\nLet\'s build a better Community.'
    },
    {
      type: 'chorus',
      swahili: 'Jumuiya Yetu sote tuilinde\nTuwajibike tuimarike\nUmoja wetu ni nguzo yetu\nIdumu Jumuiya yetu.',
      english: 'Our Community, let\'s all protect it\nLet\'s be responsible, let\'s become strong\nOur unity is our pillar\nLong live our Community.'
    },
    {
      type: 'stanza',
      number: 3,
      swahili: 'Tuwajibike, tuwajibike\nKujenga Jumuiya yetu\nTuwajibike, tuwajibike\nKujenga Jumuiya imara.',
      english: 'Let\'s be responsible, let\'s be responsible\nTo build our Community\nLet\'s be responsible, let\'s be responsible\nTo build a strong Community.'
    },
    {
      type: 'chorus',
      swahili: 'Jumuiya Yetu sote tuilinde\nTuwajibike tuimarike\nUmoja wetu ni nguzo yetu\nIdumu Jumuiya yetu.',
      english: 'Our Community, let\'s all protect it\nLet\'s be responsible, let\'s become strong\nOur unity is our pillar\nLong live our Community.'
    },
  ]
};

export const anthems = {
    'kenyan': kenyanAnthem,
    'east-african': eastAfricanAnthem
};
