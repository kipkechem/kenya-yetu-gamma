// This file is available for type definitions.

export type SelectedItem = {
  type: 'preamble' | 'chapter' | 'schedule';
  id: string | number;
  article?: string;
  part?: number;
};

export interface Article {
  number: string;
  title: string;
  content: string;
}

export interface Part {
  title: string;
  articles: Article[];
}

export interface Chapter {
  id: number;
  title: string;
  parts: Part[];
}

export interface Schedule {
  id: string;
  title: string;
  content: string;
}

export interface ConstitutionData {
  preamble: {
    title: string;
    content: string;
  };
  chapters: Chapter[];
  schedules: Schedule[];
}

export type AppView = 'home' | 'kenya-laws' | 'constitution' | 'acts' | 'cabinet' | 'commissions' | 'state-corporations' | 'infomap' | 'county-explorer' | 'my-representatives' | 'projects' | 'resources' | 'about' | 'contact';

export type Theme = 'light' | 'dark' | 'system';

export interface County {
  name: string;
  code: number;
  capital: string;
  governor: string;
  population: string;
  area: string;
  constituencies: string[];
  funFacts: string[];
}

export interface Representative {
  name: string;
  position: string;
  party: string;
  imageUrl: string;
  county?: string;
}

export interface PrincipalSecretary {
  title: string;
  department: string;
}

export interface Ministry {
  name: string;
  cabinetSecretary: string;
  principalSecretaries: PrincipalSecretary[];
  mandatedEntities?: string[];
  url?: string;
}


export interface Commission {
  name: string;
  description: string;
  url: string;
}

export interface StateCorporation {
  name: string;
  description: string;
  url: string;
}

export interface StateCorporationCategory {
  categoryName: string;
  corporations: StateCorporation[];
}