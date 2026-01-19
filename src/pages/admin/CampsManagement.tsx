import React from 'react';
import { MapPin, Users, Package, TrendingUp } from 'lucide-react';

const CampsManagement: React.FC = () => {
    const camps = [
        { id: 1, name: 'Central High School Shelter', location: 'District 1, Downtown', capacity: 500, occupancy: 420, status: 'Active', manager: 'Sarah Connor' },
        { id: 2, name: 'Stadium Triage Center', location: 'District 2, East', capacity: 1000, occupancy: 950, status: 'Full', manager: 'Ellen Ripley' },
        { id: 3, name: 'Community Center Relief', location: 'District 3, West', capacity: 300, occupancy: 180, status: 'Active', manager: 'John Smith' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Full': return 'bg-red-100 text-red-700';
            case 'Closed': return 'bg-slate-100 text-slate-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Relief Camps</h1>
                    <p className="text-slate-500">Manage all relief camps and shelters</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                    + Create New Camp
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {camps.map(camp => (
                    <div key={camp.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{camp.name}</h3>
                                <div className="flex items-center text-slate-500 mt-1">
                                    <MapPin size={16} className="mr-1" />
                                    <span className="text-sm">{camp.location}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(camp.status)}`}>
                                {camp.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-500">Capacity</span>
                                    <Users size={18} className="text-slate-400" />
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{camp.capacity}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-500">Occupancy</span>
                                    <TrendingUp size={18} className="text-slate-400" />
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{camp.occupancy}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-500">Available</span>
                                    <Package size={18} className="text-slate-400" />
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{camp.capacity - camp.occupancy}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="text-sm text-slate-500">
                                Manager: <span className="font-medium text-slate-700">{camp.manager}</span>
                            </div>
                            <div className="space-x-2">
                                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                                    View Details
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampsManagement;
