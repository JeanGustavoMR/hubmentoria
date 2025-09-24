import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Course, WatchProgress } from '@/types';
import { VideoCard } from './VideoCard';
import { Button } from '@/components/ui/button';

interface CategorySectionProps {
  title: string;
  courses: Course[];
  watchProgress?: WatchProgress[];
  onPlayCourse?: (courseId: string) => void;
  onFavoriteCourse?: (courseId: string) => void;
  favoritedCourses?: string[];
  variant?: 'default' | 'continue';
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  courses,
  watchProgress = [],
  onPlayCourse,
  onFavoriteCourse,
  favoritedCourses = [],
  variant = 'default'
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = variant === 'continue' ? 300 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (courses.length === 0) return null;

  return (
    <section className="relative mb-12 animate-fade-in">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => scroll('left')}
            className="bg-background-overlay/50 hover:bg-background-overlay/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => scroll('right')}
            className="bg-background-overlay/50 hover:bg-background-overlay/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Course List */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        } as any}
      >
        {courses.map((course) => {
          const courseProgress = watchProgress.find(p => 
            course.modules.some(m => 
              m.lessons.some(l => l.id === p.lessonId)
            )
          );

          return (
            <VideoCard
              key={course.id}
              course={course}
              watchProgress={courseProgress}
              onPlay={onPlayCourse}
              onFavorite={onFavoriteCourse}
              isFavorited={favoritedCourses.includes(course.id)}
              variant={variant === 'continue' ? 'continue' : 'default'}
            />
          );
        })}
      </div>
    </section>
  );
};