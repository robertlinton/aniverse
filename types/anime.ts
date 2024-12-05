export interface Anime {
  id: string;
  malId?: string;
  title: string;
  description: string;
  image: string;
  coverImage: string;
  isFeatured: boolean;
  format: string;
  category: 'tv' | 'movie' | 'other';  // New field
  status: string;
  releaseDate: string;
  episodes: number;
  genres: string[];
  duration: string;
  rating: string;
}

