export type SubjectCategory = 'ai' | 'maths' | 'hindi' | 'play' | 'skills' | 'break' | 'review' | 'exam' | 'routine';

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  details?: string;
  category: SubjectCategory;
}

export interface DayPlan {
  id: string;
  dateStr: string;
  dayLabel: string;
  subtitle: string;
  items: ScheduleItem[];
}

export interface SubjectFocus {
  id: string;
  subject: string;
  weightage: string;
  topics: string;
}

export interface StudyGuideline {
  id: string;
  title: string;
  description: string;
}
