'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  token: string
  initialCount: number
}

export default function CandleLighter({ token, initialCount }: Props) {
  const [count, setCount] = useState(initialCount)
  const [lit, setLit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sparks, setSparks] = useState<number[]>([])

  const lightCandle = async () => {
    if (lit || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/memorial/${token}/candle`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json() as { candleCount: number }
        setCount(data.candleCount)
        setLit(true)
        setSparks([1, 2, 3, 4, 5])
        setTimeout(() => setSparks([]), 800)
      }
    } catch { /* noop */ }
    finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Candle */}
        <button
          onClick={lightCandle}
          disabled={lit || loading}
          className="relative flex flex-col items-center focus:outline-none group"
          aria-label="Light a candle"
        >
          {/* Flame */}
          <AnimatePresence>
            {lit && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                className="relative mb-1"
              >
                <div className="w-4 h-7 relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 80%, #fde68a 0%, #f59e0b 40%, #ea580c 80%, transparent 100%)',
                      animation: 'flicker 1.5s ease-in-out infinite alternate',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spark particles */}
          <AnimatePresence>
            {sparks.map((s) => (
              <motion.div
                key={s}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: (s % 3 - 1) * 20,
                  y: -30,
                  scale: 0,
                }}
                transition={{ duration: 0.6, delay: s * 0.05 }}
                className="absolute top-0 w-1.5 h-1.5 rounded-full bg-amber-400"
                style={{ left: '50%', marginLeft: -3 }}
              />
            ))}
          </AnimatePresence>

          {/* Candle body */}
          <div className={`relative transition-all duration-500 ${lit ? 'group-hover:scale-100' : 'group-hover:scale-105'}`}>
            {/* Wick */}
            <div className="w-0.5 h-3 bg-gray-400 mx-auto" />
            {/* Body */}
            <div
              className={`w-10 h-20 rounded-sm transition-all duration-1000 ${
                lit
                  ? 'bg-gradient-to-b from-amber-100 to-amber-200'
                  : 'bg-gradient-to-b from-gray-200 to-gray-300'
              }`}
              style={{
                boxShadow: lit ? '0 0 20px 8px rgba(251,191,36,0.3)' : 'none',
              }}
            />
            {/* Drips */}
            {lit && (
              <div className="absolute top-4 left-1 w-1.5 h-6 rounded-full bg-amber-100/70" />
            )}
          </div>

          {/* Base */}
          <div className={`w-14 h-2 rounded-full transition-colors ${lit ? 'bg-amber-900/40' : 'bg-gray-700/40'}`} />
        </button>
      </div>

      <div className="text-center space-y-3">
        <p className="text-amber-200/80 text-sm font-light tracking-wide">
          {count === 0
            ? 'Be the first to light a candle'
            : `${count.toLocaleString()} candle${count === 1 ? '' : 's'} lit`}
        </p>
        {!lit ? (
          <button
            onClick={lightCandle}
            disabled={loading}
            className="px-6 py-2.5 rounded-full border border-amber-400/50 text-amber-300 text-sm font-medium hover:bg-amber-400/10 hover:border-amber-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Lighting…' : 'Light a candle'}
          </button>
        ) : (
          <p className="text-amber-300 text-sm font-medium">Your candle is lit 🕯️</p>
        )}
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-1deg); opacity: 0.95; }
          25% { transform: scaleX(0.9) scaleY(1.05) rotate(1deg); opacity: 1; }
          50% { transform: scaleX(1.05) scaleY(0.97) rotate(-0.5deg); opacity: 0.9; }
          75% { transform: scaleX(0.95) scaleY(1.03) rotate(1.5deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
