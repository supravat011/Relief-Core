import React from 'react';
import { CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { UserRole } from '../../context/AuthContext';

interface Task {
    id: string;
    title: string;
    location: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'In Progress' | 'Completed';
    dueTime: string;
}

const VolunteerDashboard: React.FC = () => {
    // Mock Data
    const tasks: Task[] = [
        { id: '1', title: 'Distribute Food Packs at Zone A', location: 'Central Camp', priority: 'High', status: 'Pending', dueTime: '2 hours left' },
        { id: '2', title: 'Assist Medical Team with Triage', location: 'Sector 4', priority: 'Medium', status: 'In Progress', dueTime: 'Ongoing' },
        { id: '3', title: 'Unload Water Supply Truck', location: 'Warehouse 2', priority: 'Low', status: 'Completed', dueTime: 'Done' },
    ];

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return 'text-red-600 bg-red-100';
            case 'Medium': return 'text-orange-600 bg-orange-100';
            default: return 'text-blue-600 bg-blue-100';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Assignments</h1>
                <p className="text-slate-500">Welcome back, Volunteer John.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="mx-auto bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="text-green-600 h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-500">Completed</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="mx-auto bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                        <Clock className="text-blue-600 h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">45h</p>
                    <p className="text-xs text-slate-500">Hours Logged</p>
                </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Current Tasks</h3>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">3 Active</span>
                </div>
                <div className="dye">
                    {tasks.map(task => (
                        <div key={task.id} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start md:items-center">
                                <div className={`mr-4 p-2 rounded-lg shrink-0 ${task.status === 'Completed' ? 'bg-slate-100' : 'bg-white border border-slate-200'}`}>
                                    {task.status === 'Completed' ? <CheckCircle className="text-slate-400" /> : <AlertCircle className="text-blue-600" />}
                                </div>
                                <div>
                                    <h4 className={`font-semibold text-slate-900 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>{task.title}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-xs text-slate-500 flex items-center">
                                            <MapPin size={12} className="mr-1" /> {task.location}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center">
                                            <Clock size={12} className="mr-1" /> {task.dueTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                {task.status !== 'Completed' && (
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                        Mark Done
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
