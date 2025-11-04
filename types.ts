

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
  id: string; // Using string for ids like 'first-schedule'
  title: string;
  content: string;
}

export interface ConstitutionData {
  preamble: { title: string; content: string };
  chapters: Chapter[];
  schedules: Schedule[];
}

export type SelectedItem = 
  | { type: 'preamble'; id: 'preamble' }
  | { type: 'chapter'; id: number; article?: string }
  | { type: 'schedule'; id: string };

// FIX: Add Representative, County, and AppView types to be used across the application.
export interface Representative {
  name: string;
  position: string;
  party: string;
  imageUrl: string;
  county?: string;
}

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

export interface CabinetMember {
  name: string;
  title: string;
  imageUrl: string;
}

export interface Commission {
  name: string;
  description: string;
  url: string;
}

export type AppView =
  | 'home'
  | 'kenya-laws'
  | 'constitution'
  | 'acts'
  | 'cabinet'
  | 'commissions'
  | 'infomap'
  | 'my-representatives'
  | 'county-explorer'
  | 'projects'
  | 'resources'
  | 'about'
  | 'contact';