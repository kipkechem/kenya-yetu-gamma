
import React, { lazy } from 'react';
import type { AppView } from '../types';

// Lazy load components
const HomePage = lazy(() => import('../pages/HomePage'));
const KenyaLawsPage = lazy(() => import('../pages/KenyaLawsPage'));
const GovernancePage = lazy(() => import('../pages/GovernancePage'));
const ConstitutionExplorer = lazy(() => import('../pages/ConstitutionExplorer'));
const ProjectsProposalsPage = lazy(() => import('../pages/ProjectsProposalsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ResourcesPage = lazy(() => import('../pages/ResourcesPage'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const ActsPage = lazy(() => import('../pages/ActsPage'));
const ActDetailPage = lazy(() => import('../pages/ActDetailPage'));
const CabinetPage = lazy(() => import('../pages/CabinetPage'));
const StateCorporationsPage = lazy(() => import('../pages/StateCorporationsPage'));
const CountyGovernmentsPage = lazy(() => import('../pages/CountyGovernmentsPage'));
const AnthemPage = lazy(() => import('../pages/AnthemPage'));
const AnthemsListPage = lazy(() => import('../pages/AnthemsListPage'));
const SymbolPage = lazy(() => import('../pages/SymbolPage'));
const CountyLawsPage = lazy(() => import('../pages/CountyLawsPage'));
const HistoricalDocumentsPage = lazy(() => import('../pages/HistoricalDocumentsPage'));
const LegislaturePage = lazy(() => import('../pages/LegislaturePage'));
const JudiciaryPage = lazy(() => import('../pages/JudiciaryPage'));
const NationalPolicyPage = lazy(() => import('../pages/NationalPolicyPage'));
const SameLatLongPage = lazy(() => import('../pages/SameLatLongPage'));
const ViewCountPage = lazy(() => import('../pages/ViewCountPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const EIBProjectsPage = lazy(() => import('../pages/EIBProjectsPage'));
const CountyExplorerPage = lazy(() => import('../pages/CountyExplorerPage'));
const LeadershipPage = lazy(() => import('../pages/LeadershipPage'));

interface RouteConfig {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  parent?: AppView;
  props?: Record<string, any>;
}

export const routes: Partial<Record<AppView, RouteConfig>> = {
  'home': { component: HomePage },
  'kenya-laws': { component: KenyaLawsPage },
  'governance': { component: GovernancePage },
  'constitution': { component: ConstitutionExplorer, parent: 'kenya-laws' },
  'acts': { component: ActsPage, parent: 'kenya-laws' },
  'act-detail': { component: ActDetailPage, parent: 'acts' },
  'county-laws': { component: CountyLawsPage, parent: 'kenya-laws' },
  'historical-documents': { component: HistoricalDocumentsPage, parent: 'kenya-laws' },
  'legislature': { component: LegislaturePage, parent: 'governance' },
  'judiciary': { component: JudiciaryPage, parent: 'governance' },
  'cabinet': { component: CabinetPage, parent: 'governance' },
  'state-corporations': { component: StateCorporationsPage, parent: 'governance' },
  'projects-proposals': { component: ProjectsProposalsPage },
  'county-governments': { component: CountyGovernmentsPage, parent: 'governance' },
  'national-policy': { component: NationalPolicyPage, parent: 'projects' },
  'eib-projects': { component: EIBProjectsPage, parent: 'projects-proposals' },
  'projects': { component: ProjectsPage },
  'leadership': { component: LeadershipPage, parent: 'projects-proposals' },
  'resources': { component: ResourcesPage },
  'about': { component: AboutUsPage },
  'contact': { component: ContactPage },
  'kenyan-anthem': { component: AnthemPage, parent: 'anthems', props: { anthemId: 'kenyan' } },
  'east-african-anthem': { component: AnthemPage, parent: 'anthems', props: { anthemId: 'east-african' } },
  'anthems': { component: AnthemsListPage, parent: 'kenya-laws' },
  'national-flag': { component: SymbolPage, parent: 'kenya-laws', props: { symbolId: 'national-flag' } },
  'coat-of-arms': { component: SymbolPage, parent: 'kenya-laws', props: { symbolId: 'coat-of-arms' } },
  'same-lat-long': { component: SameLatLongPage },
  'viewcount': { component: ViewCountPage },
  'chat': { component: ChatPage, parent: 'home' },
  'county-explorer': { component: CountyExplorerPage, parent: 'projects-proposals' },
  'infomap': { component: ProjectsProposalsPage } // Legacy mapping
};

export const getRoute = (view: AppView): RouteConfig => {
    return routes[view] || routes['home']!;
};
