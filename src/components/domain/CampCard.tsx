import React from 'react';
import { Tent, Users, Droplet, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Camp } from '../../types';

interface CampCardProps {
  camp: Camp;
  onPredictResources: (camp: Camp) => void;
}

const CampCard: React.FC<CampCardProps> = ({ camp, onPredictResources }) => {
  const occupancyRate = (camp.occupancy / camp.capacity) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Full': return 'bg-red-100 text-red-700';
      case 'Closed': return 'bg-slate-100 text-slate-500';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Tent className="text-blue-600 h-6 w-6" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(camp.status)}`}>
            {camp.status}
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-800 mb-1">{camp.name}</h3>
        <p className="text-sm text-slate-500 mb-4">{camp.location}</p>

        {/* Occupancy Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium flex items-center">
              <Users size={12} className="mr-1" /> Occupancy
            </span>
            <span className="font-bold text-slate-900">{camp.occupancy} / {camp.capacity}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${occupancyRate > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        {/* Resources Preview */}
        <div className="space-y-2">
          {camp.resources.slice(0, 3).map(res => (
            <div key={res.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="flex items-center text-slate-700">
                <Droplet size={12} className="mr-2 text-slate-400" />
                {res.name}
              </span>
              <div className="flex items-center">
                <span className="font-mono font-bold mr-2">{res.quantity}</span>
                {res.status === 'Critical' ? (
                  <AlertCircle size={14} className="text-red-500" />
                ) : res.status === 'Low' ? (
                  <AlertTriangle size={14} className="text-orange-500" />
                ) : (
                  <CheckCircle size={14} className="text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button
          onClick={() => onPredictResources(camp)}
          className="w-full py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 font-medium text-sm transition-colors shadow-sm"
        >
          Forecast Needs (AI)
        </button>
      </div>
    </div>
  );
};

export default CampCard;