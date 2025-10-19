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