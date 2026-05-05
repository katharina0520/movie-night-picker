import type { Movie } from '@/lib/types'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p/w500'
const TMDB_BACKDROP = 'https://image.tmdb.org/t/p/original'

const API_KEY = process.env.TMDB_API_KEY || ''

const MOCK_MOVIES: Movie[] = [
  {
    id: 1, tmdbId: 1, title: 'The Shawshank Redemption',
    posterPath: null, backdropPath: null,
    overview: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict.',
    releaseYear: '1994', rating: 8.7, genres: ['Drama'], runtime: 142,
  },
  {
    id: 2, tmdbId: 2, title: 'The Dark Knight',
    posterPath: null, backdropPath: null,
    overview: 'Batman raises the stakes in his war on crime as the Joker plunges Gotham into chaos.',
    releaseYear: '2008', rating: 9.0, genres: ['Action', 'Crime'], runtime: 152,
  },
  {
    id: 3, tmdbId: 3, title: 'Inception',
    posterPath: null, backdropPath: null,
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    releaseYear: '2010', rating: 8.8, genres: ['Sci-Fi', 'Action'], runtime: 148,
  },
  {
    id: 4, tmdbId: 4, title: 'Pulp Fiction',
    posterPath: null, backdropPath: null,
    overview: 'The lives of two mob hitmen, a boxer, and a pair of bandits intertwine in four tales of violence and redemption.',
    releaseYear: '1994', rating: 8.9, genres: ['Crime', 'Drama'], runtime: 154,
  },
  {
    id: 5, tmdbId: 5, title: 'The Matrix',
    posterPath: null, backdropPath: null,
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    releaseYear: '1999', rating: 8.7, genres: ['Sci-Fi', 'Action'], runtime: 136,
  },
  {
    id: 6, tmdbId: 6, title: 'Interstellar',
    posterPath: null, backdropPath: null,
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseYear: '2014', rating: 8.7, genres: ['Sci-Fi', 'Adventure'], runtime: 169,
  },
  {
    id: 7, tmdbId: 7, title: 'Parasite',
    posterPath: null, backdropPath: null,
    overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    releaseYear: '2019', rating: 8.5, genres: ['Thriller', 'Drama'], runtime: 132,
  },
  {
    id: 8, tmdbId: 8, title: 'Spirited Away',
    posterPath: null, backdropPath: null,
    overview: 'During her family\'s move, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    releaseYear: '2001', rating: 8.6, genres: ['Animation', 'Adventure'], runtime: 125,
  },
  {
    id: 9, tmdbId: 9, title: 'The Grand Budapest Hotel',
    posterPath: null, backdropPath: null,
    overview: 'A writer encounters the owner of an aging high-class hotel, who tells of his early years as a lobby boy.',
    releaseYear: '2014', rating: 8.1, genres: ['Comedy', 'Drama'], runtime: 99,
  },
  {
    id: 10, tmdbId: 10, title: 'Blade Runner 2049',
    posterPath: null, backdropPath: null,
    overview: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.',
    releaseYear: '2017', rating: 8.0, genres: ['Sci-Fi', 'Drama'], runtime: 164,
  },
  {
    id: 11, tmdbId: 11, title: 'Whiplash',
    posterPath: null, backdropPath: null,
    overview: 'A promising young drummer enrolls at a music conservatory where his instructor will stop at nothing to realize his ambition.',
    releaseYear: '2014', rating: 8.5, genres: ['Drama', 'Music'], runtime: 106,
  },
  {
    id: 12, tmdbId: 12, title: 'Get Out',
    posterPath: null, backdropPath: null,
    overview: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him reaches a boiling point.',
    releaseYear: '2017', rating: 7.7, genres: ['Horror', 'Thriller'], runtime: 104,
  },
  {
    id: 13, tmdbId: 13, title: 'Mad Max: Fury Road',
    posterPath: null, backdropPath: null,
    overview: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.',
    releaseYear: '2015', rating: 8.1, genres: ['Action', 'Adventure'], runtime: 120,
  },
  {
    id: 14, tmdbId: 14, title: 'The Social Network',
    posterPath: null, backdropPath: null,
    overview: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.',
    releaseYear: '2010', rating: 7.8, genres: ['Drama', 'Biography'], runtime: 120,
  },
  {
    id: 15, tmdbId: 15, title: 'Arrival',
    posterPath: null, backdropPath: null,
    overview: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    releaseYear: '2016', rating: 7.9, genres: ['Sci-Fi', 'Drama'], runtime: 116,
  },
  {
    id: 16, tmdbId: 16, title: 'Everything Everywhere All at Once',
    posterPath: null, backdropPath: null,
    overview: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.',
    releaseYear: '2022', rating: 8.0, genres: ['Action', 'Comedy'], runtime: 139,
  },
  {
    id: 17, tmdbId: 17, title: 'Oppenheimer',
    posterPath: null, backdropPath: null,
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    releaseYear: '2023', rating: 8.4, genres: ['Drama', 'Biography'], runtime: 180,
  },
  {
    id: 18, tmdbId: 18, title: 'Dune: Part Two',
    posterPath: null, backdropPath: null,
    overview: 'Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    releaseYear: '2024', rating: 8.5, genres: ['Sci-Fi', 'Adventure'], runtime: 166,
  },
  {
    id: 19, tmdbId: 19, title: 'The Godfather',
    posterPath: null, backdropPath: null,
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
    releaseYear: '1972', rating: 9.2, genres: ['Crime', 'Drama'], runtime: 175,
  },
  {
    id: 20, tmdbId: 20, title: 'Fight Club',
    posterPath: null, backdropPath: null,
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    releaseYear: '1999', rating: 8.8, genres: ['Drama'], runtime: 139,
  },
]

export async function getPopularMovies(): Promise<Movie[]> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return MOCK_MOVIES
  }

  try {
    const res = await fetch(
      `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch movies')
    const data = await res.json()

    return data.results.map((m: any) => ({
      id: m.id,
      tmdbId: m.id,
      title: m.title,
      posterPath: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
      backdropPath: m.backdrop_path ? `${TMDB_BACKDROP}${m.backdrop_path}` : null,
      overview: m.overview,
      releaseYear: m.release_date ? m.release_date.split('-')[0] : 'N/A',
      rating: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 0,
      genres: [],
      runtime: null,
    }))
  } catch {
    return MOCK_MOVIES
  }
}

export async function getMovieDetails(tmdbId: number): Promise<Movie | null> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return MOCK_MOVIES.find((m) => m.tmdbId === tmdbId) || null
  }

  try {
    const res = await fetch(
      `${TMDB_BASE}/movie/${tmdbId}?api_key=${API_KEY}&language=en-US`,
    )
    if (!res.ok) return null
    const m = await res.json()

    return {
      id: m.id,
      tmdbId: m.id,
      title: m.title,
      posterPath: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
      backdropPath: m.backdrop_path ? `${TMDB_BACKDROP}${m.backdrop_path}` : null,
      overview: m.overview,
      releaseYear: m.release_date ? m.release_date.split('-')[0] : 'N/A',
      rating: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 0,
      genres: m.genres?.map((g: any) => g.name) || [],
      runtime: m.runtime,
    }
  } catch {
    return MOCK_MOVIES.find((m) => m.tmdbId === tmdbId) || null
  }
}
