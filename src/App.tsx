import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { GlassBackground } from './components/GlassBackground';
import { Header } from './components/Header';
import { DayColumn } from './components/DayColumn';
import { PlayScheduleWidget } from './components/PlayScheduleWidget';
import { SubjectFocusWidget } from './components/SubjectFocusWidget';
import { TipsWidget } from './components/TipsWidget';
import { BottomPillBar } from './components/BottomPillBar';
import { TaskModal } from './components/TaskModal';
import { InteractiveControls } from './components/InteractiveControls';
import { DAYS_DATA } from './data/roadmapData';
import { ScheduleItem, GlassMode } from './types';
import { soundFx } from './utils/audio';

export default function App() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('fantasy_exam_roadmap_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<{ task: ScheduleItem; dayTitle: string } | null>(null);
  const [isSimulatedTime, setIsSimulatedTime] = useState<boolean>(false);
  const [simulatedHour, setSimulatedHour] = useState<number>(15.25); // 3:15 PM = 15.25
  const [glassMode, setGlassMode] = useState<GlassMode>('clear');
  const [activeTab, setActiveTab] = useState<'all' | 'day-1' | 'day-2' | 'day-3' | 'widgets'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('fantasy_exam_roadmap_completed', JSON.stringify(completedTasks));
    } catch {
      // Ignore
    }
  }, [completedTasks]);

  const simulatedTimeFormatted = useMemo(() => {
    const hours24 = Math.floor(simulatedHour);
    const minutesVal = Math.round((simulatedHour - hours24) * 60);
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const minutesStr = minutesVal < 10 ? '0' + minutesVal : minutesVal;
    return `${hours12}:${minutesStr} ${ampm}`;
  }, [simulatedHour]);

  // Determine current active task ID based on real time or simulated time
  const currentActiveTaskId = useMemo(() => {
    const currentDecTime = isSimulatedTime ? simulatedHour : (() => {
      const now = new Date();
      return now.getHours() + now.getMinutes() / 60;
    })();

    const day1 = DAYS_DATA[0];
    for (const item of day1.items) {
      const parts = item.time.split('–').map((p) => p.trim());
      if (parts.length === 2) {
        const parseTimeString = (tStr: string) => {
          const [h, m] = tStr.split(':').map((n) => parseInt(n, 10));
          const hour24 = h < 12 ? h + 12 : h;
          return hour24 + (m || 0) / 60;
        };
        const start = parseTimeString(parts[0]);
        const end = parseTimeString(parts[1]);
        if (currentDecTime >= start && currentDecTime <= end) {
          return item.id;
        }
      }
    }
    return 'd1-1';
  }, [isSimulatedTime, simulatedHour]);

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = !prev[taskId];
      if (next) {
        soundFx.playAchievement();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24', '#34d399', '#ffffff'],
        });
      } else {
        soundFx.playBubblePop();
      }
      return { ...prev, [taskId]: next };
    });
  };

  const handleResetAll = () => {
    soundFx.playBubblePop();
    setCompletedTasks({});
  };

  const handlePillTagClick = (tag: string) => {
    if (tag === 'discipline') setActiveFilter(activeFilter === 'skills' ? null : 'skills');
    else if (tag === 'practice') setActiveFilter(activeFilter === 'ai' ? null : 'ai');
    else if (tag === 'play') setActiveFilter(activeFilter === 'play' ? null : 'play');
    else if (tag === 'success') {
      soundFx.playAchievement();
      confetti({ 
        particleCount: 100, 
        spread: 90,
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#fbbf24', '#10b981', '#ffffff'],
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="relative min-h-screen p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between overflow-x-hidden selection:bg-pink-500/40 selection:text-white">
      {/* Dynamic Magical Fantasy Background with Floating Orbs, Bubbles & Stars */}
      <GlassBackground glassMode={glassMode} interactiveFx={true} />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto flex flex-col flex-1">
        {/* Top Header with Live Real Time & Glass Mode Switcher */}
        <Header
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          isSimulatedTime={isSimulatedTime}
          simulatedTime={simulatedTimeFormatted}
          onToggleTimeMode={() => setIsSimulatedTime(!isSimulatedTime)}
          glassMode={glassMode}
          onChangeGlassMode={setGlassMode}
        />

        {/* Mobile & Tablet Tab View Switcher */}
        <div className="flex xl:hidden items-center gap-1.5 p-1.5 rounded-[24px] candy-glass-pill border-2 border-pink-300/80 shadow-md mb-4 overflow-x-auto">
          {[
            { id: 'all', label: '🌈 All Columns' },
            { id: 'day-1', label: '🚀 16 Sep (Day 1)' },
            { id: 'day-2', label: '⚡ 17 Sep (Day 2)' },
            { id: 'day-3', label: '🏆 18 Sep (Day 3)' },
            { id: 'widgets', label: '🎮 Focus & Tips' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playFairyTwinkle();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-[18px] text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg border border-white'
                  : 'text-pink-100 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 4-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 flex-1 items-start">
          {/* Column 1: 16 Sep (Today) */}
          <div
            className={`flex flex-col gap-3 ${
              activeTab === 'all' || activeTab === 'day-1' ? 'block' : 'hidden xl:flex'
            }`}
          >
            <DayColumn
              day={DAYS_DATA[0]}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              activeFilter={activeFilter}
              onSelectTaskForFocus={(task, dayTitle) => setSelectedTask({ task, dayTitle })}
              currentActiveTaskId={currentActiveTaskId}
              isToday={true}
              glassMode={glassMode}
            />
            <BottomPillBar onPillClick={handlePillTagClick} />
          </div>

          {/* Column 2: 17 Sep */}
          <div
            className={`flex flex-col gap-3 ${
              activeTab === 'all' || activeTab === 'day-2' ? 'block' : 'hidden xl:flex'
            }`}
          >
            <DayColumn
              day={DAYS_DATA[1]}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              activeFilter={activeFilter}
              onSelectTaskForFocus={(task, dayTitle) => setSelectedTask({ task, dayTitle })}
              glassMode={glassMode}
            />
          </div>

          {/* Column 3: 18 Sep */}
          <div
            className={`flex flex-col gap-3 ${
              activeTab === 'all' || activeTab === 'day-3' ? 'block' : 'hidden xl:flex'
            }`}
          >
            <DayColumn
              day={DAYS_DATA[2]}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              activeFilter={activeFilter}
              onSelectTaskForFocus={(task, dayTitle) => setSelectedTask({ task, dayTitle })}
              glassMode={glassMode}
            />
          </div>

          {/* Column 4: Right Side Widgets (Daily Play Schedule + Subject Focus + Tips) */}
          <div
            className={`flex flex-col gap-4 ${
              activeTab === 'all' || activeTab === 'widgets' ? 'block' : 'hidden xl:flex'
            }`}
          >
            <PlayScheduleWidget glassMode={glassMode} />
            <SubjectFocusWidget
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              glassMode={glassMode}
            />
            <TipsWidget glassMode={glassMode} />
          </div>
        </div>

        {/* Bottom Interactive Controls */}
        <InteractiveControls
          onResetAll={handleResetAll}
          isSimulatedTime={isSimulatedTime}
          onToggleTimeMode={() => setIsSimulatedTime(!isSimulatedTime)}
          simulatedHour={simulatedHour}
          onChangeSimulatedHour={setSimulatedHour}
        />
      </div>

      {/* Interactive Task Focus / Study Timer Modal */}
      <TaskModal
        task={selectedTask?.task || null}
        dayTitle={selectedTask?.dayTitle || ''}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        isCompleted={selectedTask ? !!completedTasks[selectedTask.task.id] : false}
        onToggleComplete={(id) => handleToggleTask(id)}
      />
    </div>
  );
}
