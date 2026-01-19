import React, { useState } from 'react';
import { Map, AlertTriangle, Plus, Filter } from 'lucide-react';

const MOCK_DISASTERS = [
    { id: 1, type: 'Flood', location: 'District 1, Downtown', severity: 'Critical', reportedAt: '2025-10-12 08:30 AM', status: 'Active' },
    { id: 2, type: 'Earthquake', location: 'North Ridge', severity: 'High', reportedAt: '2025-10-12 09:15 AM', status: 'Active' },
    { id: 3, type: 'Fire', location: 'Industrial Zone', severity: 'Medium', reportedAt: '2025-10-11 04:00 PM', status: 'Contained' },
];

const DisasterManagement: React.FC = () => {
    const [disasters, setDisasters] = useState(MOCK_DISASTERS);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'text-red-600 bg-red-100';
            case 'High': return 'text-orange-600 bg-orange-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-blue-600 bg-blue-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Disaster Management</h2>
                    <p className="text-slate-500">Monitor and register new disaster events.</p>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus size={18} />
                    <span>Register New Event</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map View */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-1 overflow-hidden h-[500px] relative group">
                    {/* Placeholder Map Image */}
                    <img
                        src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapArt.jpg"
                        alt="Map"
                        className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
                        <Filter size={20} className="text-slate-500" />
                    </div>

                    {/* Map Pins (Mock) */}
                    <div className="absolute top-1/3 left-1/4 animate-bounce">
                        <Map className="text-red-600 h-8 w-8 drop-shadow-lg" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 animate-bounce delay-75">
                        <Map className="text-orange-600 h-8 w-8 drop-shadow-lg" />
                    </div>
                </div>

                {/* List View */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800">Active Events</h3>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {disasters.map(d => (
                            <div key={d.id} className="p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-900">{d.type}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(d.severity)}`}>
                                        {d.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 flex items-center mb-1">
                                    <AlertTriangle size={12} className="mr-1" />
                                    {d.location}
                                </p>
                                <div className="flex justify-between items-center text-xs text-slate-400">
                                    <span>{d.reportedAt}</span>
                                    <span className="group-hover:text-blue-600 transition-colors">View Details →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisasterManagement;
