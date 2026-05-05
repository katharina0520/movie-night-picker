import type { Movie } from '@/lib/types'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p/w500'
const TMDB_BACKDROP = 'https://image.tmdb.org/t/p/original'

const API_KEY = process.env.TMDB_API_KEY || ''

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
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
}

export async function getMovieDetails(tmdbId: number): Promise<Movie | null> {
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
}

export function getPosterUrl(path: string | null, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
