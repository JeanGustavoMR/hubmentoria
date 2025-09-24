import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Lesson, WatchProgress } from '@/types';

interface VideoPlayerProps {
  lesson: Lesson;
  watchProgress?: WatchProgress;
  onProgressUpdate?: (lessonId: string, progressPercentage: number) => void;
  onComplete?: (lessonId: string) => void;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  watchProgress,
  onProgressUpdate,
  onComplete,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Initialize player with saved progress
  useEffect(() => {
    if (videoRef.current && watchProgress && watchProgress.progressPercentage > 0) {
      const startTime = (watchProgress.progressPercentage / 100) * lesson.videoAsset.duration;
      videoRef.current.currentTime = startTime;
    }
  }, [lesson, watchProgress]);

  // Progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      
      if (duration > 0) {
        const progressPercentage = (currentTime / duration) * 100;
        setCurrentTime(currentTime);
        
        // Update progress every 5 seconds
        if (Math.floor(currentTime) % 5 === 0) {
          onProgressUpdate?.(lesson.id, progressPercentage);
        }

        // Mark as complete at 90%
        if (progressPercentage >= 90 && !watchProgress?.completed) {
          onComplete?.(lesson.id);
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [lesson.id, onProgressUpdate, onComplete, watchProgress?.completed]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    
    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`relative group bg-background rounded-lg overflow-hidden shadow-lg ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={lesson.videoAsset.thumbnail}
        onClick={togglePlayPause}
      >
        {/* For demo, we'll use a placeholder video source */}
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">{lesson.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-background-overlay/80 backdrop-blur-sm">
              {formatTime(duration)}
            </Badge>
            {watchProgress?.completed && (
              <Badge variant="outline" className="border-success/50 bg-background-overlay/80 backdrop-blur-sm">
                Concluído
              </Badge>
            )}
          </div>
        </div>

        {/* Center Play Button */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={togglePlayPause}
              className="shadow-glow animate-scale-in"
            >
              <Play className="h-8 w-8 ml-2" />
            </Button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progressPercentage]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(duration - currentTime)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={() => skipTime(-10)}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon" onClick={togglePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
              </Button>
              
              <Button variant="ghost" size="icon-sm" onClick={() => skipTime(10)}>
                <SkipForward className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback Speed */}
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackRate(Number(e.target.value))}
                className="bg-background-overlay/80 backdrop-blur-sm border border-border/50 rounded px-2 py-1 text-sm"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>

              <Button variant="ghost" size="icon-sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon-sm" onClick={toggleFullscreen}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};