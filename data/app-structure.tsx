
import React from 'react';
import { 
    BookOpenIcon, HomeIcon, LinkIcon, UsersIcon, MapIcon, 
    PresentationChartLineIcon, BuildingLibraryIcon, ScaleIcon, FlagIcon, 
    PhotoIcon, InboxStackIcon, UserGroupIcon, MapPinIcon
} from '../components/icons';
import type { AppRoute, AppView } from '../types/index';

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
        title: { en: 'Development', sw: 'Maendeleo' },
        icon: PresentationChartLineIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'kenya-laws',
        title: { en: 'Laws', sw: 'Sheria' },
        icon: BookOpenIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'governance',
        title: { en: 'Governance', sw: 'Utawala' },
        icon: BuildingLibraryIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1596422846543-75c6a1966c22?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'projects-tools',
        title: { en: 'Projects & Tools', sw: 'Miradi na Zana' },
        icon: MapIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'resources',
        title: { en: 'Data Sources', sw: 'Vyanzo vya Data' },
        icon: LinkIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1507842217159-a28f2680d7d3?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    },
    {
        view: 'about',
        title: { en: 'About Us', sw: 'Kutuhusu' },
        icon: UsersIcon,
        backgroundImage: 'https://images.unsplash.com/photo-1521669602905-e85a6177c2a1?q=80&w=1920&auto=format&fit=crop',
        inSidebar: true,
        inHomeGrid: true
    }
];

export const getRoute = (view: AppView) => appStructure.find(r => r.view === view) || appStructure[0];
export const getBackgroundImage = (view: AppView) => getRoute(view).backgroundImage;
