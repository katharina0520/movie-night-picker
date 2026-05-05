import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRoomCode } from '@/lib/utils'

export async function POST(request: Request) {
  const { name, roomId } = await request.json()

  let roomIdToUse = roomId
  if (!roomIdToUse) {
    roomIdToUse = generateRoomCode()
    await prisma.room.create({
      data: { id: roomIdToUse },
    })
  } else {
    const room = await prisma.room.findUnique({ where: { id: roomIdToUse } })
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 },
      )
    }
  }

  const user = await prisma.user.upsert({
    where: {
      name_roomId: { name, roomId: roomIdToUse },
    },
    update: {},
    create: {
      name,
      roomId: roomIdToUse,
    },
  })

  return NextResponse.json({ user: { id: user.id, name: user.name, roomId: user.roomId } })
}
