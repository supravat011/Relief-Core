import React, { useState } from 'react';
import { Heart, Package, Stethoscope, Home, Users, AlertCircle } from 'lucide-react';

const AidRequest: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [description, setDescription] = useState('');

    const categories = [
        { id: 'medical', label: 'Medical Attention', icon: Stethoscope, color: 'red' },
        { id: 'food', label: 'Food & Water', icon: Package, color: 'orange' },
        { id: 'shelter', label: 'Shelter & Bedding', icon: Home, color: 'blue' },
        { id: 'family', label: 'Family Reunification', icon: Users, color: 'purple' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Aid request submitted successfully!');
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Request Aid</h1>
                <p className="text-slate-500">Submit a request for assistance</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="text-blue-600 mr-3 mt-0.5" size={20} />
                <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Emergency Assistance</p>
                    <p>For immediate life-threatening emergencies, please call <span className="font-bold">1-800-RELIEF</span> or contact camp staff directly.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">What kind of aid do you need?</label>
                    <div className="grid grid-cols-2 gap-3">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`p-4 border-2 rounded-lg text-left transition-all ${isSelected
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Icon className={`mb-2 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} size={24} />
                                    <p className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                        {cat.label}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Urgency Level</label>
                    <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="Low">Low - Can wait a few days</option>
                        <option value="Medium">Medium - Needed within 24 hours</option>
                        <option value="High">High - Urgent, needed today</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                        <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-32"
                        placeholder="Please provide any additional details about your request..."
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Your request will be reviewed by camp staff
                    </p>
                    <button
                        type="submit"
                        disabled={!selectedCategory}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Request
                    </button>
                </div>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4">Recent Requests</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                            <Package className="text-orange-600 mr-3" size={20} />
                            <div>
                                <p className="font-medium text-slate-900">Food & Water</p>
                                <p className="text-xs text-slate-500">Submitted 2 hours ago</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                            Pending
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AidRequest;
