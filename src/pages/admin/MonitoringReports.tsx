import React from 'react';
import { BarChart, LineChart, PieChart, Activity } from 'lucide-react';

const MonitoringReports: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Monitoring & Reports</h1>
            <p className="text-slate-500">System-wide analytics and performance metrics.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Simulated Chart Containers */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="flex items-center font-bold text-lg mb-4 text-slate-800">
                        <Activity className="mr-2 text-blue-600" />
                        Relief Distribution Efficiency
                    </h3>
                    <div className="bg-slate-50 h-64 rounded-lg flex items-center justify-center border border-slate-100">
                        <p className="text-slate-400 font-medium">Interactive Line Chart Placeholder</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="flex items-center font-bold text-lg mb-4 text-slate-800">
                        <PieChart className="mr-2 text-indigo-600" />
                        Displaced Population Demographics
                    </h3>
                    <div className="bg-slate-50 h-64 rounded-lg flex items-center justify-center border border-slate-100">
                        <p className="text-slate-400 font-medium">Interactive Pie Chart Placeholder</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-lg">System Logs</h3>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <li key={i} className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">New camp "Sector 7 Shelter" initiated by Admin.</span>
                                <span className="text-slate-400 font-mono">10:4{i} AM</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MonitoringReports;
