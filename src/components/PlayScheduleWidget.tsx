import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Trophy, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { GlassMode } from '../types';

interface PlayScheduleWidgetProps {
  glassMode?: GlassMode;
}

export const PlayScheduleWidget: React.FC<PlayScheduleWidgetProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15, type: 'spring', stiffness: 350, damping: 28 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="fantasy-glass-container p-4 sm:p-5 rounded-[30px] relative overflow-hidden shadow-[0_16px_40px_rgba(244,114,182,0.25)]"
    >
      {/* Specular rainbow sheen */}
      <div className="absolute top-0 left-0 right-0 h-1 rainbow-shimmer pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            onClick={() => soundFx.playBubblePop()}
            className="w-11 h-11 rounded-[16px] candy-glass-pill border-2 border-pink-300 flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer bg-gradient-to-br from-pink-400/40 to-orange-400/40"
          >
            <span className="text-xl">🎮</span>
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md flex items-center gap-1.5">
              <span>Joyful Play Quests</span>
              <span>🎈</span>
            </h3>
            <p className="text-xs font-bold text-pink-200">Daily 2–3 Hours Fun Guaranteed!</p>
          </div>
        </div>

        <span className="text-[11px] font-black text-white bg-gradient-to-r from-pink-500 to-amber-500 px-3 py-1 rounded-full border border-white/80 backdrop-blur-md shadow-md animate-bounce">
          ⭐ Free Fun Pass
        </span>
      </div>

      {/* Reward Card */}
      <div className="p-3.5 sm:p-4 rounded-[22px] candy-glass-card border-2 border-pink-300/70 shadow-md flex items-center justify-between gap-3 relative overflow-hidden bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-amber-500/20">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 18, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={() => soundFx.playAchievement()}
            className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-white flex items-center justify-center text-white shadow-lg cursor-pointer flex-shrink-0"
          >
            <Trophy className="w-5 h-5 drop-shadow-md fill-white text-white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-yellow-300 font-mono drop-shadow-sm">
                1:30 PM – 2:30 PM
              </span>
              <span className="text-[10px] font-black text-white bg-pink-500/80 px-2 py-0.5 rounded-full border border-white/70 shadow-sm">
                ⭐ 1h Quest
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-white mt-0.5 drop-shadow-sm">
              Super Mario, Lego or Bicycle Fun!
            </p>
            <p className="text-[10px] sm:text-[11px] font-bold text-pink-100">
              Refresh your brain with joy & laughter
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => soundFx.playAchievement()}
          className="px-3.5 py-2 rounded-[16px] bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-black shadow-md border border-white flex items-center gap-1 flex-shrink-0 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Claim Joy!
        </motion.button>
      </div>
    </motion.div>
  );
};
