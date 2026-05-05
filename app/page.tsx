'use client'

import { useState, useEffect } from 'react'
import { SwipeView } from '@/components/SwipeView'
import { useAppStore } from '@/lib/store'
import type { Movie, User } from '@/lib/types'

type Screen = 'setup' | 'swipe'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('setup')
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const showToast = useAppStore((s) => s.showToast)
  const setDeck = useAppStore((s) => s.setDeck)

  const createRoom = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), roomId: '' }),
      })
      const data = await res.json()
      setUser(data.user)
      setRoomCode(data.user.roomId)
      await loadMovies()
      setScreen('swipe')
    } catch (e) {
      showToast('Failed to create room', 2000)
    }
    setLoading(false)
  }

  const joinRoom = async () => {
    if (!name.trim() || !roomCode.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), roomId: roomCode.trim().toUpperCase() }),
      })
      if (!res.ok) {
        showToast('Room not found', 2000)
        setLoading(false)
        return
      }
      const data = await res.json()
      setUser(data.user)
      await loadMovies()
      setScreen('swipe')
    } catch (e) {
      showToast('Failed to join room', 2000)
    }
    setLoading(false)
  }

  const loadMovies = async () => {
    try {
      const res = await fetch('/api/movies')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      if (Array.isArray(data)) {
        setDeck(data)
      } else {
        setDeck([])
      }
    } catch (e) {
      showToast('Failed to load movies', 2000)
      setDeck([])
    }
  }

  if (screen === 'swipe') {
    return (
      <div className="min-h-[100dvh] bg-[#0d0d0d]">
        {user && (
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-warm to-red-400 bg-clip-text text-transparent">
                🎬 Movie Night
              </h1>
              <p className="text-xs text-ink-400">
                {user.name} · Room: <span className="font-mono text-white">{roomCode}</span>
              </p>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(roomCode)}
              className="text-xs bg-surface-soft px-3 py-1.5 rounded-lg text-white"
            >
              Copy Code
            </button>
          </div>
        )}
        <SwipeView />
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#0d0d0d] flex flex-col items-center justify-center px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-warm to-red-400 bg-clip-text text-transparent">
          🎬 Movie Night
        </h1>
        <p className="text-ink-400">Swipe with friends. Find your perfect movie.</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-border rounded-xl text-white outline-none focus:border-warm"
        />

        <button
          onClick={createRoom}
          disabled={loading || !name.trim()}
          className="w-full py-3 bg-warm text-white rounded-xl font-medium disabled:opacity-50 active:scale-[0.98] transition"
        >
          {loading ? 'Creating...' : 'Create Room'}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-ink-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <input
          type="text"
          placeholder="Room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={6}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-border rounded-xl text-white outline-none focus:border-warm font-mono tracking-widest text-center"
        />

        <button
          onClick={joinRoom}
          disabled={loading || !name.trim() || !roomCode.trim()}
          className="w-full py-3 bg-surface-soft border border-border text-white rounded-xl font-medium disabled:opacity-50 active:scale-[0.98] transition"
        >
          {loading ? 'Joining...' : 'Join Room'}
        </button>
      </div>
    </div>
  )
}
