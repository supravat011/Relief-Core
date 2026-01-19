import React from 'react';
import { Package, Truck, AlertTriangle, Search } from 'lucide-react';

const ResourceManagement: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Resource Management</h1>
                    <p className="text-slate-500">Track and allocate critical supplies across camps.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                    + Add Inventory
                </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">Total Stock Value</p>
                        <p className="text-2xl font-bold text-slate-900">$2.5M</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg text-green-600"><Package /></div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">Pending Requests</p>
                        <p className="text-2xl font-bold text-orange-600">34</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg text-orange-600"><Truck /></div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">Critical Shortages</p>
                        <p className="text-2xl font-bold text-red-600">5 Camps</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-lg text-red-600"><AlertTriangle /></div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg">Central Inventory</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder="Search supplies..." />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Item Name</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Quantity</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Medical Kits (Level 1)</td>
                            <td className="px-6 py-4 text-slate-500">Medical</td>
                            <td className="px-6 py-4 text-slate-900">1,200 Units</td>
                            <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Good</span></td>
                            <td className="px-6 py-4 text-blue-600 cursor-pointer font-medium hover:underline">Distribute</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Bottled Water (500ml)</td>
                            <td className="px-6 py-4 text-slate-500">Food & Water</td>
                            <td className="px-6 py-4 text-slate-900">50,000 Units</td>
                            <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Good</span></td>
                            <td className="px-6 py-4 text-blue-600 cursor-pointer font-medium hover:underline">Distribute</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Thermal Blankets</td>
                            <td className="px-6 py-4 text-slate-500">Shelter</td>
                            <td className="px-6 py-4 text-slate-900">120 Units</td>
                            <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Low</span></td>
                            <td className="px-6 py-4 text-blue-600 cursor-pointer font-medium hover:underline">Restock</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResourceManagement;
