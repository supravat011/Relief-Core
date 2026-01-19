import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/public/LandingPage';
import { useAuth } from './context/AuthContext';
import DisasterManagement from './pages/admin/DisasterManagement';
import AdminDashboard from './pages/admin/AdminDashboard';
import ResourceManagement from './pages/admin/ResourceManagement';
import MonitoringReports from './pages/admin/MonitoringReports';
import CampManagerDashboard from './pages/manager/CampManagerDashboard';
import VictimIntake from './pages/manager/VictimIntake';
import InventoryManager from './pages/manager/InventoryManager';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import VolunteerSchedule from './pages/volunteer/VolunteerSchedule';
import VictimDashboard from './pages/victim/VictimDashboard';
import AidRequest from './pages/victim/AidRequest';
import CampsManagement from './pages/admin/CampsManagement';
import PublicPortal from './pages/public/PublicPortal';

const ProtectedRoute = ({ children, allowedRoles }: { children: any, allowedRoles: string[] }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading...</p>
            </div>
        </div>;
    }

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

    return children;
};

const RoleBasedRedirect = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading...</p>
            </div>
        </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    // Redirect authenticated users based on role
    switch (user?.role) {
        case 'admin':
            return <Navigate to="/admin/dashboard" replace />;
        case 'manager':
            return <Navigate to="/manager/dashboard" replace />;
        case 'volunteer':
            return <Navigate to="/volunteer/tasks" replace />;
        case 'victim':
            return <Navigate to="/victim/status" replace />;
        default:
            return <Navigate to="/home" replace />;
    }
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<RoleBasedRedirect />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/public" element={<PublicPortal />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={<DashboardLayout />}>
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Routes>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="disasters" element={<DisasterManagement />} />
                            <Route path="camps" element={<CampsManagement />} />
                            <Route path="resources" element={<ResourceManagement />} />
                            <Route path="reports" element={<MonitoringReports />} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* Manager Routes */}
                <Route path="/manager/*" element={
                    <ProtectedRoute allowedRoles={['manager']}>
                        <Routes>
                            <Route path="dashboard" element={<CampManagerDashboard />} />
                            <Route path="victims" element={<VictimIntake />} />
                            <Route path="inventory" element={<InventoryManager />} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* Volunteer Routes */}
                <Route path="/volunteer/*" element={
                    <ProtectedRoute allowedRoles={['volunteer']}>
                        <Routes>
                            <Route path="tasks" element={<VolunteerDashboard />} />
                            <Route path="schedule" element={<VolunteerSchedule />} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* Victim Routes */}
                <Route path="/victim/*" element={
                    <ProtectedRoute allowedRoles={['victim']}>
                        <Routes>
                            <Route path="status" element={<VictimDashboard />} />
                            <Route path="aid" element={<AidRequest />} />
                        </Routes>
                    </ProtectedRoute>
                } />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
