import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassMode } from '../types';

interface GlassBackgroundProps {
  glassMode: GlassMode;
  interactiveFx?: boolean;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji?: string;
}

export const GlassBackground: React.FC<GlassBackgroundProps> = ({
  glassMode,
  interactiveFx = true,
}) => {
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);
  const [bubbleList, setBubbleList] = useState<Array<{ id: number; left: number; size: number; delay: number; duration: number; color: string }>>([]);

  // Generate floating bubbles
  useEffect(() => {
    const colors = [
      'rgba(244, 114, 182, 0.45)', // pink
      'rgba(168, 85, 247, 0.45)', // purple
      'rgba(56, 189, 248, 0.45)',  // cyan
      'rgba(251, 191, 36, 0.45)',  // amber
      'rgba(52, 211, 153, 0.45)',  // emerald
    ];
    const initialBubbles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 45 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 12 + 10,
      color: colors[i % colors.length],
    }));
    setBubbleList(initialBubbles);
  }, []);

  // Handle interactive magical pointer sparkles
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveFx) return;
    if (Math.random() > 0.4) return; // rate limit

    const colors = ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24', '#34d399', '#ffffff'];
    const emojis = ['✨', '⭐', '🎈', '💖', '🍭', '🌟', '🦄'];
    const newSparkle: SparkleItem = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 16 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: Math.random() > 0.6 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
    };

    setSparkles((prev) => [...prev.slice(-15), newSparkle]);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* 1. Magical Multi-Color Fantasy Cosmic Gradient Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at top left, #3b0764 0%, #1e1b4b 30%, #0f172a 60%, #172554 100%)',
        }}
      />

      {/* 2. Floating Whimsical Fantasy Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full filter blur-[90px] opacity-70"
        style={{ background: 'radial-gradient(circle, #ec4899 0%, #a855f7 60%, transparent 80%)' }}
      />

      <motion.div
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.3, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/4 -right-24 w-[520px] h-[520px] rounded-full filter blur-[100px] opacity-65"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #3b82f6 50%, #6366f1 80%, transparent 90%)' }}
      />

      <motion.div
        animate={{
          x: [0, 60, -70, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-28 left-1/3 w-[550px] h-[550px] rounded-full filter blur-[110px] opacity-60"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f43f5e 50%, #8b5cf6 80%, transparent 90%)' }}
      />

      <motion.div
        animate={{
          x: [0, -50, 60, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-2/3 right-1/4 w-[420px] h-[420px] rounded-full filter blur-[85px] opacity-55"
        style={{ background: 'radial-gradient(circle, #34d399 0%, #06b6d4 60%, transparent 85%)' }}
      />

      {/* 3. Shimmering Rainbow Aurora Wave */}
      <motion.div
        animate={{
          opacity: [0.35, 0.6, 0.35],
          rotate: [-2, 3, -2],
          scaleY: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-1/3 h-96 filter blur-[70px] pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(90deg, rgba(244,114,182,0.4) 0%, rgba(168,85,247,0.4) 25%, rgba(56,189,248,0.4) 50%, rgba(52,211,153,0.4) 75%, rgba(251,191,36,0.4) 100%)',
        }}
      />

      {/* 4. Drifting Fantasy Glass Bubbles */}
      {bubbleList.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.8, 0.9, 0],
            x: [0, Math.sin(b.id) * 35, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear',
          }}
          className="absolute rounded-full border border-white/70 shadow-lg"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${b.color} 55%, rgba(255,255,255,0.2) 100%)`,
            boxShadow: `0 0 15px ${b.color}, inset 0 2px 4px rgba(255,255,255,0.9)`,
            backdropFilter: 'blur(3px)',
          }}
        >
          {/* Bubble reflection highlight */}
          <div className="w-2 h-2 rounded-full bg-white/90 absolute top-1.5 left-2" />
        </motion.div>
      ))}

      {/* 5. Twinkling Stars in Background */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${(i * 19) % 94}%`,
            left: `${(i * 27) % 96}%`,
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            animationDelay: `${(i * 0.4) % 3}s`,
            boxShadow: '0 0 8px #ffffff',
          }}
        />
      ))}

      {/* 6. Interactive Pointer Sparkles */}
      <AnimatePresence>
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 1, scale: 0.2, x: sp.x, y: sp.y }}
            animate={{
              opacity: 0,
              scale: 1.6,
              y: sp.y - 30,
              rotate: Math.random() * 60 - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold"
            style={{
              color: sp.color,
              textShadow: `0 0 8px ${sp.color}, 0 0 15px #fff`,
            }}
          >
            {sp.emoji ? (
              <span>{sp.emoji}</span>
            ) : (
              <span
                className="inline-block rounded-full"
                style={{
                  width: `${sp.size}px`,
                  height: `${sp.size}px`,
                  background: `radial-gradient(circle, #ffffff 0%, ${sp.color} 70%, transparent 100%)`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 7. Overlay Mode Texture Filter */}
      {glassMode === 'frosted' && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[3px] pointer-events-none" />
      )}
    </div>
  );
};
