export interface Anime {
  id: string;
  malId?: string;
  title: string;
  description: string;
  image: string;
  coverImage: string;
  isFeatured: boolean;
  format: string;
  status: string;
  releaseDate: string;
  episodes: number;
  genres: string[];
  duration: string;
  rating: string;
}

