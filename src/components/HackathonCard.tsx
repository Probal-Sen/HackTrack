import React, { useState } from "react";
import { Hackathon } from "../types/hackathon";
import { useHackathons } from "../contexts/HackathonContext";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  Check,
  X,
} from "lucide-react";

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon }) => {
  const { toggleHackathonStatus, updateExistingHackathon, removeHackathon } =
    useHackathons();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(hackathon.notes);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isUpcoming =
    !hackathon.completed && new Date(hackathon.date) > new Date();
  const isPast = !hackathon.completed && new Date(hackathon.date) < new Date();

  const handleToggleStatus = () => {
    toggleHackathonStatus(hackathon.id);
  };

  const handleEditNotes = () => {
    setIsEditing(true);
  };

  const handleSaveNotes = () => {
    updateExistingHackathon({
      ...hackathon,
      notes: editedNotes,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedNotes(hackathon.notes);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this hackathon?")) {
      removeHackathon(hackathon.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 ${
        hackathon.completed
          ? "border-emerald-500"
          : isUpcoming
            ? "border-indigo-500"
            : "border-amber-500"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3
              className={`text-xl font-bold ${hackathon.completed ? "text-gray-500 line-through" : "text-gray-800"}`}
            >
              {hackathon.name}
            </h3>

            <div className="flex items-center mt-2 text-gray-600">
              <CalendarDays size={16} className="mr-2" />
              <span>{formatDate(hackathon.date)}</span>
            </div>

            <div className="mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  hackathon.completed
                    ? "bg-emerald-100 text-emerald-800"
                    : isUpcoming
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-amber-100 text-amber-800"
                }`}
              >
                {hackathon.completed ? (
                  <CheckCircle size={12} className="mr-1" />
                ) : (
                  <Clock size={12} className="mr-1" />
                )}
                {hackathon.completed
                  ? "Completed"
                  : isUpcoming
                    ? "Upcoming"
                    : "Past due"}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleToggleStatus}
              className={`p-2 rounded-full transition-colors ${
                hackathon.completed
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-emerald-100 hover:bg-emerald-200"
              }`}
              title={
                hackathon.completed ? "Mark as incomplete" : "Mark as complete"
              }
            >
              {hackathon.completed ? (
                <XCircle size={18} className="text-gray-600" />
              ) : (
                <CheckCircle size={18} className="text-emerald-600" />
              )}
            </button>

            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
              title="Delete hackathon"
            >
              <Trash size={18} className="text-red-600" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">
              Notes & Memories
            </h4>
            {!isEditing && (
              <button
                onClick={handleEditNotes}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                title="Edit notes"
              >
                <Edit size={16} className="text-gray-500" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px]"
                placeholder="Add your notes or memories about this hackathon..."
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700 transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded text-sm font-medium text-white transition-colors"
                >
                  <Check size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              {hackathon.notes ? (
                hackathon.notes
              ) : (
                <span className="italic text-gray-400">
                  No notes added yet. Click the edit button to add some
                  memories!
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
