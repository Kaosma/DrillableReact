// Drill class interface
export interface Drill {
  title: string;
  id: string;
  duration: number;
  numberOfPlayers: number;
  imageUrl: string;
  videoUrl: string;
  category: string;
  level: number;
  ratings: number[];
  equipment: number[];
}

export interface DrillsSection {
  title: string;
  data: Drill[];
}
