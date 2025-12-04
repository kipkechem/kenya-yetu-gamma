
import React from 'react';
import { 
    BookOpenIcon, HomeIcon, LinkIcon, UsersIcon, MailIcon, MapIcon, 
    PresentationChartLineIcon, BuildingLibraryIcon, ScaleIcon, FlagIcon, 
    PhotoIcon, InboxStackIcon, UserGroupIcon, MapPinIcon, FileTextIcon
} from '../components/icons';
import type { AppRoute, AppView } from '../types';

export const appStructure: AppRoute[] = [
    {
        view: 'home',
        title: { en: 'Home', sw: 'Nyumbani' },
        icon: HomeIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1489396160836-2c99c977e9a0?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: false
    },
    {
        view: 'projects',
        title: { en: 'Development Strategy', sw: 'Mkakati wa Maendeleo' },
        description: { 
            en: 'Track policy development, projects, performance, and delivery management.',
            sw: 'Fuatilia maendeleo ya sera, miradi, utendaji, na usimamizi wa utoaji huduma.'
        },
        icon: PresentationChartLineIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'kenya-laws',
        title: { en: 'Laws & Governance', sw: 'Sheria na Utawala' },
        description: { 
            en: 'Explore the Constitution of Kenya and various Acts of Parliament.',
            sw: 'Chunguza Katiba ya Kenya na Sheria mbalimbali za Bunge.'
        },
        icon: BookOpenIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'infomap',
        title: { en: 'Projects & Proposals', sw: 'Miradi na Mapendekezo' },
        description: { 
            en: 'KenyaYetu synthesized projects and proposals.',
            sw: 'Miradi na mapendekezo yaliyoundwa na KenyaYetu.'
        },
        icon: MapIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'resources',
        title: { en: 'Data Sources', sw: 'Vyanzo vya Data' },
        description: { 
            en: 'Access helpful data sources, external links, and other materials.',
            sw: 'Pata vyanzo muhimu vya data, viungo vya nje, na nyenzo nyingine.'
        },
        icon: LinkIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1507842217159-a28f2680d7d3?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'about',
        title: { en: 'About & Contact', sw: 'Kutuhusu na Mawasiliano' },
        description: { 
            en: 'Learn about our mission and get in touch with us.',
            sw: 'Jifunze kuhusu dhamira yetu na uwasiliane nasi.'
        },
        icon: UsersIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1521669602905-e85a6177c2a1?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'contact',
        title: { en: 'Contact', sw: 'Wasiliana Nasi' },
        description: { 
            en: 'Get in touch with us for inquiries or feedback.',
            sw: 'Wasiliana nasi kwa maswali au maoni.'
        },
        icon: MailIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
    // Sub-pages
    {
        view: 'constitution',
        title: { en: 'The Constitution', sw: 'Katiba' },
        icon: BookOpenIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1623943443369-750b9064c4b6?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'laws'
    },
    {
        view: 'acts',
        title: { en: 'Acts of Parliament', sw: 'Sheria za Bunge' },
        icon: InboxStackIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'laws'
    },
    {
        view: 'county-laws',
        title: { en: 'County Laws', sw: 'Sheria za Kaunti' },
        icon: BuildingLibraryIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'laws'
    },
    {
        view: 'historical-documents',
        title: { en: 'Historical Documents', sw: 'Nyaraka za Kihistoria' },
        icon: BookOpenIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'laws'
    },
    {
        view: 'legislature',
        title: { en: 'Legislature', sw: 'Bunge' },
        icon: BuildingLibraryIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1575540325855-4b5d285a3845?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'governance'
    },
    {
        view: 'judiciary',
        title: { en: 'Judiciary', sw: 'Mahakama' },
        icon: ScaleIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'governance'
    },
    {
        view: 'cabinet',
        title: { en: 'Cabinet', sw: 'Baraza la Mawaziri' },
        icon: UserGroupIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1596422846543-75c6a1966c22?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'governance'
    },
    {
        view: 'state-corporations',
        title: { en: 'State Corporations', sw: 'Mashirika ya Umma' },
        icon: BuildingLibraryIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'governance'
    },
    {
        view: 'county-governments',
        title: { en: 'County Governments', sw: 'Serikali za Kaunti' },
        icon: MapPinIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1543796755-74b13794920d?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'governance'
    },
    {
        view: 'anthems',
        title: { en: 'Anthems', sw: 'Nyimbo za Taifa' },
        icon: FlagIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1519429778229-0430c372678d?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'culture'
    },
    {
        view: 'national-flag',
        title: { en: 'National Flag', sw: 'Bendera ya Taifa' },
        icon: PhotoIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'culture'
    },
    {
        view: 'coat-of-arms',
        title: { en: 'Coat of Arms', sw: 'Nembo ya Taifa' },
        icon: PhotoIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false,
        category: 'culture'
    },
    {
        view: 'national-policy',
        title: { en: 'National Policy', sw: 'Sera ya Taifa' },
        icon: PresentationChartLineIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
    {
        view: 'kenyan-anthem',
        title: { en: 'Kenyan Anthem', sw: 'Wimbo wa Kenya' },
        icon: FlagIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
    {
        view: 'east-african-anthem',
        title: { en: 'EAC Anthem', sw: 'Wimbo wa EAC' },
        icon: FlagIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
     {
        view: 'chat',
        title: { en: 'Assistant', sw: 'Msaidizi' },
        icon: InboxStackIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
    {
        view: 'county-explorer',
        title: { en: 'County Explorer', sw: 'Mchunguzi wa Kaunti' },
        icon: MapPinIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1543796755-74b13794920d?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    },
    {
        view: 'same-lat-long',
        title: { en: 'Global Neighbors', sw: 'Majirani wa Dunia' },
        icon: MapIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920&auto=format&fit=crop',
        inSidebar: false,
        inHomeGrid: false
    }
];

export const getRoute = (view: AppView) => appStructure.find(r => r.view === view) || appStructure[0];

export const getBackgroundImage = (view: AppView) => getRoute(view).backgroundImage;
