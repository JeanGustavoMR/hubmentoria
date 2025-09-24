import React from 'react';
import { Play, Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types';
import heroImage from '@/assets/hero-mentoria.jpg';

interface HeroSectionProps {
  featuredCourse?: Course;
  onPlayCourse?: (courseId: string) => void;
  onMoreInfo?: (courseId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredCourse,
  onPlayCourse,
  onMoreInfo
}) => {
  if (!featuredCourse) {
    // Default hero when no featured course
    return (
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-2xl bg-gradient-hero">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="MentorIA - Mentoria Executiva Premium"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-6 animate-fade-in">
              <Badge variant="outline" className="border-accent/50 bg-background-overlay/80 backdrop-blur-sm">
                <Star className="mr-2 h-3 w-3 fill-accent text-accent" />
                Mentoria Premium
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  MentorIA
                </span>
                <br />
                <span className="text-foreground">
                  Excelência Executiva
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Transforme sua liderança com conteúdo premium criado por especialistas 
                para grandes líderes e donos de empresas.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="hero" size="lg" className="shadow-glow">
                  <Play className="mr-2 h-5 w-5" />
                  Começar Agora
                </Button>
                <Button variant="glass" size="lg">
                  Explorar Catálogo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>500+ Executivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>100+ Horas de Conteúdo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span>4.9 de Avaliação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const totalDuration = featuredCourse.modules.reduce((acc, module) => 
    acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.videoAsset.duration, 0), 0
  );

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <img
          src={featuredCourse.thumbnail}
          alt={featuredCourse.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-background-overlay/80 backdrop-blur-sm">
                {featuredCourse.category}
              </Badge>
              <Badge variant="outline" className="border-accent/50 bg-background-overlay/80 backdrop-blur-sm">
                Destaque
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              {featuredCourse.title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {featuredCourse.description}
            </p>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <img 
                  src={featuredCourse.mentor.avatar} 
                  alt={featuredCourse.mentor.name}
                  className="h-6 w-6 rounded-full"
                />
                <span>{featuredCourse.mentor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(totalDuration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>{featuredCourse.difficulty}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="play" 
                size="lg" 
                onClick={() => onPlayCourse?.(featuredCourse.id)}
                className="shadow-accent-glow"
              >
                <Play className="mr-2 h-5 w-5" />
                Assistir Agora
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => onMoreInfo?.(featuredCourse.id)}
              >
                Mais Informações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};