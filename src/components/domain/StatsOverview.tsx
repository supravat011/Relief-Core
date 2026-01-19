import React from 'react';
import { Users, Home, Box, AlertCircle } from 'lucide-react';
import { Camp, Victim } from '../../types';

interface StatsProps {
  camps: Camp[];
  victims: Victim[];
}

export const ACTIVITY_LOG = [
  { id: 1, text: "Volunteer Unit 4 checked in 15 new victims at Camp Alpha.", time: "2 mins ago" },
  { id: 2, text: "Medical supplies (Insulin) requested by Stadium Triage Center.", time: "15 mins ago" },
  { id: 3, text: "New disaster zone registered: Flash Flood in District 4.", time: "1 hour ago" },
  { id: 4, text: "Air drop logistics confirmed for North-East Sector.", time: "2 hours ago" },
];

const StatsOverview: React.FC<StatsProps> = ({ camps = [], victims = [] }) => {
  const totalCapacity = camps.reduce((acc, c) => acc + c.capacity, 0);
  const totalOccupancy = camps.reduce((acc, c) => acc + c.occupancy, 0);
  const criticalResources = camps.reduce((acc, c) =>
    acc + c.resources.filter(r => r.status === 'Critical').length, 0
  );

  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Displaced Persons"
        value={victims.length}
        sub="+12 in last hour"
        icon={Users}
        color="bg-blue-500"
      />
      <StatCard
        title="Active Camps"
        value={camps.length}
        sub={`${totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0}% Global Capacity`}
        icon={Home}
        color="bg-emerald-500"
      />
      <StatCard
        title="Supply Alerts"
        value={criticalResources}
        sub="Items critically low"
        icon={AlertCircle}
        color="bg-red-500"
      />
      <StatCard
        title="Logistics"
        value="Active"
        sub="3 Trucks En Route"
        icon={Box}
        color="bg-orange-500"
      />
    </div>
  );
};

export default StatsOverview;