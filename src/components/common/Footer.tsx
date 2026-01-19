import React from 'react';
import { Tent, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="w-full px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Tent className="text-blue-500 h-6 w-6" />
                            <span className="font-bold text-xl text-white">ReliefCore</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            Coordinating rapid response and resource allocation for disaster management worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Access</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Find a Shelter</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Report Incident</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Volunteer Login</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Donate Supplies</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Contact HQ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MapPin size={16} className="mr-2 mt-1 text-blue-500" />
                                <span>123 Emergency Lane,<br />District 1, Safety City</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={16} className="mr-2 text-blue-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={16} className="mr-2 text-blue-500" />
                                <span>help@reliefcore.org</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} ReliefCore. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <span>System Status: <span className="text-green-500">Operational</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
