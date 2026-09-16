import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { DayScheduleCard } from './components/DayScheduleCard';
import { SubjectFocusSection } from './components/SubjectFocusSection';
import { DAYS_DATA } from './data/roadmapData';
import { SubjectCategory } from './types';

export default function App() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('exam_schedule_checks_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeFilter, setActiveFilter] = useState<SubjectCategory | 'all'>('all');
  const [activeDayView, setActiveDayView] = useState<'all' | 'day-1' | 'day-2' | 'day-3'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('exam_schedule_checks_v2', JSON.stringify(completedTasks));
    } catch {
      // Ignore
    }
  }, [completedTasks]);

  const totalTasks = useMemo(() => {
    return DAYS_DATA.reduce((acc, day) => acc + day.items.length, 0);
  }, []);

  const completedCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all completed checkmarks?')) {
      setCompletedTasks({});
    }
  };

  // Filter by day view & search
  const visibleDays = useMemo(() => {
    return DAYS_DATA.filter((day) => {
      if (activeDayView !== 'all' && day.id !== activeDayView) return false;
      return true;
    }).map((day) => {
      if (!searchQuery.trim()) return day;
      const query = searchQuery.toLowerCase();
      const matchingItems = day.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.details && item.details.toLowerCase().includes(query)) ||
          item.time.toLowerCase().includes(query)
      );
      return {
        ...day,
        items: matchingItems,
      };
    });
  }, [activeDayView, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <Header
          completedCount={completedCount}
          totalCount={totalTasks}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onResetProgress={handleResetProgress}
        />

        {/* View Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 no-print">
          <div className="inline-flex rounded border border-neutral-200 p-0.5 bg-neutral-50 text-xs">
            <button
              type="button"
              onClick={() => setActiveDayView('all')}
              className={`px-3 py-1 rounded transition-colors ${
                activeDayView === 'all'
                  ? 'bg-white font-medium text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All Days
            </button>
            <button
              type="button"
              onClick={() => setActiveDayView('day-1')}
              className={`px-3 py-1 rounded transition-colors ${
                activeDayView === 'day-1'
                  ? 'bg-white font-medium text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              16 Sep (Wed)
            </button>
            <button
              type="button"
              onClick={() => setActiveDayView('day-2')}
              className={`px-3 py-1 rounded transition-colors ${
                activeDayView === 'day-2'
                  ? 'bg-white font-medium text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              17 Sep (Thu)
            </button>
            <button
              type="button"
              onClick={() => setActiveDayView('day-3')}
              className={`px-3 py-1 rounded transition-colors ${
                activeDayView === 'day-3'
                  ? 'bg-white font-medium text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              18 Sep (Exam)
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search topics, units, times..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-1.5 border border-neutral-200 rounded focus:outline-none focus:border-neutral-400 bg-white placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Schedule Grid */}
        <div
          className={`grid gap-6 items-start ${
            activeDayView === 'all' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
          }`}
        >
          {visibleDays.map((day) => (
            <DayScheduleCard
              key={day.id}
              day={day}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              activeFilter={activeFilter}
            />
          ))}
        </div>

        {/* Syllabus & Strategy Notes */}
        <SubjectFocusSection />

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-neutral-100 text-center text-xs text-neutral-400">
          <p>Official 3-Day Examination Schedule · Document Version 2.0</p>
        </footer>
      </main>
    </div>
  );
}
