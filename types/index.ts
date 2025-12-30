
import React from 'react';

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

export type AppView = 
  | 'home' 
  | 'kenya-laws' 
  | 'constitution' 
  | 'acts' 
  | 'act-detail'
  | 'county-laws'
  | 'historical-documents'
  | 'governance'
  | 'legislature' 
  | 'judiciary' 
  | 'cabinet' 
  | 'state-corporations' 
  | 'county-governments' 
  | 'projects' 
  | 'national-policy'
  | 'projects-tools'
  | 'eib-projects'
  | 'leadership'
  | 'county-rankings'
  | 'elected-leaders'
  | 'resources' 
  | 'about' 
  | 'contact' 
  | 'anthems'
  | 'kenyan-anthem' 
  | 'east-african-anthem' 
  | 'national-flag' 
  | 'coat-of-arms' 
  | 'chat' 
  | 'viewcount'
  | 'county-explorer'
  | 'infomap'
  | 'my-representatives'
  | 'same-lat-long'
  | 'projects-proposals';

export type Theme = 'light' | 'dark' | 'system';

export interface AppRoute {
    view: AppView;
    title: { en: string; sw: string };
    description?: { en: string; sw: string };
    icon: React.FC<{ className?: string }>;
    backgroundImage: string;
    inSidebar: boolean;
    inHomeGrid: boolean;
    category?: string;
}

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
  constituency?: string;
}

export interface PrincipalSecretary {
  title: string;
  department: string;
  name?: string;
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
  head?: string;
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
  countySearchTerm?: string;
}

export interface EIBProject {
    title: string;
    sector: string;
    status: string;
    amount: string;
    description?: string;
    url: string;
    year: string;
}

export interface PolicyDocument {
  title: string;
  url: string;
}

export interface CountyFeature {
  type: "Feature";
  properties: {
    county_name: string;
    county_code: number;
    area_sq_km: string;
    population: number;
    capital: string;
    sub_counties: string[];
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface SymbolData {
    title: string;
    svgContent?: string;
    imageUrl?: string;
    description: string;
    fileName: string;
}
