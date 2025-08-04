import { Hackathon } from "../types/hackathon";

const STORAGE_KEY = "hackathon-tracker-data";

export const getHackathons = (): Hackathon[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return [];

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing hackathon data:", error);
    return [];
  }
};

export const saveHackathons = (hackathons: Hackathon[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hackathons));
};

export const addHackathon = (hackathon: Hackathon): void => {
  const currentHackathons = getHackathons();
  saveHackathons([...currentHackathons, hackathon]);
};

export const updateHackathon = (updatedHackathon: Hackathon): void => {
  const currentHackathons = getHackathons();
  const updatedList = currentHackathons.map((hackathon) =>
    hackathon.id === updatedHackathon.id ? updatedHackathon : hackathon,
  );
  saveHackathons(updatedList);
};

export const deleteHackathon = (id: string): void => {
  const currentHackathons = getHackathons();
  const updatedList = currentHackathons.filter(
    (hackathon) => hackathon.id !== id,
  );
  saveHackathons(updatedList);
};
