import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Room code required' }, { status: 400 })
  }

  const room = await prisma.room.findUnique({
    where: { id: code },
    include: { users: true },
  })

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: room.id,
    users: room.users.map((u) => ({ id: u.id, name: u.name })),
  })
}
