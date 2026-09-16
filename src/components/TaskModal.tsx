import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Play, Pause, RotateCcw, CheckCircle2, Circle, 
  Sparkles, Clock, Calendar, Star, Trophy, Heart 
} from 'lucide-react';
import { ScheduleItem } from '../types';
import { soundFx } from '../utils/audio';

interface TaskModalProps {
  task: ScheduleItem | null;
  dayTitle: string;
  isOpen?: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  dayTitle,
  isOpen = true,
  isCompleted,
  onClose,
  onToggleComplete,
}) => {
  if (!task || !isOpen) return null;

  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins Pomodoro
  const [isActive, setIsActive] = useState(false);
  const [totalDuration] = useState(25 * 60);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      soundFx.playAchievement();
      setIsActive(false);
      onToggleComplete(task.id);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onToggleComplete, task.id]);

  const handleToggleTimer = () => {
    soundFx.playFairyTwinkle();
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    soundFx.playBubblePop();
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Fantasy Magical Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window with Fantasy Candy Glass Material */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="relative w-full max-w-lg fantasy-glass-container p-6 sm:p-8 rounded-[36px] shadow-[0_28px_80px_rgba(236,72,153,0.5)] border-2 border-pink-300/80 overflow-hidden z-10 bg-gradient-to-b from-purple-900/60 via-slate-900/70 to-indigo-950/70"
        >
          {/* Top rainbow sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-shimmer pointer-events-none" />

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              soundFx.playBubblePop();
              onClose();
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full candy-glass-pill flex items-center justify-center text-white hover:text-yellow-300 transition-colors border-2 border-white/80 shadow-md cursor-pointer"
          >
            <X className="w-5 h-5 font-bold" />
          </motion.button>

          {/* Header info */}
          <div className="flex items-center gap-2 text-xs font-black text-pink-200 uppercase tracking-widest mb-1.5">
            <span className="flex items-center gap-1">📅 {dayTitle}</span>
            <span>•</span>
            <span className="flex items-center gap-1">⏰ {task.time}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md flex items-center gap-2">
            <span>{task.title}</span>
            <span>✨</span>
          </h3>
          {task.details && (
            <p className="text-sm font-bold text-pink-100 mt-1 drop-shadow-sm">
              {task.details}
            </p>
          )}

          {/* Focus Timer Circle Glass HUD */}
          <div className="my-6 p-6 rounded-[28px] candy-glass-card border-2 border-purple-300/80 shadow-inner flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-indigo-500/20">
            {/* Top sheen */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-[28px]" />

            {/* Glowing timer ring */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-3">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  className="stroke-white/20"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#timerGradient)"
                  strokeWidth="8"
                  strokeDasharray={502}
                  strokeDashoffset={502 - (502 * progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(244,114,182,0.9))',
                  }}
                />
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-yellow-300 font-mono tracking-tight drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)]">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[11px] font-black text-pink-200 uppercase tracking-widest mt-1">
                  {isActive ? '🚀 Quest in Progress!' : '⭐ Ready to Start!'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3 relative z-10">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleToggleTimer}
                className={`px-7 py-3 rounded-[22px] text-xs font-black flex items-center gap-2 transition-all shadow-lg border-2 border-white cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950'
                    : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isActive ? 'Pause Timer' : 'Start Focus Quest!'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleResetTimer}
                className="p-3 rounded-[20px] candy-glass-pill text-white hover:text-yellow-300 transition-all border-2 border-white/80 shadow-md cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4 font-bold" />
              </motion.button>
            </div>
          </div>

          {/* Complete Task Trigger */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (!isCompleted) {
                  soundFx.playAchievement();
                } else {
                  soundFx.playBubblePop();
                }
                onToggleComplete(task.id);
              }}
              className={`flex-1 py-3.5 px-5 rounded-[24px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all border-2 cursor-pointer shadow-lg ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 border-white shadow-[0_0_20px_#34d399]'
                  : 'candy-glass-pill text-white border-white/80 hover:bg-white/30'
              }`}
            >
              {isCompleted ? (
                <>
                  <Trophy className="w-5 h-5 fill-slate-950" />
                  <span>Quest Completed! ⭐ (Click to undo)</span>
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span>Claim Quest Victory & Stars!</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
