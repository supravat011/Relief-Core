import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Tent,
    Bell,
    Search,
    UserPlus,
    Map,
    FileText,
    Package,
    HeartHandshake,
    Home
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

interface SidebarItemProps {
    to: string;
    icon: any;
    label: string;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => `
      w-full flex items-center space-x-3 px-6 py-4 transition-colors border-l-4
      ${isActive
                ? 'bg-blue-50 border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
    `}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavItems = (role: UserRole) => {
        switch (role) {
            case 'admin':
                return [
                    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
                    { to: '/admin/disasters', icon: Map, label: 'Disasters' },
                    { to: '/admin/camps', icon: Tent, label: 'Camps' },
                    { to: '/admin/resources', icon: Package, label: 'Resources' },
                    { to: '/admin/reports', icon: FileText, label: 'Reports' },
                ];
            case 'manager':
                return [
                    { to: '/manager/dashboard', icon: LayoutDashboard, label: 'My Camp' },
                    { to: '/manager/victims', icon: UserPlus, label: 'Victim Intake' },
                    { to: '/manager/inventory', icon: Package, label: 'Inventory' },
                ];
            case 'volunteer':
                return [
                    { to: '/volunteer/tasks', icon: LayoutDashboard, label: 'My Tasks' },
                    { to: '/volunteer/schedule', icon: FileText, label: 'Schedule' },
                ];
            case 'victim':
                return [
                    { to: '/victim/status', icon: LayoutDashboard, label: 'My Status' },
                    { to: '/victim/aid', icon: HeartHandshake, label: 'Request Aid' },
                ];
            default:
                return [];
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">

            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <Link to="/home" className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Tent className="text-white h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-800">ReliefCore</span>
                </Link>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-600">
                    {sidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <Link to="/home" className="p-6 border-b border-slate-100 flex items-center space-x-3 hover:bg-slate-50 transition-colors">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Tent className="text-white h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">ReliefCore</h1>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{user.role} Portal</p>
                    </div>
                </Link>

                <nav className="mt-6">
                    {getNavItems(user.role).map((item) => (
                        <SidebarItem key={item.to} {...item} onClick={() => setSidebarOpen(false)} />
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-6 border-t border-slate-100">
                    <div className="flex items-center mb-4 px-2">
                        <div className="w-8 h-8 rounded-full mr-3 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-slate-700 truncate">{user.full_name}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-slate-500 hover:text-red-600 transition-colors w-full px-2"
                    >
                        <LogOut size={18} className="mr-2" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen relative">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
