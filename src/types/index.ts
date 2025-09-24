export type UserRole = 'master_admin' | 'mentor' | 'mentorado';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  cohort?: string;
  plan?: string;
}

export interface VideoAsset {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  hlsUrl: string;
  isLive?: boolean;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  videoAsset: VideoAsset;
  order: number;
  isLocked?: boolean;
  prerequisites?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  modules: Module[];
  mentor: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  cohorts: string[];
  plans: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WatchProgress {
  userId: string;
  lessonId: string;
  progressPercentage: number;
  lastWatchedAt: string;
  completed: boolean;
}

export interface UserPreferences {
  userId: string;
  favoriteIds: string[];
  continueWatching: WatchProgress[];
  watchHistory: WatchProgress[];
}