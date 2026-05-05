'use client'

import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { useAppStore } from '@/lib/store'
import type { Movie } from '@/lib/types'

export function SwipeView() {
  const showToast = useAppStore((s) => s.showToast)
  const deck = useAppStore((s) => s.deck)
  const advanceDeck = useAppStore((s) => s.advanceDeck)

  const [index, setIndex] = useState(0)
  const [programmaticDir, setProgrammaticDir] = useState<'left' | 'right' | null>(null)

  const remaining = deck.slice(index, index + 3)
  const top = remaining[0]

  const advance = async (dir: 'left' | 'right') => {
    if (!top) return
    if (dir === 'right') {
      showToast('🎬 Added to watch list!', 1500)
    }
    setIndex((i) => i + 1)
    advanceDeck()
    setProgrammaticDir(null)
  }

  const buttonSwipe = (dir: 'left' | 'right') => {
    if (!top) return
    setProgrammaticDir(dir)
  }

  useEffect(() => {
    if (!top) return
    const onKey = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)
      ) {
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        buttonSwipe('right')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        buttonSwipe('left')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [top?.id])

  const count = deck.length - index

  if (!top && deck.length === 0) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🍿</div>
        <h2 className="text-2xl font-semibold mb-2">No movies to show</h2>
        <p className="text-ink-400 mb-6">Create or join a room to get started</p>
      </div>
    )
  }

  if (!top && deck.length > 0) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-semibold mb-2">All caught up!</h2>
        <p className="text-ink-400">Check matches or swipe more</p>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0d0d0d]">
      <div className="flex-1 px-5 pb-[120px] flex flex-col">
        <div
          className="relative w-full mt-4 mx-auto"
          style={{
            maxWidth: 380,
            aspectRatio: '4 / 5',
            maxHeight: 'calc(100dvh - 280px)',
          }}
        >
          {remaining.map((movie, i) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isTop={i === 0}
              stackIndex={i}
              programmaticDir={i === 0 ? programmaticDir : null}
              onSwipe={advance}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-7 mt-8">
          <button
            type="button"
            onClick={() => buttonSwipe('left')}
            className="w-16 h-16 rounded-full bg-surface-soft border border-border flex items-center justify-center text-white active:scale-90 transition-transform duration-150 ease-out shadow-soft"
            aria-label="Skip"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => buttonSwipe('right')}
            className="w-16 h-16 rounded-full bg-warm flex items-center justify-center text-white active:scale-90 transition-transform duration-150 ease-out shadow-warm"
            aria-label="Watch"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>

        <p className="text-center text-[13px] text-ink-400 mt-4 font-medium uppercase tracking-[0.06em] tabular-nums">
          {count} left in your deck
        </p>
      </div>
    </div>
  )
}
