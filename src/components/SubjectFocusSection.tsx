import React from 'react';
import { SUBJECT_FOCUS_DATA, STUDY_GUIDELINES } from '../data/roadmapData';

export const SubjectFocusSection: React.FC = () => {
  return (
    <section className="mt-8 pt-6 border-t border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Breakdown */}
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Syllabus Weightage & Coverage
          </h3>
          <div className="space-y-3">
            {SUBJECT_FOCUS_DATA.map((item) => (
              <div key={item.id} className="text-xs border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                <div className="flex items-center justify-between font-medium text-neutral-800">
                  <span>{item.subject}</span>
                  <span className="text-neutral-500 font-normal">{item.weightage}</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">{item.topics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Preparation Guidelines */}
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Examination Execution Protocol
          </h3>
          <div className="space-y-3">
            {STUDY_GUIDELINES.map((guideline) => (
              <div key={guideline.id} className="text-xs border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                <span className="font-medium text-neutral-800">{guideline.title}</span>
                <p className="text-[11px] text-neutral-500 mt-0.5">{guideline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
