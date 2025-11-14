// Fix: Import React to make the 'React' namespace available for types like React.ReactNode.
import React from 'react';

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
  title:string;
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

// FIX: Add 'national-policy' to the AppView type to allow navigation to this view.
export type AppView = 'home' | 'kenya-laws' | 'constitution' | 'acts' | 'cabinet' | 'state-corporations' | 'infomap' | 'county-governments' | 'my-representatives' | 'projects' | 'resources' | 'about' | 'contact' | 'kenyan-anthem' | 'east-african-anthem' | 'national-flag' | 'coat-of-arms' | 'anthems' | 'county-laws' | 'act-detail' | 'chat' | 'historical-documents' | 'legislature' | 'judiciary' | 'county-explorer' | 'national-policy';

export type Theme = 'light' | 'dark' | 'system';

export interface Section {
    title: string;
    description: string;
    icon: React.ReactNode;
    view: AppView;
    isExternal: boolean;
    url?: string;
}

export interface County {
  name: string;
  code: number;
  capital: string;
  website: string;
  departments: string[];
  constituencies: string[];
  // Fix: Add missing properties to the County interface to resolve errors in CountyDetailPage.
  population: string;
  area: string;
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

export interface Anthem {
  id: 'kenyan' | 'east-african';
  englishTitle: string;
  swahiliTitle: string;
  lyrics: {
    type: 'stanza' | 'chorus';
    number?: number;
    swahili: string;
    english: string;
  }[];
}

export interface CountyLaw {
  name: string;
  url: string;
}

export interface CountyLegislation {
  countyName: string;
  acts: CountyLaw[];
  bills: CountyLaw[];
}

export interface NavigationPayload {
  view: AppView;
  actsSearchTerm?: string;
  actTitle?: string;
}