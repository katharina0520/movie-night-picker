import { NextResponse } from 'next/server'
import { getPopularMovies } from '@/lib/tmdb'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const movies = await getPopularMovies()

    for (const movie of movies) {
      await prisma.movie.upsert({
        where: { tmdbId: movie.tmdbId },
        update: {
          title: movie.title,
          posterPath: movie.posterPath,
          backdropPath: movie.backdropPath,
          overview: movie.overview,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
          genres: movie.genres.join(','),
          runtime: movie.runtime,
        },
        create: {
          id: movie.tmdbId,
          tmdbId: movie.tmdbId,
          title: movie.title,
          posterPath: movie.posterPath,
          backdropPath: movie.backdropPath,
          overview: movie.overview,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
          genres: movie.genres.join(','),
          runtime: movie.runtime,
        },
      })
    }

    return NextResponse.json(movies)
  } catch (error) {
    console.error('Failed to fetch movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 },
    )
  }
}
