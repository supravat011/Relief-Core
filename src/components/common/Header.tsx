import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tent, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Find Shelters', path: '/public' },
        { name: 'About Us', path: '#about' },
        { name: 'Contact', path: '#contact' },
    ];

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <Tent className="text-blue-600 h-6 w-6" />
                            <div>
                                <h1 className="font-bold text-xl text-slate-900">ReliefCore</h1>
                                <p className="text-xs text-slate-500 -mt-1">Disaster Relief Management</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md text-sm"
                        >
                            Access Portal
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 py-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="p-4">
                        <Link
                            to="/login"
                            className="block w-full text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Access Portal
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
