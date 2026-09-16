import React from 'react';
import { SubjectCategory } from '../types';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  activeFilter: SubjectCategory | 'all';
  onFilterChange: (category: SubjectCategory | 'all') => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  activeFilter,
  onFilterChange,
  onResetProgress,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filters: Array<{ id: SubjectCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Items' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'skills', label: 'Employability Skills' },
    { id: 'maths', label: 'Mathematics' },
    { id: 'break', label: 'Breaks & Meals' },
    { id: 'review', label: 'Review & Mock' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="border-b border-neutral-200 pb-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Final Examination Schedule
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            3-Day Preparation Roadmap · September 16 – 18, 2026
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
          >
            Print Schedule
          </button>
          <button
            type="button"
            onClick={onResetProgress}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-500 bg-white border border-neutral-200 rounded hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            Reset Checks
          </button>
        </div>
      </div>

      {/* Progress & Quick Stats */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xs text-neutral-600">
            <span className="font-semibold text-neutral-900">{completedCount}</span> of{' '}
            <span className="font-semibold text-neutral-900">{totalCount}</span> sessions completed ({percent}%)
          </div>
          <div className="w-32 h-1.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
            <div
              className="h-full bg-neutral-800 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 no-print">
          <span className="text-xs text-neutral-400 mr-1">Filter:</span>
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterChange(f.id)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white font-medium'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
