import React, { useState } from 'react';
import { User, Users, Clipboard, Save } from 'lucide-react';
import { ReliefStatus } from '../../types';

const VictimIntake: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: 'Male',
        familyCount: 1,
        status: ReliefStatus.DISPLACED,
        needs: '',
        idDocument: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Victim registered successfully. ID Card generated.");
        // Logic to push to API would go here
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">New Victim Registration</h1>
                <p className="text-slate-500">Enter details to assign a camp spot and generate a digital ID.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-8">
                {/* Personal Details */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <User className="mr-2 text-blue-600" size={20} /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="e.g. John"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="e.g. Doe"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Family & Status */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <Users className="mr-2 text-indigo-600" size={20} /> Group Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Family Members Count</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.familyCount}
                                onChange={e => setFormData({ ...formData, familyCount: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Status</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as ReliefStatus })}
                            >
                                {Object.values(ReliefStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Assignment */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <Clipboard className="mr-2 text-teal-600" size={20} /> Immediate Needs
                    </h3>
                    <textarea
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                        placeholder="List specific medical needs, allergies, or urgent supplies required..."
                        value={formData.needs}
                        onChange={e => setFormData({ ...formData, needs: e.target.value })}
                    ></textarea>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit" className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-bold transition-all shadow-md">
                        <Save size={18} />
                        <span>Save & Generate ID</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VictimIntake;
