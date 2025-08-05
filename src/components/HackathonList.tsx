import React from "react";
import HackathonCard from "./HackathonCard";
import { useHackathons } from "../contexts/HackathonContext";
import EmptyState from "./EmptyState";

interface HackathonListProps {
  onAddNew: () => void;
}

const HackathonList: React.FC<HackathonListProps> = ({ onAddNew }) => {
  const { filteredHackathons, filter } = useHackathons();

  if (filteredHackathons.length === 0) {
    return <EmptyState onAddNew={onAddNew} filter={filter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredHackathons.map((hackathon) => (
        <HackathonCard key={hackathon.id} hackathon={hackathon} />
      ))}
    </div>
  );
};

export default HackathonList;
