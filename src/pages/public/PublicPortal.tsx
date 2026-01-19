import React, { useState } from 'react';
import { Search, MapPin, User, Activity } from 'lucide-react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const PublicPortal: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'victims' | 'camps'>('victims');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <div className="bg-blue-900 text-white py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Information</h1>
                    <p className="text-blue-100 mb-8">Locate relief camps nearby or check the status of a registered individual.</p>

                    <div className="bg-white p-2 rounded-lg flex shadow-lg">
                        <div className="flex-1 flex items-center px-4 border-r border-slate-200">
                            <Search className="text-slate-400 mr-2" />
                            <input
                                type="text"
                                className="w-full py-3 text-slate-800 focus:outline-none"
                                placeholder={activeTab === 'victims' ? "Enter name or digital ID..." : "Enter location or zip code..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex">
                        <button
                            className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'victims' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            onClick={() => setActiveTab('victims')}
                        >
                            Find People
                        </button>
                        <button
                            className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'camps' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            onClick={() => setActiveTab('camps')}
                        >
                            Find Shelters
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTab === 'victims' ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-slate-100 p-3 rounded-full mr-4">
                                            <User className="text-slate-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Jane Doe {i}</h3>
                                            <p className="text-sm text-slate-500">ID: #8293{i}</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Safe</span>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p className="flex items-center"><MapPin size={16} className="mr-2 text-slate-400" /> At Central High School Shelter</p>
                                    <p className="flex items-center"><Activity size={16} className="mr-2 text-slate-400" /> Last updated: 2 hrs ago</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    <h3 className="font-bold text-xl mb-1">Sector {i} Relief Center</h3>
                                    <p className="text-sm text-slate-500">Managed by Authorities</p>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <p className="flex items-center text-slate-700"><MapPin size={18} className="mr-2 text-blue-500" /> 123 Safety Ave, District {i}</p>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-2" style={{ width: '70%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>Occupancy</span>
                                        <span>350 / 500</span>
                                    </div>
                                </div>
                                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                                    View Details & Map
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PublicPortal;
