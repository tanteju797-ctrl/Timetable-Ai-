import React from 'react';
import { DayPlan, ScheduleItem, SubjectCategory } from '../types';

interface DayScheduleCardProps {
  day: DayPlan;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  activeFilter: SubjectCategory | 'all';
}

export const DayScheduleCard: React.FC<DayScheduleCardProps> = ({
  day,
  completedTasks,
  onToggleTask,
  activeFilter,
}) => {
  const filteredItems = day.items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return item.category === 'ai';
    if (activeFilter === 'skills') return item.category === 'skills';
    if (activeFilter === 'maths') return item.category === 'maths';
    if (activeFilter === 'break') return item.category === 'break' || item.category === 'play';
    if (activeFilter === 'review') return item.category === 'review' || item.category === 'exam';
    return item.category === activeFilter;
  });

  const dayCompleted = day.items.filter((i) => completedTasks[i.id]).length;

  return (
    <div className="border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-none mb-6">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">{day.dayLabel}</h2>
          <p className="text-xs text-neutral-500">{day.subtitle}</p>
        </div>
        <span className="text-xs font-mono text-neutral-500">
          {dayCompleted}/{day.items.length} done
        </span>
      </div>

      {/* Items Table / List */}
      <div className="divide-y divide-neutral-100">
        {filteredItems.length === 0 ? (
          <div className="p-4 text-xs text-neutral-400 text-center italic">
            No items matching active filter for this day.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isCompleted = !!completedTasks[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onToggleTask(item.id)}
                className={`px-4 py-2.5 flex items-start gap-3 hover:bg-neutral-50 cursor-pointer transition-colors ${
                  isCompleted ? 'bg-neutral-50/60' : ''
                }`}
              >
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span
                      className={`text-xs font-medium ${
                        isCompleted ? 'line-through text-neutral-400' : 'text-neutral-800'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  {item.details && (
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isCompleted ? 'line-through text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {item.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
