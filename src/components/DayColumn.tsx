import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, CheckCircle2, Circle, Star, Brain, Gamepad2, Utensils, 
  Briefcase, Monitor, Clock, Target, PenTool, Moon, Sun, BookOpen, 
  Calculator, Power, RotateCw, Coffee, Sparkles, Heart 
} from 'lucide-react';
import { DayPlan, ScheduleItem } from '../types';
import { GlassMode } from '../types';
import { soundFx } from '../utils/audio';

interface DayColumnProps {
  day: DayPlan;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  activeFilter: string | null;
  onSelectTaskForFocus: (task: ScheduleItem, dayTitle: string) => void;
  currentActiveTaskId?: string;
  isToday?: boolean;
  glassMode?: GlassMode;
}

export const DayColumn: React.FC<DayColumnProps> = ({
  day,
  completedTasks,
  onToggleTask,
  activeFilter,
  onSelectTaskForFocus,
  currentActiveTaskId,
  glassMode = 'clear',
}) => {
  const totalTasks = day.items.length;
  const completedCount = day.items.filter((item) => completedTasks[item.id]).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const getIcon = (type: ScheduleItem['iconType'], isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_#34d399]" />;
    }
    switch (type) {
      case 'ai':
        return <Brain className="w-5 h-5 text-purple-200" />;
      case 'play':
        return <Gamepad2 className="w-5 h-5 text-pink-200" />;
      case 'food':
        return <Utensils className="w-5 h-5 text-amber-200" />;
      case 'skills':
        return <Briefcase className="w-5 h-5 text-emerald-200" />;
      case 'ict':
        return <Monitor className="w-5 h-5 text-cyan-200" />;
      case 'break':
        return <Clock className="w-5 h-5 text-pink-200" />;
      case 'target':
        return <Target className="w-5 h-5 text-blue-200" />;
      case 'write':
        return <PenTool className="w-5 h-5 text-indigo-200" />;
      case 'moon':
        return <Moon className="w-5 h-5 text-purple-300" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-yellow-300" />;
      case 'book':
        return <BookOpen className="w-5 h-5 text-sky-200" />;
      case 'maths':
        return <Calculator className="w-5 h-5 text-emerald-300" />;
      case 'power':
        return <Power className="w-5 h-5 text-rose-300" />;
      case 'refresh':
        return <RotateCw className="w-5 h-5 text-cyan-200" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-300" />;
      default:
        return <Clock className="w-5 h-5 text-white/80" />;
    }
  };

  const getCategoryTheme = (category: string, isCompleted: boolean, isActive: boolean) => {
    if (isCompleted) {
      return 'bg-emerald-950/30 border-emerald-400/40 text-emerald-200/50 line-through opacity-70';
    }
    if (isActive) {
      return 'candy-glass-active shadow-[0_12px_36px_rgba(236,72,153,0.6)]';
    }
    switch (category) {
      case 'ai':
        return 'bg-gradient-to-r from-purple-500/25 via-indigo-500/15 to-purple-500/20 border-purple-300/60 hover:border-purple-200 hover:shadow-[0_8px_25px_rgba(168,85,247,0.35)]';
      case 'play':
        return 'bg-gradient-to-r from-pink-500/25 via-rose-500/15 to-orange-500/20 border-pink-300/60 hover:border-pink-200 hover:shadow-[0_8px_25px_rgba(244,114,182,0.35)]';
      case 'skills':
        return 'bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-emerald-500/20 border-emerald-300/60 hover:border-emerald-200 hover:shadow-[0_8px_25px_rgba(52,211,153,0.35)]';
      case 'maths':
        return 'bg-gradient-to-r from-cyan-500/25 via-sky-500/15 to-blue-500/20 border-cyan-300/60 hover:border-cyan-200 hover:shadow-[0_8px_25px_rgba(6,182,212,0.35)]';
      case 'break':
        return 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-orange-500/20 border-amber-300/60 hover:border-amber-200 hover:shadow-[0_8px_25px_rgba(251,191,36,0.3)]';
      default:
        return 'bg-gradient-to-r from-white/20 to-white/10 border-white/60 hover:border-white hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)]';
    }
  };

  const getDayHeaderColor = () => {
    if (day.id === 'day-1') return 'from-pink-500/30 via-purple-500/20 to-transparent border-pink-400/50';
    if (day.id === 'day-2') return 'from-cyan-500/30 via-blue-500/20 to-transparent border-cyan-400/50';
    return 'from-amber-500/30 via-yellow-500/20 to-transparent border-amber-400/50';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="fantasy-glass-container flex flex-col h-full rounded-[32px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      {/* Specular rainbow top highlight */}
      <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-shimmer pointer-events-none" />

      {/* Column Header */}
      <div className={`p-4 sm:p-5 border-b bg-gradient-to-b ${getDayHeaderColor()} relative`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => soundFx.playFairyTwinkle()}
              className="w-11 h-11 rounded-[18px] candy-glass-pill border-2 border-white/90 flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer bg-white/25"
            >
              {day.id === 'day-1' && <span className="text-xl">🚀</span>}
              {day.id === 'day-2' && <span className="text-xl">🌈</span>}
              {day.id === 'day-3' && <span className="text-xl">🏆</span>}
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md">
                  {day.dayLabel}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-bold text-pink-100 drop-shadow-sm">
                {day.subtitle}
              </p>
            </div>
          </div>

          {day.badge && (
            <span className="text-[11px] font-black text-white bg-gradient-to-r from-pink-500/80 to-purple-500/80 px-3 py-1 rounded-full border border-white/80 backdrop-blur-md shadow-md whitespace-nowrap animate-bounce">
              {day.badge}
            </span>
          )}
        </div>

        {/* Joyful Progress Star Bar */}
        <div className="mt-3.5 flex items-center gap-2.5">
          <div className="flex-1 h-3 rounded-full bg-black/20 overflow-hidden border-2 border-white/70 p-[1px] backdrop-blur-sm shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-yellow-300 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.9)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            />
          </div>
          <span className="text-[11px] font-black text-yellow-300 font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center gap-1">
            <span>⭐</span>
            <span>{completedCount}/{totalTasks}</span>
          </span>
        </div>
      </div>

      {/* Items Scrollable List */}
      <div className="p-3 sm:p-4 space-y-3 overflow-y-auto max-h-[640px] custom-candy-scrollbar">
        {day.items.map((item, idx) => {
          const isCompleted = !!completedTasks[item.id];
          const isFiltered = activeFilter && item.category !== activeFilter;
          const isActiveNow = currentActiveTaskId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isFiltered ? 0.25 : 1, y: 0 }}
              transition={{ 
                delay: idx * 0.015,
                type: 'spring',
                stiffness: 380,
                damping: 26 
              }}
              whileHover={{ 
                scale: isFiltered ? 0.98 : 1.025, 
                y: -2,
                transition: { type: 'spring', stiffness: 450, damping: 22 }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFx.playFairyTwinkle();
                onSelectTaskForFocus(item, day.dayLabel);
              }}
              className={`group relative p-3 sm:p-3.5 rounded-[22px] border-2 backdrop-blur-xl transition-all cursor-pointer select-none flex items-center justify-between gap-3 overflow-hidden shadow-sm ${getCategoryTheme(
                item.category,
                isCompleted,
                isActiveNow
              )}`}
            >
              {/* Specular sheen on top half of card */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-[22px]" />

              {/* Left Section: Icon and Details */}
              <div className="flex items-center gap-3 min-w-0 flex-1 relative z-10">
                {/* 3D Fantasy Glass Pill Icon */}
                <div
                  className={`w-10 h-10 rounded-[16px] flex items-center justify-center flex-shrink-0 border-2 border-white/80 backdrop-blur-md transition-transform group-hover:scale-110 shadow-md ${
                    isCompleted 
                      ? 'bg-emerald-500/30 border-emerald-300 text-emerald-200' 
                      : 'bg-white/30 text-white'
                  }`}
                >
                  {getIcon(item.iconType, isCompleted)}
                </div>

                {/* Text Content */}
                <div className="flex flex-col min-w-0 leading-tight">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-black text-yellow-200 font-mono tracking-tight drop-shadow-sm">
                      {item.time}
                    </span>
                    {isActiveNow && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-[9px] font-black text-white uppercase tracking-wider animate-bounce shadow-md">
                        <Sparkles className="w-2.5 h-2.5 text-yellow-100" /> ACTIVE QUEST
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xs sm:text-[13px] font-extrabold truncate drop-shadow-md ${isCompleted ? 'text-emerald-100/40' : 'text-white'}`}>
                    {item.title}
                  </h3>
                  {item.details && (
                    <p className={`text-[10px] sm:text-[11px] truncate font-medium ${isCompleted ? 'text-emerald-200/30' : 'text-pink-100'}`}>
                      {item.details}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Completion Checkbox Trigger */}
              <motion.button
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.85 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCompleted) {
                    soundFx.playAchievement();
                  } else {
                    soundFx.playBubblePop();
                  }
                  onToggleTask(item.id);
                }}
                className={`w-7 h-7 rounded-[11px] flex items-center justify-center flex-shrink-0 transition-all border-2 relative z-10 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-400 border-white text-emerald-950 shadow-[0_0_12px_#34d399]'
                    : 'bg-white/30 hover:bg-white/50 border-white/90 text-white/60 hover:text-white'
                }`}
                title={isCompleted ? 'Completed! Click to uncheck' : 'Complete this magical task!'}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 font-black" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </motion.button>
            </motion.div>
          );
        })}

        {/* Day 3 Bottom Hero Banner: Exam Day Stay Calm & Confident */}
        {day.id === 'day-3' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 350, damping: 25 }}
            whileHover={{ scale: 1.04, y: -2 }}
            onClick={() => soundFx.playAchievement()}
            className="mt-3 p-4 rounded-[26px] candy-glass-pill border-2 border-yellow-300/90 shadow-[0_12px_36px_rgba(251,191,36,0.4)] flex flex-col items-center justify-center text-center relative overflow-hidden group bg-gradient-to-r from-amber-500/30 via-pink-500/20 to-purple-500/30 cursor-pointer"
          >
            {/* Top specular glint */}
            <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-shimmer pointer-events-none" />

            {/* Glowing Star Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center mb-2 text-white animate-pulse">
              <Star className="w-6 h-6 fill-white text-white drop-shadow-md" />
            </div>
            <h4 className="text-base font-black text-white font-['Outfit',sans-serif] drop-shadow-md flex items-center gap-1.5">
              <span>Exam Day Champion</span>
              <span>🌟</span>
            </h4>
            <p className="text-xs font-bold text-yellow-200 drop-shadow-sm">
              You are super smart & ready to shine!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
