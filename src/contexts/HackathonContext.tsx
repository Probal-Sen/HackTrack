import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Hackathon, HackathonFilter } from "../types/hackathon";
import {
  getHackathons,
  saveHackathons,
  addHackathon,
  updateHackathon,
  deleteHackathon,
} from "../utils/localStorage";

interface HackathonContextType {
  hackathons: Hackathon[];
  filter: HackathonFilter;
  filteredHackathons: Hackathon[];
  addNewHackathon: (hackathon: Omit<Hackathon, "id" | "createdAt">) => void;
  updateExistingHackathon: (hackathon: Hackathon) => void;
  removeHackathon: (id: string) => void;
  toggleHackathonStatus: (id: string) => void;
  setFilter: (filter: HackathonFilter) => void;
}

const HackathonContext = createContext<HackathonContextType | undefined>(
  undefined,
);

export const useHackathons = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error("useHackathons must be used within a HackathonProvider");
  }
  return context;
};

interface HackathonProviderProps {
  children: ReactNode;
}

export const HackathonProvider: React.FC<HackathonProviderProps> = ({
  children,
}) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filter, setFilter] = useState<HackathonFilter>("all");

  useEffect(() => {
    const storedHackathons = getHackathons();
    setHackathons(storedHackathons);
  }, []);

  // Save hackathons to localStorage whenever they change
  useEffect(() => {
    saveHackathons(hackathons);
  }, [hackathons]);

  const addNewHackathon = (
    hackathonData: Omit<Hackathon, "id" | "createdAt">,
  ) => {
    const newHackathon: Hackathon = {
      ...hackathonData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setHackathons((prev) => [...prev, newHackathon]);
    addHackathon(newHackathon);
  };

  const updateExistingHackathon = (updatedHackathon: Hackathon) => {
    setHackathons((prev) =>
      prev.map((hackathon) =>
        hackathon.id === updatedHackathon.id ? updatedHackathon : hackathon,
      ),
    );
    updateHackathon(updatedHackathon);
  };

  const removeHackathon = (id: string) => {
    setHackathons((prev) => prev.filter((hackathon) => hackathon.id !== id));
    deleteHackathon(id);
  };

  const toggleHackathonStatus = (id: string) => {
    setHackathons((prev) =>
      prev.map((hackathon) =>
        hackathon.id === id
          ? { ...hackathon, completed: !hackathon.completed }
          : hackathon,
      ),
    );

    const hackathonToUpdate = hackathons.find((h) => h.id === id);
    if (hackathonToUpdate) {
      updateHackathon({
        ...hackathonToUpdate,
        completed: !hackathonToUpdate.completed,
      });
    }
  };

  // Filter hackathons based on current filter
  const filteredHackathons = hackathons.filter((hackathon) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return !hackathon.completed;
    if (filter === "completed") return hackathon.completed;
    return true;
  });

  // Sort hackathons by date (upcoming first, then completed)
  const sortedFilteredHackathons = [...filteredHackathons].sort((a, b) => {
    // First sort by completion status
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;

    // Then sort by date (newest first for upcoming, oldest first for completed)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (a.completed) {
      // For completed hackathons, show most recent first
      return dateB - dateA;
    } else {
      // For upcoming hackathons, show closest date first
      return dateA - dateB;
    }
  });

  const value = {
    hackathons,
    filter,
    filteredHackathons: sortedFilteredHackathons,
    addNewHackathon,
    updateExistingHackathon,
    removeHackathon,
    toggleHackathonStatus,
    setFilter,
  };

  return (
    <HackathonContext.Provider value={value}>
      {children}
    </HackathonContext.Provider>
  );
};
