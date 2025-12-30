import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
    const baseClass = "animate-pulse bg-gray-200 dark:bg-gray-800";
    const variantClass = 
        variant === 'circle' ? 'rounded-full' : 
        variant === 'text' ? 'rounded h-4 w-full' : 
        'rounded-2xl';

    return <div className={`${baseClass} ${variantClass} ${className}`} />;
};

export default Skeleton;

export const ConstitutionSkeleton = () => (
    <div className="space-y-8">
        <div className="flex gap-2 mb-6">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-2/3 mb-4" />
        <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
);

export const HierarchySkeleton = () => (
    <div className="flex flex-col items-center space-y-8 py-10">
        <Skeleton className="h-32 w-64 rounded-3xl" />
        <div className="h-12 w-0.5 bg-gray-200 dark:bg-gray-800" />
        <div className="flex gap-8">
            <Skeleton className="h-24 w-48" />
            <Skeleton className="h-24 w-48" />
            <Skeleton className="h-24 w-48" />
        </div>
    </div>
);

export const GridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-48 w-full" />
        ))}
    </div>
);
