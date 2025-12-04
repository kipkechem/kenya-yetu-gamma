
export interface VisitorData {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    org: string;
    timestamp: string;
}

// This key would normally be stored in a database, but for this client-side demo
// we are storing it in localStorage to simulate persistence for the current user.
const STORAGE_KEY = 'app_analytics_logs';

export const logVisit = async (): Promise<void> => {
    try {
        // Check if we already logged this session to avoid spamming the API
        const sessionKey = `session_${new Date().toDateString()}`;
        if (sessionStorage.getItem(sessionKey)) return;

        let visit: VisitorData = {
            ip: 'Unknown',
            city: 'Unknown',
            region: 'Unknown',
            country_name: 'Unknown',
            org: 'Unknown',
            timestamp: new Date().toISOString()
        };

        try {
            // Fetch IP and Geo Data
            // Using ipapi.co, if it fails (e.g. adblocker, rate limit), we catch and log 'Unknown'
            const response = await fetch('https://ipapi.co/json/');
            
            if (response.ok) {
                const data = await response.json();
                if (!data.error) {
                    visit = {
                        ip: data.ip || 'Unknown',
                        city: data.city || 'Unknown',
                        region: data.region || 'Unknown',
                        country_name: data.country_name || 'Unknown',
                        org: data.org || 'Unknown',
                        timestamp: new Date().toISOString()
                    };
                }
            }
        } catch (fetchError) {
            // Silently fail on network errors (common with adblockers or offline)
            // We proceed to log the visit with 'Unknown' data
        }

        // In a real production app, you would POST this 'visit' object to your backend database here.
        // await fetch('/api/log-visit', { method: 'POST', body: JSON.stringify(visit) });

        // For this demo, we save to localStorage to simulate a database
        const existingLogs = getAnalyticsLogs();
        const newLogs = [visit, ...existingLogs].slice(0, 100); // Keep last 100
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
        
        // Mark session as logged
        sessionStorage.setItem(sessionKey, 'true');
        
    } catch (error) {
        // Catch any storage quota errors or other unexpected issues
        // console.error('Analytics storage error:', error);
    }
};

export const getAnalyticsLogs = (): VisitorData[] => {
    try {
        const logs = localStorage.getItem(STORAGE_KEY);
        return logs ? JSON.parse(logs) : [];
    } catch (e) {
        return [];
    }
};
