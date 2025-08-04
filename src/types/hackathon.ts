export interface Hackathon {
  id: string;
  name: string;
  date: string;
  notes: string;
  completed: boolean;
  createdAt: string;
}

export type HackathonFilter = "all" | "upcoming" | "completed";
