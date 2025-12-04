
import React, { useState, useEffect } from 'react';
import { getAnalyticsLogs, VisitorData } from '../utils/analytics';
import { ShieldCheckIcon, GlobeAmericasIcon, ComputerDesktopIcon } from '../components/icons';

const ViewCountPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [logs, setLogs] = useState<VisitorData[]>([]);
    const [error, setError] = useState('');

    // Hardcoded passcode for the programmer (In reality, this should be server-side auth)
    const SECRET_CODE = 'admin2025'; 

    useEffect(() => {
        if (isAuthenticated) {
            setLogs(getAnalyticsLogs());
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === SECRET_CODE) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Access Denied: Invalid Credentials');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-full flex items-center justify-center bg-gray-900 p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-red-500/10 rounded-full mb-4">
                            <ShieldCheckIcon className="h-10 w-10 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Restricted Access</h1>
                        <p className="text-gray-400 mt-2 text-sm">Enter administrator passcode to view analytics.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-center tracking-widest placeholder-gray-600"
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-red-900/20"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gray-900 text-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ComputerDesktopIcon className="h-8 w-8 text-blue-500" />
                            Traffic Monitor
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm">Real-time growth tracking & geographical distribution</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-green-400">{logs.length}</div>
                        <div className="text-xs uppercase tracking-wider text-gray-500">Total Recorded Visits</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Unique Countries</h3>
                        <p className="text-3xl font-bold text-white">
                            {new Set(logs.map(l => l.country_name)).size}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Unique Cities</h3>
                        <p className="text-3xl font-bold text-white">
                             {new Set(logs.map(l => l.city)).size}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                         <h3 className="text-gray-400 text-sm font-medium uppercase mb-2">Last Visit</h3>
                        <p className="text-lg font-mono text-white">
                            {logs.length > 0 ? new Date(logs[0].timestamp).toLocaleTimeString() : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-white">Recent Visitors</h3>
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-800">Live Data</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-900/50 uppercase tracking-wider font-medium text-xs">
                                <tr>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">IP Address</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">ISP / Org</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {logs.map((log, index) => (
                                    <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-blue-400">
                                            {log.ip}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">
                                            <div className="flex items-center gap-2">
                                                <GlobeAmericasIcon className="h-4 w-4 text-gray-500" />
                                                {log.city}, {log.country_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                                            {log.org}
                                        </td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No visit logs found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCountPage;
