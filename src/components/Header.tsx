import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Volume2, VolumeX, Filter, Music, Sparkles } from 'lucide-react';
import { HEADER_SUBJECT_BADGES } from '../data/roadmapData';
import { soundFx } from '../utils/audio';
import { GlassMode } from '../types';

interface HeaderProps {
  activeFilter: string | null;
  onSelectFilter: (subject: string | null) => void;
  isSimulatedTime: boolean;
  simulatedTime: string;
  onToggleTimeMode: () => void;
  glassMode: GlassMode;
  onChangeGlassMode: (mode: GlassMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeFilter,
  onSelectFilter,
  isSimulatedTime,
  simulatedTime,
  onToggleTimeMode,
  glassMode,
  onChangeGlassMode,
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (isSimulatedTime) {
        setCurrentTimeStr(simulatedTime);
        setCurrentDateStr('16 Sep 2026 (Simulated)');
        return;
      }

      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const minFormatted = minutes < 10 ? '0' + minutes : minutes;
      const secFormatted = seconds < 10 ? '0' + seconds : seconds;
      setCurrentTimeStr(`${hours}:${minFormatted}:${secFormatted} ${ampm}`);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const dateNum = now.getDate();
      const year = now.getFullYear();

      setCurrentDateStr(`${dayName}, ${dateNum} ${monthName} ${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isSimulatedTime, simulatedTime]);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playFairyTwinkle();
  };

  const handleToggleAmbient = () => {
    const playing = soundFx.toggleAmbient();
    setIsAmbientOn(playing);
    if (playing) soundFx.playFairyTwinkle();
  };

  const handleBadgeClick = (name: string) => {
    soundFx.playFairyTwinkle();
    if (activeFilter === name.toLowerCase()) {
      onSelectFilter(null);
    } else {
      onSelectFilter(name.toLowerCase());
    }
  };

  return (
    <header className="w-full flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 mb-6 relative z-10 select-none">
      {/* Left Branding: 3D Candy Glass Mascot & Title */}
      <div className="flex items-center gap-4">
        {/* Whimsical 3D Glass Icon with floating badge */}
        <motion.div
          id="header-calendar-icon"
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -4, 4, 0],
            transition: { type: 'spring', stiffness: 400, damping: 20 }
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => soundFx.playAchievement()}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-[24px] candy-glass-pill p-1 cursor-pointer flex-shrink-0 flex items-center justify-center border-2 border-pink-300/80 group overflow-hidden shadow-[0_12px_30px_rgba(236,72,153,0.35)]"
          title="Click for fairy dust!"
        >
          {/* Specular sheen */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-[24px]" />
          
          <div className="w-full h-full rounded-[20px] flex flex-col items-center justify-center p-2 bg-gradient-to-br from-pink-400/30 via-purple-400/20 to-sky-400/30 border border-white/80 shadow-inner">
            <span className="text-2xl sm:text-3xl animate-bounce">🦄</span>
            <span className="text-[9px] font-black text-white/90 uppercase tracking-tighter mt-0.5">MAGIC</span>
          </div>
        </motion.div>

        {/* Title & Fantasy Subtitle */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="flex items-center gap-2.5 flex-wrap"
          >
            <h1
              id="header-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-['Outfit',sans-serif] drop-shadow-[0_4px_16px_rgba(236,72,153,0.5)] flex items-center gap-2"
            >
              <span>Final Exam Roadmap</span>
              <span className="text-2xl">✨</span>
            </h1>
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-sky-500/80 text-white border border-white/80 backdrop-blur-md shadow-[0_4px_12px_rgba(236,72,153,0.4)] animate-pulse">
              🌈 Fantasy Edition
            </span>
          </motion.div>

          <motion.div
            id="header-subtitle"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, type: 'spring', stiffness: 350, damping: 28 }}
            className="text-xs sm:text-sm font-bold text-pink-100 mt-1 tracking-wide flex items-center gap-2 flex-wrap drop-shadow-md"
          >
            <span className="flex items-center gap-1">🌟 16 – 18 September 2026 Adventure</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
            <span className="text-yellow-200 font-bold">3-Day Magical Schedule</span>
            {activeFilter && (
              <motion.span
                layoutId="filter-pill"
                className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-3 py-0.5 rounded-full border border-white/90 shadow-md"
              >
                <Filter className="w-2.5 h-2.5 text-yellow-300" /> Filter: {activeFilter}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFilter(null);
                  }}
                  className="ml-1 hover:text-yellow-200 font-black p-0.5 rounded-full"
                >
                  ✕
                </button>
              </motion.span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Center & Right: Live Real-Time Dynamic Island Widget, Glass Mode Switcher & Filter Pills */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start xl:justify-end">
        {/* Real-Time Live Status Pill (Candy Glass Dynamic Capsule) */}
        <motion.div
          id="header-live-time-pill"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 350, damping: 28 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onToggleTimeMode}
          className="candy-glass-pill flex items-center gap-3 px-4 py-2.5 rounded-[24px] cursor-pointer select-none relative overflow-hidden group border-2 border-cyan-300/80 shadow-[0_8px_25px_rgba(6,182,212,0.3)] bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-pink-500/20"
          title="Click to toggle between Real-Time Live Clock and Simulation Mode"
        >
          {/* Top specular glint */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-[24px]" />

          {/* Left item: Real Date */}
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-cyan-200 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-300" />
              {isSimulatedTime ? 'Simulated' : 'Live Date'}
            </span>
            <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight drop-shadow-sm">
              {currentDateStr || 'Loading...'}
            </div>
          </div>

          {/* Frosted Rainbow Divider */}
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-pink-400 via-yellow-300 to-cyan-400" />

          {/* Right item: Live Real Time with Seconds Ticker */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-[10px] font-black text-pink-200 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-pink-300" />
                {isSimulatedTime ? 'Sim Time' : 'Live Real Time'}
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulatedTime ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulatedTime ? 'bg-amber-500' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'}`} />
              </span>
            </div>
            <div className="text-xs sm:text-sm font-black text-yellow-300 font-mono tracking-wider flex items-center gap-1 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]">
              <span>{currentTimeStr || '00:00:00 AM'}</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Glass Mode Switchers */}
        <div className="flex items-center p-1 rounded-[22px] candy-glass-pill border-2 border-purple-300/80 bg-purple-900/30 shadow-[0_8px_20px_rgba(168,85,247,0.3)]">
          {(['clear', 'frosted', 'blur'] as GlassMode[]).map((mode) => {
            const isActive = glassMode === mode;
            const labels: Record<GlassMode, { title: string; emoji: string }> = {
              clear: { title: 'Crystal', emoji: '💎' },
              frosted: { title: 'Pastel', emoji: '🍭' },
              blur: { title: 'Dreamy', emoji: '🦄' },
            };
            return (
              <button
                key={mode}
                onClick={() => {
                  soundFx.playFairyTwinkle();
                  onChangeGlassMode(mode);
                }}
                className={`px-3 py-1.5 rounded-[16px] text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'candy-glass-active text-white shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-white/15'
                }`}
                title={`Switch glass theme to ${labels[mode].title}`}
              >
                <span>{labels[mode].emoji}</span>
                <span>{labels[mode].title}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Subject Filter Glass Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {HEADER_SUBJECT_BADGES.map((badge, idx) => {
            const isSelected = activeFilter === badge.name.toLowerCase();
            return (
              <motion.button
                key={badge.id}
                id={`header-badge-${badge.name.toLowerCase()}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.03, type: 'spring', stiffness: 350, damping: 25 }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleBadgeClick(badge.name)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-[20px] transition-all text-left overflow-hidden border-2 ${
                  isSelected
                    ? 'candy-glass-active ring-2 ring-white shadow-[0_8px_25px_rgba(244,114,182,0.6)]'
                    : 'candy-glass-pill hover:bg-white/30 text-white border-white/70 shadow-sm'
                }`}
              >
                {/* Specular sheen */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[20px]" />

                {/* Translucent Glass Emoji Icon */}
                <div
                  className="w-8 h-8 rounded-[14px] flex items-center justify-center flex-shrink-0 border border-white/90 bg-white/30 shadow-inner text-base"
                >
                  <span>{badge.emoji}</span>
                </div>

                {/* Badge Text */}
                <div className="flex flex-col leading-tight pr-0.5">
                  <span className="text-xs font-black text-white drop-shadow-sm">
                    {badge.name}
                  </span>
                  <span className="text-[10px] font-bold text-pink-100">
                    {badge.sub}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Audio & Ambient Tone Controllers */}
        <div className="flex items-center gap-1 p-1.5 rounded-[20px] candy-glass-pill border-2 border-pink-300/80 bg-pink-900/30">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleAmbient}
            className={`p-2 rounded-[14px] text-xs font-bold flex items-center gap-1 transition-all ${
              isAmbientOn
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md border border-white/80'
                : 'text-pink-200 hover:bg-white/20'
            }`}
            title={isAmbientOn ? 'Turn off peaceful fantasy tones' : 'Turn on peaceful fantasy alpha tone'}
          >
            <Music className={`w-4 h-4 ${isAmbientOn ? 'animate-bounce text-yellow-300' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleSound}
            className={`p-2 rounded-[14px] text-xs font-bold flex items-center gap-1 transition-all ${
              isMuted
                ? 'text-white/40 hover:bg-white/20'
                : 'text-yellow-300 hover:bg-white/20 drop-shadow-[0_0_6px_#fde047]'
            }`}
            title={isMuted ? 'Unmute joyful fairy sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
