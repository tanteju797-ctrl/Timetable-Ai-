import React from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';

interface BottomPillBarProps {
  onPillClick?: (tag: string) => void;
}

export const BottomPillBar: React.FC<BottomPillBarProps> = ({ onPillClick }) => {
  const pills = [
    { id: 'discipline', label: 'Super Focus', icon: '🎯', color: 'from-pink-500/30 to-purple-500/30 border-pink-300' },
    { id: 'practice', label: 'Magic Quest', icon: '⚡', color: 'from-cyan-500/30 to-blue-500/30 border-cyan-300' },
    { id: 'play', label: 'Joyful Play', icon: '🎮', color: 'from-amber-500/30 to-orange-500/30 border-amber-300' },
    { id: 'success', label: 'Star Victory', icon: '🏆', color: 'from-emerald-500/30 to-teal-500/30 border-emerald-300' },
  ];

  const handleClick = (id: string) => {
    soundFx.playAchievement();
    if (onPillClick) {
      onPillClick(id);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 sm:gap-4 pt-2 pb-2 select-none">
      {pills.map((pill, idx) => (
        <motion.button
          key={pill.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.04, type: 'spring', stiffness: 350, damping: 25 }}
          whileHover={{ 
            scale: 1.08, 
            y: -3,
            transition: { type: 'spring', stiffness: 450, damping: 20 }
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleClick(pill.id)}
          className={`flex-1 candy-glass-pill py-3 px-3 rounded-[22px] cursor-pointer transition-all flex items-center justify-center gap-2 select-none group text-center shadow-md border-2 bg-gradient-to-r ${pill.color}`}
        >
          <span className="text-base group-hover:scale-130 transition-transform">{pill.icon}</span>
          <span className="text-xs sm:text-sm font-black text-white tracking-tight drop-shadow-md">
            {pill.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
