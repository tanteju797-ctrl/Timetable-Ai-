export type SubjectCategory = 'ai' | 'maths' | 'hindi' | 'play' | 'skills' | 'break' | 'review' | 'exam' | 'routine';

export type GlassMode = 'clear' | 'frosted' | 'blur';

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  details?: string;
  category: SubjectCategory;
  highlightType?: 'pink' | 'green' | 'blue' | 'purple' | 'orange' | 'cyan' | 'red' | 'default';
  iconType: 'ai' | 'play' | 'food' | 'skills' | 'ict' | 'break' | 'target' | 'write' | 'moon' | 'sun' | 'book' | 'maths' | 'check' | 'power' | 'refresh' | 'coffee';
  isCompleted?: boolean;
}

export interface DayPlan {
  id: string;
  dateStr: string;
  dayLabel: string;
  subtitle: string;
  badge?: string;
  items: ScheduleItem[];
}

export interface SubjectFocus {
  id: string;
  subject: string;
  dateTag?: string;
  subtitle: string;
  color: string;
  icon: 'hindi' | 'ai' | 'maths' | 'play';
}

export interface PlayScheduleEntry {
  id: string;
  day: string;
  date: string;
  hours: string;
  icon: 'target' | 'coffee' | 'book';
}

export interface TipItem {
  id: string;
  text: string;
  completed?: boolean;
}
