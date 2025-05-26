import React, { useState } from 'react';
import { useHackathons } from '../contexts/HackathonContext';
import { CalendarDays, PenLine, Plus, X } from 'lucide-react';

interface HackathonFormProps {
  onClose: () => void;
}

const HackathonForm: React.FC<HackathonFormProps> = ({ onClose }) => {
  const { addNewHackathon } = useHackathons();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{name?: string; date?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; date?: string} = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Hackathon name is required';
      isValid = false;
    }

    if (!date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addNewHackathon({
        name,
        date,
        notes,
        completed: false
      });
      
      // Reset form and close
      setName('');
      setDate('');
      setNotes('');
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add New Hackathon</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="hackathon-name" className="block text-sm font-medium text-gray-700 mb-1">
            Hackathon Name*
          </label>
          <div className="relative">
            <input
              id="hackathon-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-9`}
              placeholder="e.g., ReactCon Hackathon 2025"
            />
            <PenLine size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="hackathon-date" className="block text-sm font-medium text-gray-700 mb-1">
            Date*
          </label>
          <div className="relative">
            <input
              id="hackathon-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-9`}
            />
            <CalendarDays size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="hackathon-notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="hackathon-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
            placeholder="Add any notes, goals, or memories about this hackathon..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Hackathon
          </button>
        </div>
      </form>
    </div>
  );
};

export default HackathonForm;