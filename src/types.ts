
export type LessonType = 'video' | 'document' | 'evaluation' | 'scorm' | 'webconference' | 'in-person' | 'recording';
export type LessonStatus = 'in-progress' | 'not-viewed' | 'completed';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  status?: LessonStatus;
  duration?: string;
  completed: boolean;
  lastVisited?: boolean;
  description?: string;
  videoUrl?: string;
  content?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  image?: string;
  progress: number;
  modules: Module[];
}
