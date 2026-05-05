import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json(
      { error: 'Room ID required' },
      { status: 400 },
    )
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      users: true,
      swipes: {
        include: {
          user: true,
          movie: true,
        },
      },
    },
  })

  if (!room) {
    return NextResponse.json(
      { error: 'Room not found' },
      { status: 404 },
    )
  }

  const movieSwipes = new Map<number, Map<string, string>>()

  for (const swipe of room.swipes) {
    if (!movieSwipes.has(swipe.movieId)) {
      movieSwipes.set(swipe.movieId, new Map())
    }
    movieSwipes.get(swipe.movieId)!.set(swipe.userId, swipe.direction)
  }

  const matches: Array<{ movie: any; users: string[] }> = []

  for (const [movieId, userDirections] of movieSwipes.entries()) {
    const allUsersSwiped = room.users.every((u) => userDirections.has(u.id))
    if (!allUsersSwiped) continue

    const allRight = [...userDirections.values()].every((d) => d === 'right')
    if (!allRight) continue

    const movie = room.swipes.find((s) => s.movieId === movieId)?.movie
    if (!movie) continue

    matches.push({
      movie: {
        ...movie,
        genres: movie.genres.split(',').filter(Boolean),
      },
      users: room.users.map((u) => u.name),
    })
  }

  const totalUsers = room.users.length
  const usersWhoFinished = room.users.filter((u) => {
    const userSwipes = room.swipes.filter((s) => s.userId === u.id)
    return userSwipes.length >= 15
  }).length

  return NextResponse.json({
    matches,
    totalUsers,
    usersWhoFinished,
    allFinished: usersWhoFinished === totalUsers,
  })
}
