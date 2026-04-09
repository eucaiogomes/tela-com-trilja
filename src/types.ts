
export type LessonType = 'video' | 'evaluation' | 'text' | 'document' | 'scorm';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
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
