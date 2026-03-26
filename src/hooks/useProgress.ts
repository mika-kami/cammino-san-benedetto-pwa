import { useState, useEffect } from 'react';

interface Progress {
  stages_completed: number[];
  current_stage: number;
  start_date: string;
  pilgrim_name: string;
  stamps_collected: Record<string, string[]>; // stage -> stamp ids
}

const DEFAULT_PROGRESS: Progress = {
  stages_completed: [],
  current_stage: 1,
  start_date: '',
  pilgrim_name: '',
  stamps_collected: {}
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('csb_progress');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('csb_progress', JSON.stringify(progress));
  }, [progress]);

  const toggleStageComplete = (stageNum: number) => {
    setProgress(prev => {
      const completed = prev.stages_completed.includes(stageNum)
        ? prev.stages_completed.filter(s => s !== stageNum)
        : [...prev.stages_completed, stageNum].sort((a, b) => a - b);
      return { ...prev, stages_completed: completed };
    });
  };

  const toggleStamp = (stageNum: number, stampId: string) => {
    setProgress(prev => {
      const key = String(stageNum);
      const stamps = prev.stamps_collected[key] || [];
      const updated = stamps.includes(stampId)
        ? stamps.filter(s => s !== stampId)
        : [...stamps, stampId];
      return { ...prev, stamps_collected: { ...prev.stamps_collected, [key]: updated } };
    });
  };

  const setName = (name: string) => setProgress(prev => ({ ...prev, pilgrim_name: name }));
  const setStartDate = (date: string) => setProgress(prev => ({ ...prev, start_date: date }));

  const totalStamps = Object.values(progress.stamps_collected).reduce((sum, arr) => sum + arr.length, 0);

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem('csb_progress');
  };

  return { progress, toggleStageComplete, toggleStamp, setName, setStartDate, totalStamps, resetProgress };
}
