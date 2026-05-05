'use client'

import { useEffect, useRef, useState } from 'react'
import type { Movie } from '@/lib/types'

type Props = {
  movie: Movie
  isTop: boolean
  stackIndex: number
  programmaticDir: 'left' | 'right' | null
  onSwipe: (dir: 'left' | 'right') => void
}

const SWIPE_THRESHOLD = 100
const VELOCITY_THRESHOLD = 0.6

export function MovieCard({
  movie,
  isTop,
  stackIndex,
  programmaticDir,
  onSwipe,
}: Props) {
  const [x, setX] = useState(0)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const [entered, setEntered] = useState(false)
  const dragRef = useRef<{
    startX: number
    startTime: number
    lastX: number
    lastTime: number
    velocity: number
    pointerId: number
  } | null>(null)

  const onSwipeRef = useRef(onSwipe)
  onSwipeRef.current = onSwipe

  const exitingRef = useRef<'left' | 'right' | null>(null)

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    if (!isTop || !programmaticDir || exitingRef.current) return
    exitingRef.current = programmaticDir
    setExiting(programmaticDir)
    setX(programmaticDir === 'right' ? 600 : -600)
    const t = setTimeout(() => onSwipeRef.current(programmaticDir), 360)
    return () => clearTimeout(t)
  }, [programmaticDir, isTop])

  const beginExit = (dir: 'left' | 'right') => {
    exitingRef.current = dir
    setExiting(dir)
    setX(dir === 'right' ? 600 : -600)
    setTimeout(() => onSwipeRef.current(dir), 360)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isTop || exiting) return
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    dragRef.current = {
      startX: e.clientX,
      startTime: performance.now(),
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      pointerId: e.pointerId,
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d || d.pointerId !== e.pointerId) return
    const now = performance.now()
    const dt = Math.max(1, now - d.lastTime)
    d.velocity = (e.clientX - d.lastX) / dt
    d.lastX = e.clientX
    d.lastTime = now
    setX(e.clientX - d.startX)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d || d.pointerId !== e.pointerId) return
    dragRef.current = null
    const offset = e.clientX - d.startX
    const v = d.velocity
    if (offset > SWIPE_THRESHOLD || v > VELOCITY_THRESHOLD) {
      beginExit('right')
    } else if (offset < -SWIPE_THRESHOLD || v < -VELOCITY_THRESHOLD) {
      beginExit('left')
    } else {
      setX(0)
    }
  }

  const rotate = clamp(x / 25, -8, 8)
  const cardOpacity =
    Math.abs(x) > 100 ? Math.max(0.4, 1 - (Math.abs(x) - 100) / 200) : 1
  const watchProgress = clamp((x - 30) / 110, 0, 1)
  const skipProgress = clamp((-x - 30) / 110, 0, 1)

  const stackOffsetY = stackIndex * 12
  const stackScale = 1 - stackIndex * 0.05
  const stackOpacity = isTop ? 1 : Math.max(0, 1 - stackIndex * 0.25)

  const transition = exiting
    ? 'transform 360ms cubic-bezier(0.23,1,0.32,1), opacity 360ms ease-out'
    : dragRef.current
      ? 'none'
      : 'transform 280ms cubic-bezier(0.23,1,0.32,1), opacity 220ms ease-out'

  const baseOpacity = entered ? (exiting ? 0 : isTop ? cardOpacity : stackOpacity) : 0

  const transform = exiting
    ? `translate3d(${x}px, ${stackOffsetY}px, 0) rotate(${exiting === 'right' ? 12 : -12}deg) scale(${stackScale})`
    : `translate3d(${isTop ? x : 0}px, ${entered ? stackOffsetY : stackOffsetY + 16}px, 0) rotate(${isTop ? rotate : 0}deg) scale(${entered ? stackScale : stackScale - 0.04})`

  const posterUrl = movie.posterPath || movie.backdropPath
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''
  const genres = movie.genres?.slice(0, 2).join(' · ') || ''

  return (
    <div
      className="absolute inset-0 select-none touch-none"
      style={{
        zIndex: 10 - stackIndex,
        transform,
        opacity: baseOpacity,
        transition,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="w-full h-full bg-[#1a1a1a] rounded-3xl border border-border overflow-hidden flex flex-col shadow-soft">
        <div className="relative flex-1 bg-surface-soft overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🎬
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          {isTop && (
            <>
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-green-500 mix-blend-multiply"
                style={{ opacity: watchProgress * 0.35 }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-red-600 mix-blend-multiply"
                style={{ opacity: skipProgress * 0.45 }}
              />

              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  opacity: Math.max(watchProgress, skipProgress),
                  transform: `translate(-50%, ${(1 - Math.max(watchProgress, skipProgress)) * -8}px)`,
                  transition: dragRef.current ? 'none' : 'opacity 200ms ease-out, transform 200ms ease-out',
                }}
              >
                {watchProgress > skipProgress ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-[13px] font-semibold tracking-wide uppercase px-3 h-8 rounded-full shadow-warm">
                    Watch
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[13px] font-semibold tracking-wide uppercase px-3 h-8 rounded-full">
                    Skip
                  </span>
                )}
              </div>
            </>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-white leading-tight mb-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-[13px]">
              <span className="text-yellow-400 font-medium">★ {movie.rating}</span>
              {movie.releaseYear && <span>{movie.releaseYear}</span>}
              {runtime && <span>· {runtime}</span>}
            </div>
          </div>
        </div>

        <div className="p-5 pb-6">
          <p className="text-ink-400 text-[13px] leading-relaxed line-clamp-3">
            {movie.overview || 'No overview available.'}
          </p>
          {genres && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {movie.genres?.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-surface-soft text-ink-400 font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}
