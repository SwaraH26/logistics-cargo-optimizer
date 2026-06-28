import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Clock } from 'lucide-react';

interface PlaybackControlsProps {
  totalSteps: number;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({ 
  totalSteps, 
  currentStepIndex, 
  onStepChange 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerMs, setTimerMs] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onStepChange(currentStepIndex + 1);
        if (currentStepIndex + 1 >= totalSteps - 1) {
          setIsPlaying(false);
        }
      }, 800); // Fixed comfortable speed
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, totalSteps, onStepChange]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isPlaying) {
      timerInterval = setInterval(() => {
        setTimerMs(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(timerInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (currentStepIndex === 0 && !isPlaying) {
      setTimerMs(0);
    }
  }, [currentStepIndex, isPlaying]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (currentStepIndex >= totalSteps - 1) {
      onStepChange(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="card flex items-center justify-between gap-4 py-3 px-6" style={{ background: 'var(--bg-surface)' }}>
      {/* Live Timer Display */}
      <div className="flex items-center gap-2" style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
        <Clock size={20} />
        {formatTime(timerMs)}
      </div>
      
      {/* Playback Controls */}
      <div className="flex items-center gap-4">
        <button 
          className="btn" 
          onClick={() => { setIsPlaying(false); setTimerMs(0); onStepChange(0); }}
          title="Restart"
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          className="btn" 
          onClick={() => { setIsPlaying(false); onStepChange(Math.max(0, currentStepIndex - 1)); }}
          disabled={currentStepIndex === 0}
          title="Step Back"
        >
          <SkipBack size={20} />
        </button>

        <button 
          className="btn" 
          style={{ 
            background: isPlaying ? 'var(--color-secondary)' : 'var(--color-primary)',
            color: '#fff',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handlePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button 
          className="btn" 
          onClick={() => { setIsPlaying(false); onStepChange(Math.min(totalSteps - 1, currentStepIndex + 1)); }}
          disabled={currentStepIndex >= totalSteps - 1}
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};
