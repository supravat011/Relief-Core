import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const quickLogin = async (role: string) => {
        setEmail(`${role}@reliefcore.org`);
        setPassword(`${role}123`);
        setError('');
        setLoading(true);

        try {
            await login(`${role}@reliefcore.org`, `${role}123`);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Shield className="text-blue-600 h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">ReliefCore</h1>
                    <p className="text-slate-500 mt-2">Sign in to access the portal</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                        <AlertCircle className="text-red-600 mr-2 mt-0.5" size={18} />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="user@reliefcore.org"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500 text-center mb-3">Quick Login (Demo)</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => quickLogin('admin')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium transition-colors">Admin</button>
                        <button onClick={() => quickLogin('manager')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium transition-colors">Manager</button>
                        <button onClick={() => quickLogin('volunteer')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium transition-colors">Volunteer</button>
                        <button onClick={() => quickLogin('victim')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium transition-colors">Victim</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
