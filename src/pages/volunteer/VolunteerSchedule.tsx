import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const VolunteerSchedule: React.FC = () => {
    const schedule = [
        { id: 1, date: 'Today', time: '09:00 AM - 12:00 PM', task: 'Food Distribution', location: 'Central Camp', team: '5 volunteers' },
        { id: 2, date: 'Today', time: '02:00 PM - 05:00 PM', task: 'Medical Assistance', location: 'Sector 4', team: '3 volunteers' },
        { id: 3, date: 'Tomorrow', time: '08:00 AM - 11:00 AM', task: 'Supply Unloading', location: 'Warehouse 2', team: '8 volunteers' },
        { id: 4, date: 'Tomorrow', time: '01:00 PM - 04:00 PM', task: 'Registration Desk', location: 'Main Office', team: '2 volunteers' },
        { id: 5, date: 'Jan 18', time: '10:00 AM - 02:00 PM', task: 'Camp Cleanup', location: 'Stadium Center', team: '10 volunteers' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Schedule</h1>
                <p className="text-slate-500">View your upcoming assignments and shifts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">This Week</span>
                        <Calendar className="text-blue-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-500 mt-1">Scheduled shifts</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">Total Hours</span>
                        <Clock className="text-green-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">36h</p>
                    <p className="text-xs text-slate-500 mt-1">This week</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800">Upcoming Shifts</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {schedule.map(shift => (
                        <div key={shift.id} className="p-6 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                                            {shift.date}
                                        </span>
                                        <span className="text-sm text-slate-500 flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            {shift.time}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">{shift.task}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                                        <span className="flex items-center">
                                            <MapPin size={14} className="mr-1" />
                                            {shift.location}
                                        </span>
                                        <span className="flex items-center">
                                            <Users size={14} className="mr-1" />
                                            {shift.team}
                                        </span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerSchedule;
