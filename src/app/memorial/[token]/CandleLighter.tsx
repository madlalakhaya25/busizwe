'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  token: string
  initialCount: number
  shareUrl: string
  shareText: string
  fullName: string
}

const STORAGE_KEY = (token: string) => `bbs-candle-${token}`

export default function CandleLighter({ token, initialCount, shareUrl, shareText, fullName }: Props) {
  const [count, setCount] = useState(initialCount)
  const [lit, setLit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Restore lit state from localStorage so refresh doesn't reset it
  useEffect(() => {
    setLit(localStorage.getItem(STORAGE_KEY(token)) === '1')
  }, [token])

  const lightCandle = async () => {
    if (lit || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/memorial/${token}/candle`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json() as { candleCount: number }
        setCount(data.candleCount)
        setLit(true)
        localStorage.setItem(STORAGE_KEY(token), '1')
      }
    } catch { /* noop */ }
    finally { setLoading(false) }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Candle */}
      <button
        onClick={lightCandle}
        disabled={lit || loading}
        className="relative flex flex-col items-center focus:outline-none group"
        aria-label={lit ? 'Candle lit' : 'Light a candle'}
      >
        <AnimatePresence>
          {lit && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className="mb-1 w-4 h-7 relative"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 50% 80%, #fde68a 0%, #f59e0b 40%, #ea580c 80%, transparent 100%)',
                  animation: 'flicker 1.5s ease-in-out infinite alternate',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative transition-all ${lit ? '' : 'group-hover:scale-105'}`}>
          <div className="w-0.5 h-3 bg-gray-400 mx-auto" />
          <div
            className={`w-10 h-20 rounded-sm transition-all duration-1000 ${
              lit ? 'bg-gradient-to-b from-amber-100 to-amber-200' : 'bg-gradient-to-b from-gray-200 to-gray-300'
            }`}
            style={{ boxShadow: lit ? '0 0 20px 8px rgba(251,191,36,0.3)' : 'none' }}
          />
          {lit && <div className="absolute top-4 left-1 w-1.5 h-6 rounded-full bg-amber-100/70" />}
        </div>

        <div className={`w-14 h-2 rounded-full transition-colors ${lit ? 'bg-amber-900/40' : 'bg-gray-700/40'}`} />
      </button>

      {/* Count + action */}
      <div className="text-center space-y-3">
        <p className="text-amber-200/80 text-sm font-light tracking-wide">
          {count === 0 ? 'Be the first to light a candle' : `${count.toLocaleString()} candle${count === 1 ? '' : 's'} lit`}
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

      {/* Share — moved here from server component so onClick works */}
      <div className="flex flex-col items-center gap-3 w-full">
        <p className="text-amber-200/40 text-xs uppercase tracking-widest">Share this memorial</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={shareText}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 text-green-400 text-sm hover:bg-green-500/10 transition-all"
            aria-label={`Share ${fullName}'s memorial on WhatsApp`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.14 1.546 5.876L0 24l6.311-1.654A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.816 9.816 0 01-5.028-1.381l-.36-.216-3.748.982.998-3.657-.235-.374A9.817 9.817 0 012.182 12C2.182 6.567 6.568 2.182 12 2.182c5.434 0 9.818 4.385 9.818 9.818 0 5.434-4.384 9.818-9.818 9.818z"/>
            </svg>
            WhatsApp
          </a>
          <button
            onClick={copyLink}
            className="px-4 py-2 rounded-full border border-amber-400/30 text-amber-300/70 text-sm hover:bg-amber-400/10 transition-all"
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
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
