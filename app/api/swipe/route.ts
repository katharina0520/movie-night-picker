import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { userId, roomId, movieId, direction } = await request.json()

  if (!userId || !roomId || !movieId || !direction) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    )
  }

  const existing = await prisma.swipe.findUnique({
    where: {
      userId_movieId: { userId, movieId },
    },
  })

  if (existing) {
    return NextResponse.json(
      { error: 'Already swiped on this movie' },
      { status: 409 },
    )
  }

  const swipe = await prisma.swipe.create({
    data: {
      userId,
      roomId,
      movieId,
      direction,
    },
  })

  return NextResponse.json({ swipe })
}
