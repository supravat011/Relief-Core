import React, { useState } from 'react';
import { Package, Plus, Minus, AlertTriangle } from 'lucide-react';

const InventoryManager: React.FC = () => {
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Water (L)', quantity: 150, unit: 'L', status: 'Critical', minStock: 500 },
        { id: 2, name: 'Food Packs', quantity: 300, unit: 'Pack', status: 'Good', minStock: 100 },
        { id: 3, name: 'Blankets', quantity: 50, unit: 'Pc', status: 'Low', minStock: 100 },
        { id: 4, name: 'Medical Kits', quantity: 25, unit: 'Kit', status: 'Critical', minStock: 50 },
        { id: 5, name: 'Hygiene Kits', quantity: 200, unit: 'Pack', status: 'Good', minStock: 80 },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Good': return 'bg-green-100 text-green-700';
            case 'Low': return 'bg-orange-100 text-orange-700';
            case 'Critical': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
                    <p className="text-slate-500">Track and manage camp resources</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center">
                    <Plus size={18} className="mr-2" />
                    Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">Total Items</span>
                        <Package className="text-blue-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{inventory.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">Low Stock</span>
                        <AlertTriangle className="text-orange-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-orange-600">
                        {inventory.filter(i => i.status === 'Low').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">Critical</span>
                        <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-red-600">
                        {inventory.filter(i => i.status === 'Critical').length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800">Current Stock</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {inventory.map(item => (
                        <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                                        <span>Current: <span className="font-bold text-slate-700">{item.quantity} {item.unit}</span></span>
                                        <span>Min Stock: <span className="font-bold text-slate-700">{item.minStock} {item.unit}</span></span>
                                    </div>
                                    <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-2 ${item.status === 'Good' ? 'bg-green-500' : item.status === 'Low' ? 'bg-orange-500' : 'bg-red-500'}`}
                                            style={{ width: `${Math.min((item.quantity / item.minStock) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ml-6 flex items-center space-x-2">
                                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                                        <Minus size={18} />
                                    </button>
                                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventoryManager;
