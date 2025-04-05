"use client";

import { Clock } from "lucide-react";

interface TuteTimerProps {
  timeRemaining: number;
}

export function TuteTimer({ timeRemaining }: TuteTimerProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg text-gray-600">Time left to claim more</p>
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Clock className="w-6 h-6 text-purple-500" />
        <span>{formatTime(timeRemaining)}</span>
      </div>
    </div>
  );
}
