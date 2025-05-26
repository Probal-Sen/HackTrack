import React from 'react';
import { Code, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddNew: () => void;
  filter: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNew, filter }) => {
  return (
    <div className="relative overflow-hidden">
      <img
        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Empty state background"
        className="w-full h-64 object-cover rounded-lg opacity-20"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="bg-indigo-100 p-3 rounded-full mb-4">
          <Code size={32} className="text-indigo-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {filter === 'all' 
            ? 'No hackathons added yet' 
            : filter === 'upcoming' 
              ? 'No upcoming hackathons' 
              : 'No completed hackathons'
          }
        </h3>
        
        <p className="text-gray-600 text-center mb-6 max-w-md">
          {filter === 'all' 
            ? 'Start tracking your hackathon journey by adding your first event.'
            : filter === 'upcoming' 
              ? 'You don\'t have any upcoming hackathons. Add one to start planning your next coding adventure!'
              : 'You haven\'t marked any hackathons as completed yet. Once you finish a hackathon, mark it as completed to track your achievements.'
          }
        </p>
        
        {filter !== 'completed' && (
          <button
            onClick={onAddNew}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
          >
            <Plus size={18} className="mr-2" />
            Add Your First Hackathon
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;