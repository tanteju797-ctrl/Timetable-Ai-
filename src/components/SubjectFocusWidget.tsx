import React from 'react';
import { motion } from 'motion/react';
import { Target, Sparkles } from 'lucide-react';
import { SUBJECT_FOCUS_AREAS } from '../data/roadmapData';
import { soundFx } from '../utils/audio';
import { GlassMode } from '../types';

interface SubjectFocusWidgetProps {
  activeFilter: string | null;
  onSelectFilter: (subject: string | null) => void;
  glassMode?: GlassMode;
}

export const SubjectFocusWidget: React.FC<SubjectFocusWidgetProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 350, damping: 28 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="fantasy-glass-container p-4 sm:p-5 rounded-[30px] relative overflow-hidden shadow-[0_16px_40px_rgba(59,130,246,0.25)]"
    >
      {/* Specular rainbow top highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 rainbow-shimmer pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            onClick={() => soundFx.playFairyTwinkle()}
            className="w-11 h-11 rounded-[16px] candy-glass-pill border-2 border-cyan-300 flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer bg-gradient-to-br from-cyan-400/40 to-blue-500/40"
          >
            <span className="text-xl">🔮</span>
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md flex items-center gap-1.5">
              <span>Subject Focus Realms</span>
              <span>⭐</span>
            </h3>
            <p className="text-xs font-bold text-cyan-200">Earn Gold Stars & Marks</p>
          </div>
        </div>

        <span className="text-[11px] font-black text-white bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 rounded-full border border-white/80 backdrop-blur-md shadow-md animate-pulse">
          🏆 Core Power
        </span>
      </div>

      {/* Grid of Subject Focus Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
        {SUBJECT_FOCUS_AREAS.map((subject, idx) => {
          const isSelected = activeFilter === subject.name.toLowerCase();

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, type: 'spring', stiffness: 350, damping: 25 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundFx.playFairyTwinkle();
                if (isSelected) {
                  onSelectFilter(null);
                } else {
                  onSelectFilter(subject.name.toLowerCase());
                }
              }}
              className={`p-3.5 rounded-[22px] border-2 backdrop-blur-xl transition-all cursor-pointer select-none flex flex-col justify-between relative overflow-hidden shadow-md bg-gradient-to-br ${subject.color} ${subject.borderColor} ${
                isSelected
                  ? 'candy-glass-active ring-2 ring-white shadow-[0_12px_32px_rgba(236,72,153,0.6)]'
                  : 'hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]'
              }`}
            >
              {/* Top sheen */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[22px]" />

              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${subject.badgeColor} border border-white/80 shadow-sm`}
                >
                  {subject.weightage}
                </span>
                <span className="text-xl">{subject.icon}</span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                  {subject.name}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-bold mt-0.5 leading-snug text-pink-100">
                  {subject.topics}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/40 flex items-center justify-between">
                <span className={`text-[10px] font-black ${isSelected ? 'text-yellow-300' : 'text-white/90'}`}>
                  {isSelected ? '✓ Active Quest' : '✨ Tap to filter'}
                </span>
                <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-yellow-300 animate-spin' : 'text-white/70'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
