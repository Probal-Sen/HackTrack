import React from "react";
import { HackathonFilter as FilterType } from "../types/hackathon";
import { useHackathons } from "../contexts/HackathonContext";
import { CalendarRange, CheckCircle, Layers } from "lucide-react";

const HackathonFilter: React.FC = () => {
  const { filter, setFilter, hackathons } = useHackathons();

  const filterOptions: {
    value: FilterType;
    label: string;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      value: "all",
      label: "All Hackathons",
      icon: <Layers size={16} className="mr-2" />,
      count: hackathons.length,
    },
    {
      value: "upcoming",
      label: "Upcoming",
      icon: <CalendarRange size={16} className="mr-2" />,
      count: hackathons.filter((h) => !h.completed).length,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <CheckCircle size={16} className="mr-2" />,
      count: hackathons.filter((h) => h.completed).length,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setFilter(option.value)}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === option.value
              ? "bg-indigo-100 text-indigo-800 border-2 border-indigo-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
          }`}
        >
          {option.icon}
          {option.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              filter === option.value
                ? "bg-indigo-200 text-indigo-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {option.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default HackathonFilter;
