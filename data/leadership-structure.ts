
import { representativesData } from './governance/representatives';
import { wardRepresentatives } from './governance/ward-representatives';

export interface GeoNode {
    name: string;
    children?: GeoNode[];
}

export interface LeaderProfile {
    role: string;
    name: string;
    party: string;
    description: string;
    imageUrl?: string;
}

// Hierarchical data generation from real county data and wards
export const getLeadershipHierarchy = (counties: {name: string, constituencies: string[]}[]): GeoNode[] => {
    const safeWardReps = Array.isArray(wardRepresentatives) ? wardRepresentatives : [];
    
    if (!Array.isArray(counties)) return [];

    return counties.map(county => {
        if (!county || !county.name) return { name: 'Unknown', children: [] };

        // Normalize county name for matching (e.g. "Nairobi City" vs "Nairobi" in data)
        const normalizedCountyName = county.name.replace(' City', '');
        
        // Get all representatives for this county
        const countyReps = safeWardReps.filter(r => 
            r && (r.county === county.name || r.county === normalizedCountyName)
        );

        return {
            name: county.name,
            children: (county.constituencies || []).map(constituency => {
                if (!constituency) return { name: 'Unknown', children: [] };
                
                // Find unique wards for this constituency from the reps data
                const constituencyWards = countyReps
                    .filter(r => r.constituency && r.constituency.toLowerCase() === constituency.toLowerCase())
                    .map(r => r.ward);
                
                // Deduplicate and sort
                const uniqueWards = Array.from(new Set(constituencyWards)).filter(Boolean).sort();

                return {
                    name: constituency,
                    children: uniqueWards.map(ward => ({
                        name: ward,
                        children: []
                    }))
                };
            })
        };
    });
};

export const getLeadersForLocation = (
    year: string,
    county: string,
    subCounty: string,
    constituency: string,
    ward: string
): LeaderProfile[] => {
    const results: LeaderProfile[] = [];
    const safeReps = Array.isArray(representativesData) ? representativesData : [];
    const safeWardReps = Array.isArray(wardRepresentatives) ? wardRepresentatives : [];

    // 1. National Leaders
    // Show national leaders only if no county is selected (Global view)
    if (!county) {
         const national = safeReps.filter(r => !r.county);
         national.forEach(r => results.push({
             role: r.position,
             name: r.name,
             party: r.party,
             description: `National Official`,
             imageUrl: r.imageUrl
         }));
    }

    // 2. County Leaders
    if (county) {
        // Filter by specific county name
        const normalizedCounty = county.replace(' City', '');
        const countyLeaders = safeReps.filter(r => 
            (r.county === county || r.county === normalizedCounty) && !r.constituency
        ); 
        
        countyLeaders.forEach(r => {
            results.push({
                role: r.position,
                name: r.name,
                party: r.party,
                description: `${r.position} of ${county} County`,
                imageUrl: r.imageUrl
            });
        });
    }

    // 3. Constituency Leaders (MP)
    if (constituency) {
        const normalizedCounty = county.replace(' City', '');
        const mp = safeReps.find(r => 
            (r.county === county || r.county === normalizedCounty) && 
            r.constituency && r.constituency.toLowerCase() === constituency.toLowerCase()
        );

        if (mp) {
            results.push({
                role: 'Member of Parliament (MP)',
                name: mp.name,
                party: mp.party,
                description: `Member of Parliament for ${constituency} Constituency.`,
                imageUrl: mp.imageUrl
            });
        }
    }

    // 4. Ward Leaders (MCA)
    if (ward) {
        // Find specific MCA from the imported list
        const normalizedCounty = county.replace(' City', '');
        
        const mca = safeWardReps.find(
            w => w && w.ward && w.ward.toLowerCase() === ward.toLowerCase() && 
            (w.county === county || w.county === normalizedCounty) &&
            w.constituency && w.constituency.toLowerCase() === constituency.toLowerCase()
        );

        if (mca) {
            results.push({
                role: 'Member of County Assembly (MCA)',
                name: mca.name,
                party: mca.party,
                description: `Elected representative for ${ward} Ward in the ${county} County Assembly.`,
                imageUrl: 'https://placehold.co/400x400/e2e8f0/1e293b?text=MCA'
            });
        } else {
             // Fallback if data is missing for specific ward but structure exists
             results.push({
                role: 'Member of County Assembly (MCA)',
                name: `Representative for ${ward}`,
                party: 'Various',
                description: `Elected representative for ${ward} Ward in the ${county} County Assembly.`,
                imageUrl: 'https://placehold.co/400x400/e2e8f0/1e293b?text=MCA'
            });
        }
    }

    return results;
};

export const availableYears = [
    "2022 - 2027"
];
