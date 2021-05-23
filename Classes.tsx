// Drill interface
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

// DrillsSection interface
export interface DrillsSection {
  sectionTitle: string;
  data: Drill[];
}
