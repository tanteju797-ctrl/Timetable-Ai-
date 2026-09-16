import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Flame, Sparkles } from 'lucide-react';
import { STUDY_TIPS } from '../data/roadmapData';
import { soundFx } from '../utils/audio';
import { GlassMode } from '../types';

interface TipsWidgetProps {
  glassMode?: GlassMode;
}

export const TipsWidget: React.FC<TipsWidgetProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, type: 'spring', stiffness: 350, damping: 28 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="fantasy-glass-container p-4 sm:p-5 rounded-[30px] relative overflow-hidden shadow-[0_16px_40px_rgba(234,179,8,0.25)]"
    >
      {/* Specular rainbow top highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 rainbow-shimmer pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            onClick={() => soundFx.playFairyTwinkle()}
            className="w-11 h-11 rounded-[16px] candy-glass-pill border-2 border-yellow-300 flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer bg-gradient-to-br from-yellow-400/40 to-amber-500/40"
          >
            <span className="text-xl">💡</span>
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md flex items-center gap-1.5">
              <span>Super Kid Study Secrets</span>
              <span>✨</span>
            </h3>
            <p className="text-xs font-bold text-yellow-200">Fun Habits For Top Star Marks!</p>
          </div>
        </div>

        <span className="text-[11px] font-black text-white bg-gradient-to-r from-amber-500 to-rose-500 px-3 py-1 rounded-full border border-white/80 backdrop-blur-md shadow-md flex items-center gap-1 animate-pulse">
          <Flame className="w-3.5 h-3.5 text-yellow-200" /> Super Powers
        </span>
      </div>

      {/* Grid of 4 tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {STUDY_TIPS.map((tip, idx) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.04, type: 'spring', stiffness: 350, damping: 25 }}
            whileHover={{ scale: 1.04, y: -2 }}
            onClick={() => soundFx.playAchievement()}
            className="candy-glass-card p-3.5 rounded-[20px] border-2 border-pink-200/60 transition-all flex items-start gap-3 cursor-pointer select-none group bg-gradient-to-br from-pink-500/15 via-purple-500/10 to-sky-500/15"
          >
            <div className="w-8 h-8 rounded-[12px] bg-white/40 border border-white text-white flex items-center justify-center flex-shrink-0 text-base shadow-sm group-hover:scale-115 transition-transform">
              {tip.icon}
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-black text-white leading-tight group-hover:text-yellow-200 transition-colors drop-shadow-sm flex items-center gap-1">
                <span>{tip.title}</span>
              </h4>
              <p className="text-[10px] sm:text-[11px] font-bold text-pink-100 mt-1 leading-snug">
                {tip.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
