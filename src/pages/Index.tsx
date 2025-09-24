import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { VideoPlayer } from '@/components/VideoPlayer';
import { WelcomeOverlay } from '@/components/WelcomeOverlay';
import { mockUser, mockCourses, mockWatchProgress } from '@/data/mockData';
import { Course, WatchProgress } from '@/types';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [watchProgress, setWatchProgress] = useState<WatchProgress[]>(mockWatchProgress);
  const [favoritedCourses, setFavoritedCourses] = useState<string[]>(['1']);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlayCourse = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedCourse(course);
      setSelectedLesson(course.modules[0].lessons[0]);
    }
  };

  const handleFavoriteCourse = (courseId: string) => {
    setFavoritedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger API call
  };

  const handleNavigate = (path: string) => {
    if (path === '/admin') {
      // In a real app, we'd check user permissions first
      if (mockUser.role === 'master_admin') {
        window.location.href = '/admin';
      } else {
        console.log('Access denied: Admin privileges required');
        // You could show a toast notification here
      }
    } else {
      console.log('Navigating to:', path);
      // In a real app with router, this would navigate
    }
  };

  const handleProgressUpdate = (lessonId: string, progressPercentage: number) => {
    setWatchProgress(prev => {
      const existing = prev.find(p => p.lessonId === lessonId);
      if (existing) {
        return prev.map(p => 
          p.lessonId === lessonId 
            ? { ...p, progressPercentage, lastWatchedAt: new Date().toISOString() }
            : p
        );
      } else {
        return [...prev, {
          userId: mockUser.id,
          lessonId,
          progressPercentage,
          lastWatchedAt: new Date().toISOString(),
          completed: false
        }];
      }
    });
  };

  const handleLessonComplete = (lessonId: string) => {
    setWatchProgress(prev => 
      prev.map(p => 
        p.lessonId === lessonId 
          ? { ...p, completed: true, progressPercentage: 100 }
          : p
      )
    );
  };

  // Filter courses based on search
  const filteredCourses = searchQuery 
    ? mockCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockCourses;

  // Get courses with progress for continue watching
  const coursesWithProgress = mockCourses.filter(course => 
    course.modules.some(module => 
      module.lessons.some(lesson => 
        watchProgress.some(p => p.lessonId === lesson.id && !p.completed && p.progressPercentage > 10)
      )
    )
  );

  // Get completed courses 
  const completedCourses = mockCourses.filter(course =>
    course.modules.some(module =>
      module.lessons.some(lesson =>
        watchProgress.some(p => p.lessonId === lesson.id && p.completed)
      )
    )
  );

  // If watching a video, show player view
  if (selectedLesson && selectedCourse) {
    const lessonProgress = watchProgress.find(p => p.lessonId === selectedLesson.id);
    
    return (
      <div className="min-h-screen bg-background">
        <Header 
          user={mockUser} 
          onSearch={handleSearch}
          onNavigate={handleNavigate}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <VideoPlayer
                lesson={selectedLesson}
                watchProgress={lessonProgress}
                onProgressUpdate={handleProgressUpdate}
                onComplete={handleLessonComplete}
                className="aspect-video"
              />
              
              {/* Course Info */}
              <div className="mt-6 p-6 bg-card rounded-lg">
                <h1 className="text-2xl font-bold mb-2">{selectedCourse.title}</h1>
                <p className="text-muted-foreground mb-4">{selectedCourse.description}</p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedCourse.mentor.avatar} 
                    alt={selectedCourse.mentor.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedCourse.mentor.name}</p>
                    <p className="text-sm text-muted-foreground">Mentor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Modules Sidebar */}
            <div className="space-y-6">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedLesson(null);
                }}
                className="text-primary hover:text-primary-glow transition-colors"
              >
                ← Voltar ao Catálogo
              </button>
              
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-4">Módulos do Curso</h3>
                {selectedCourse.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="mb-4">
                    <h4 className="font-medium mb-2">{module.title}</h4>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const progress = watchProgress.find(p => p.lessonId === lesson.id);
                      const isCurrentLesson = selectedLesson.id === lesson.id;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                            isCurrentLesson 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted-hover'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{lesson.title}</span>
                            {progress?.completed && (
                              <span className="text-success">✓</span>
                            )}
                          </div>
                          {progress && progress.progressPercentage > 0 && !progress.completed && (
                            <div className="mt-1 h-1 bg-muted rounded-full">
                              <div 
                                className="h-full bg-accent rounded-full"
                                style={{ width: `${progress.progressPercentage}%` }}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main catalog view
  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Overlay for first-time users */}
      {showWelcome && (
        <WelcomeOverlay 
          onDismiss={() => setShowWelcome(false)}
          userRole={mockUser.role}
        />
      )}
      
      <Header 
        user={mockUser} 
        onSearch={handleSearch}
        onNavigate={handleNavigate}
      />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection 
          featuredCourse={mockCourses[0]}
          onPlayCourse={handlePlayCourse}
        />

        {/* Continue Watching */}
        {coursesWithProgress.length > 0 && (
          <CategorySection
            title="Continuar Assistindo"
            courses={coursesWithProgress}
            watchProgress={watchProgress}
            onPlayCourse={handlePlayCourse}
            onFavoriteCourse={handleFavoriteCourse}
            favoritedCourses={favoritedCourses}
            variant="continue"
          />
        )}

        {/* Search Results or Categories */}
        {searchQuery ? (
          <CategorySection
            title={`Resultados para "${searchQuery}"`}
            courses={filteredCourses}
            watchProgress={watchProgress}
            onPlayCourse={handlePlayCourse}
            onFavoriteCourse={handleFavoriteCourse}
            favoritedCourses={favoritedCourses}
          />
        ) : (
          <>
            {/* Recommended */}
            <CategorySection
              title="Recomendado para Você"
              courses={mockCourses}
              watchProgress={watchProgress}
              onPlayCourse={handlePlayCourse}
              onFavoriteCourse={handleFavoriteCourse}
              favoritedCourses={favoritedCourses}
            />

            {/* By Category */}
            <CategorySection
              title="Liderança Estratégica"
              courses={mockCourses.filter(c => c.category === 'Liderança')}
              watchProgress={watchProgress}
              onPlayCourse={handlePlayCourse}
              onFavoriteCourse={handleFavoriteCourse}
              favoritedCourses={favoritedCourses}
            />

            <CategorySection
              title="Growth & Marketing"
              courses={mockCourses.filter(c => c.category === 'Growth')}
              watchProgress={watchProgress}
              onPlayCourse={handlePlayCourse}
              onFavoriteCourse={handleFavoriteCourse}
              favoritedCourses={favoritedCourses}
            />

            <CategorySection
              title="Finanças Corporativas"
              courses={mockCourses.filter(c => c.category === 'Finanças')}
              watchProgress={watchProgress}
              onPlayCourse={handlePlayCourse}
              onFavoriteCourse={handleFavoriteCourse}
              favoritedCourses={favoritedCourses}
            />

            {/* Completed */}
            {completedCourses.length > 0 && (
              <CategorySection
                title="Assistir Novamente"
                courses={completedCourses}
                watchProgress={watchProgress}
                onPlayCourse={handlePlayCourse}
                onFavoriteCourse={handleFavoriteCourse}
                favoritedCourses={favoritedCourses}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
