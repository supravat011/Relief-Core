import React, { useState } from 'react';
import StatsOverview, { ACTIVITY_LOG } from '../../components/domain/StatsOverview';
import CampCard from '../../components/domain/CampCard'; // Ensure this exists
import { Camp, Victim, ReliefStatus } from '../../types';
import { Sparkles, Map, AlertTriangle } from 'lucide-react';

// Mock Data (Moved from App.tsx)
const MOCK_CAMPS: Camp[] = [
    {
        id: 'c1',
        name: 'Central High School Shelter',
        location: 'District 1, Downtown',
        capacity: 500,
        occupancy: 420,
        status: 'Active',
        managerName: 'Sarah Connor',
        resources: [
            { id: 'r1', name: 'Water (L)', quantity: 150, unit: 'L', status: 'Critical' },
            { id: 'r2', name: 'Food Packs', quantity: 300, unit: 'Pack', status: 'Good' },
        ]
    },
    {
        id: 'c3',
        name: 'Stadium Triage Center',
        location: 'District 2, East',
        capacity: 1000,
        occupancy: 950,
        status: 'Full',
        managerName: 'Ellen Ripley',
        resources: [
            { id: 'r1', name: 'IV Fluids', quantity: 10, unit: 'Bag', status: 'Critical' },
        ]
    }
];

const MOCK_VICTIMS: Victim[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `v${i}`,
    fullName: `Victim ${i}`,
    age: 20 + i,
    gender: 'Male',
    status: ReliefStatus.DISPLACED,
    contactNumber: 'N/A',
    assignedCampId: 'c1',
    needs: [],
    registeredAt: new Date().toISOString()
}));

const AdminDashboard: React.FC = () => {
    const [camps] = useState<Camp[]>(MOCK_CAMPS);
    const [victims] = useState<Victim[]>(MOCK_VICTIMS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Command Center</h2>
                    <p className="text-slate-500">Live operational oversight</p>
                </div>
                <button className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                    <AlertTriangle size={18} />
                    <span>Broadcast Alert</span>
                </button>
            </div>

            <StatsOverview camps={camps} victims={victims} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Map Placeholder */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col items-center justify-center text-slate-400">
                        <div className="bg-slate-100 p-4 rounded-full mb-3">
                            <Map size={32} />
                        </div>
                        <p className="font-semibold">Interactive Disaster Map</p>
                        <p className="text-sm">Real-time geospatial data feed active.</p>
                    </div>

                    {/* Quick Camp Status */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Critical Camp Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {camps.map(camp => (
                                <CampCard key={camp.id} camp={camp} onPredictResources={() => alert('AI Prediction triggered')} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* AI Insight */}
                    <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-4">
                                <Sparkles className="text-yellow-400" size={20} />
                                <h3 className="font-bold text-lg">AI Insights</h3>
                            </div>
                            <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                                Analysis detects a 15% surge in water demand at District 1 due to rising temperatures. Recommend diverting supply trucks from Sector 4.
                            </p>
                            <button className="w-full bg-white text-indigo-900 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors">
                                View Full Logistics Report
                            </button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-700 rounded-full opacity-50 blur-3xl"></div>
                    </div>

                    {/* Activity Logs */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Recent Communications</h3>
                        <div className="space-y-4">
                            {ACTIVITY_LOG.map((log) => (
                                <div key={log.id} className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600 shrink-0">
                                        <Sparkles size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-800">{log.text}</p>
                                        <span className="text-xs text-slate-400">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
