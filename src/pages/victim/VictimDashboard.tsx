import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Phone } from 'lucide-react';

const VictimDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'status' | 'aid'>('status');

    const victimStatus = {
        name: 'Jane Doe',
        status: 'Safe',
        camp: 'Central High School Shelter',
        familySeparated: false
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Relief Status</h1>
                <p className="text-slate-500">Track your status and request help.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className={`col-span-1 md:col-span-3 p-6 rounded-xl border ${victimStatus.status === 'Safe' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex items-center justify-between`}>
                    <div className="flex items-center">
                        <div className={`p-4 rounded-full mr-4 ${victimStatus.status === 'Safe' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {victimStatus.status === 'Safe' ? <Shield size={32} /> : <AlertTriangle size={32} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider opacity-70">Current Status</p>
                            <h2 className="text-3xl font-bold">{victimStatus.status}</h2>
                            <p className="text-sm mt-1">
                                {victimStatus.status === 'Safe' ? `Registered at ${victimStatus.camp}` : 'Please proceed to nearest shelter'}
                            </p>
                        </div>
                    </div>
                    {victimStatus.status !== 'Safe' && (
                        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 animate-pulse">
                            Request Evacuation
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <button
                        className={`flex-1 py-4 text-center font-bold ${activeTab === 'status' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('status')}
                    >
                        Status & Updates
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-bold ${activeTab === 'aid' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('aid')}
                    >
                        Request Aid
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'status' ? (
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mr-4 pt-1"><CheckCircle className="text-green-500" size={20} /></div>
                                <div>
                                    <h4 className="font-bold">Registration Confirmed</h4>
                                    <p className="text-sm text-slate-500">2 hours ago</p>
                                    <p className="text-slate-700 mt-1">You have been successfully registered at Central High School Shelter.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mr-4 pt-1"><CheckCircle className="text-green-500" size={20} /></div>
                                <div>
                                    <h4 className="font-bold">Family Status Verified</h4>
                                    <p className="text-sm text-slate-500">5 hours ago</p>
                                    <p className="text-slate-700 mt-1">Your family members registered with ID #83921 are also marked as safe.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">What kind of aid do you need?</label>
                                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                                    <option>Medical Attention</option>
                                    <option>Food / Water</option>
                                    <option>Clothing / Bedding</option>
                                    <option>Family Reunification</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
                                <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg h-32" placeholder="Describe your situation..."></textarea>
                            </div>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
                                Submit Request
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg">Emergency Hotline</h3>
                    <p className="text-slate-400 text-sm">24/7 Support for immediate assistance</p>
                </div>
                <div className="flex items-center space-x-2 text-xl font-bold text-blue-400">
                    <Phone />
                    <span>1-800-RELIEF</span>
                </div>
            </div>
        </div>
    );
};

export default VictimDashboard;
