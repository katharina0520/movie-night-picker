export type Movie = {
  id: number;
  tmdbId: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseYear: string;
  rating: number;
  genres: string[];
  runtime: number | null;
};

export type Swipe = {
  id: number;
  userId: string;
  roomId: string;
  movieId: number;
  direction: 'left' | 'right';
  swipedAt: Date;
};

export type Match = {
  movie: Movie;
  users: string[];
};

export type User = {
  id: string;
  name: string;
  roomId: string;
};

export type Room = {
  id: string;
};
