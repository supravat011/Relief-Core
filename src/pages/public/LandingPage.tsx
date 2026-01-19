import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Tent, Heart, MapPin, Phone, Users, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 py-32 relative z-10 text-center">
                    <div className="inline-flex items-center bg-blue-800 bg-opacity-50 rounded-full px-4 py-1.5 mb-8 border border-blue-700 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                        <span className="text-xs font-semibold tracking-wide uppercase">Global Response Network Active</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
                        Rapid Response for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Disaster Relief</span>
                    </h1>

                    <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        A unified platform connecting government authorities, volunteers, and affected communities for efficient camp management and resource distribution.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to="/login" className="px-10 py-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
                            Access Command Portal <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/public" className="px-10 py-4 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center">
                            Find Nearest Shelter
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </div>

            {/* Live Statistics Section */}
            <div className="py-12 bg-slate-50 -mt-12 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-blue-600 mb-2">124</p>
                            <p className="text-sm text-slate-500 font-medium">Active Camps</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-indigo-600 mb-2">15k+</p>
                            <p className="text-sm text-slate-500 font-medium">Volunteers Mobilized</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-teal-600 mb-2">89k</p>
                            <p className="text-sm text-slate-500 font-medium">Lives Impacted</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-orange-600 mb-2">2.4M</p>
                            <p className="text-sm text-slate-500 font-medium">Relief Kits Distributed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Features Grid */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Targeted Solutions</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Coordinated Relief Efforts</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Our platform bridges the gap between chaos and order, providing specific tools for every stakeholder in the disaster management ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-slate-50 hover:bg-blue-50 p-8 rounded-2xl transition-colors duration-300">
                            <div className="bg-white p-4 rounded-xl w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="text-indigo-600 h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Authority Control</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-indigo-500 mt-1" /> Real-time disaster mapping</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-indigo-500 mt-1" /> AI-powered resource prediction</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-indigo-500 mt-1" /> Cross-agency coordination</li>
                            </ul>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-slate-50 hover:bg-blue-50 p-8 rounded-2xl transition-colors duration-300">
                            <div className="bg-white p-4 rounded-xl w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <Tent className="text-blue-600 h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Camp Operations</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-blue-500 mt-1" /> Digital victim registration</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-blue-500 mt-1" /> Inventory & supply tracking</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-blue-500 mt-1" /> Medical capacity monitoring</li>
                            </ul>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-slate-50 hover:bg-blue-50 p-8 rounded-2xl transition-colors duration-300">
                            <div className="bg-white p-4 rounded-xl w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="text-teal-600 h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Public Aid</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-teal-500 mt-1" /> Safe zone locator maps</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-teal-500 mt-1" /> Missing persons database</li>
                                <li className="flex items-start"><CheckCircle size={18} className="mr-2 text-teal-500 mt-1" /> Direct volunteer requests</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16">
                        <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Workflow</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How ReliefCore Works</h2>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {/* Step 1 */}
                            <div className="relative z-10">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/30">1</div>
                                <h3 className="text-xl font-bold mb-2">Alert Activation</h3>
                                <p className="text-slate-500 text-sm">Disaster is registered by authorities. Geofenced alerts are sent to users in affected areas.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative z-10">
                                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-indigo-500/30">2</div>
                                <h3 className="text-xl font-bold mb-2">Camp Deployment</h3>
                                <p className="text-slate-500 text-sm">Managers set up relief camps. Digital intake begins immediately via mobile tablets.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative z-10">
                                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-teal-500/30">3</div>
                                <h3 className="text-xl font-bold mb-2">Resource AI</h3>
                                <p className="text-slate-500 text-sm">Gemini AI analyzes intake data to predict food and medical needs for the next 48 hours.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative z-10">
                                <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-orange-500/30">4</div>
                                <h3 className="text-xl font-bold mb-2">Reunification</h3>
                                <p className="text-slate-500 text-sm">Families locate loved ones through the centralized secure database system.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials / Impact Section */}
            <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-16">Voices from the Field</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-slate-600 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-bold">Sarah Jenkins</h4>
                                    <p className="text-blue-400 text-sm">Camp Manager, Sector 4</p>
                                </div>
                            </div>
                            <p className="text-slate-300 italic">"Before ReliefCore, we used paper slips. It was chaos. Now, I know exactly how many insulin doses I need before I even run out. This system saves lives."</p>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-slate-600 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-bold">Dr. Aris Thorne</h4>
                                    <p className="text-blue-400 text-sm">Volunteer Medic</p>
                                </div>
                            </div>
                            <p className="text-slate-300 italic">"The real-time patient tracking allowed us to triage 500+ victims during the flash floods with zero data loss. Incredible efficiency."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-red-600 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Phone className="mr-3" /> In an immediate emergency?
                        </h2>
                        <p className="text-red-100 mt-2">If you are in immediate danger, do not wait. Contact local emergency services.</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors">
                            Call 911
                        </button>
                        <button className="bg-red-700 text-white border border-red-500 px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition-colors">
                            SOS Beacon
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;
