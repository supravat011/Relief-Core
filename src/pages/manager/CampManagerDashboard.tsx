import React from 'react';
import { Tent, Users, Package, Activity, Plus, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const CampManagerDashboard: React.FC = () => {
    // Mock Data for specific camp
    const campStats = {
        name: "Central High School Shelter",
        occupancy: 420,
        capacity: 500,
        criticalItems: 2,
        dailyCheckins: 45
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{campStats.name}</h1>
                    <p className="text-slate-500">Camp Manager Dashboard</p>
                </div>
                <div className="flex space-x-3">
                    <Link to="/manager/victims" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>Register Victim</span>
                    </Link>
                    <Link to="/manager/inventory" className="flex items-center space-x-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <ClipboardList size={18} />
                        <span>Log Inventory</span>
                    </Link>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <Users className="text-blue-600 h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Occupancy</p>
                        <p className="text-2xl font-bold text-slate-900">{campStats.occupancy} <span className="text-sm text-slate-400 font-normal">/ {campStats.capacity}</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
                    <div className="bg-orange-100 p-3 rounded-lg mr-4">
                        <Activity className="text-orange-600 h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Daily Intake</p>
                        <p className="text-2xl font-bold text-slate-900">+{campStats.dailyCheckins}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                        <Package className="text-red-600 h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Low Stock Alerts</p>
                        <p className="text-2xl font-bold text-red-600">{campStats.criticalItems}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <Tent className="text-green-600 h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Status</p>
                        <p className="text-2xl font-bold text-green-600">Active</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Intakes */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-4">Recent Check-ins</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-100 last:pb-0 last:border-0">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold mr-3">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">John Doe {i}</p>
                                        <p className="text-sm text-slate-500">ID: #8392{i} • Family of 3</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Safe</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                        <button className="text-blue-600 font-medium hover:text-blue-700 text-sm">View All Occupants</button>
                    </div>
                </div>

                {/* Resource Requests */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-4">Quick Requests</h3>
                    <p className="text-sm text-slate-500 mb-4">Request urgent supplies from HQ.</p>

                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                            <span className="font-medium text-slate-700">Medical Kits</span>
                            <Plus size={16} className="text-blue-500" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                            <span className="font-medium text-slate-700">Water (500L)</span>
                            <Plus size={16} className="text-blue-500" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                            <span className="font-medium text-slate-700">Blankets (50)</span>
                            <Plus size={16} className="text-blue-500" />
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Pending Request</p>
                        <p className="text-sm text-yellow-700">Insulin (20 units) - Requested 2hrs ago</p>
                        <div className="w-full bg-yellow-200 h-1.5 rounded-full mt-2">
                            <div className="bg-yellow-500 h-1.5 rounded-full w-2/3"></div>
                        </div>
                        <p className="text-xs text-yellow-600 mt-1 text-right">In Transit</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampManagerDashboard;
