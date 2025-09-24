import React from 'react';
import { Play, Clock, Star } from 'lucide-react';
import { Course, WatchProgress } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  course: Course;
  watchProgress?: WatchProgress;
  onPlay?: (courseId: string) => void;
  onFavorite?: (courseId: string) => void;
  isFavorited?: boolean;
  variant?: 'default' | 'large' | 'continue';
}

export const VideoCard: React.FC<VideoCardProps> = ({
  course,
  watchProgress,
  onPlay,
  onFavorite,
  isFavorited,
  variant = 'default'
}) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const cardSizes = {
    default: 'w-80 h-48',
    large: 'w-96 h-56', 
    continue: 'w-72 h-40'
  };

  const totalDuration = course.modules.reduce((acc, module) => 
    acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.videoAsset.duration, 0), 0
  );

  return (
    <div className="group relative animate-fade-in">
      <div className={`${cardSizes[variant]} relative overflow-hidden rounded-lg bg-gradient-card shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow`}>
        {/* Thumbnail */}
        <div className="relative h-full w-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
          
          {/* Progress bar for continue watching */}
          {watchProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${watchProgress.progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-foreground">
          {/* Top badges */}
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-background-overlay/80 backdrop-blur-sm">
                {course.category}
              </Badge>
              <Badge variant="outline" className="border-accent/50 bg-background-overlay/80 backdrop-blur-sm">
                {course.difficulty}
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onFavorite?.(course.id)}
              className="bg-background-overlay/80 backdrop-blur-sm hover:bg-accent/20"
            >
              <Star className={`h-4 w-4 ${isFavorited ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
            </Button>
          </div>

          {/* Bottom content */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {course.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(totalDuration)}
                </div>
                <div className="flex items-center gap-1">
                  <img 
                    src={course.mentor.avatar} 
                    alt={course.mentor.name}
                    className="h-5 w-5 rounded-full"
                  />
                  <span>{course.mentor.name}</span>
                </div>
              </div>

              <Button
                variant="play"
                size="sm"
                onClick={() => onPlay?.(course.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="h-4 w-4" />
                Assistir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};