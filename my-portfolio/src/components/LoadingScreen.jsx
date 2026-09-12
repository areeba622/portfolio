import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Randomized increments between 6% and 18% per tick over 600-900ms total
      const increment = Math.floor(Math.random() * 12) + 6;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Brief pause at 100% then fade out over 0.5s
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 120);
      } else {
        setProgress(current);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-void text-paper transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xs px-6 flex flex-col items-center gap-3">
        {/* Label in Orbitron font */}
        <div className="font-display text-xs md:text-sm tracking-[0.25em] text-primary">
          INITIALIZING SYSTEM
        </div>

        {/* Thin progress bar */}
        <div className="w-full h-1 bg-line rounded-none overflow-hidden relative border border-primary-dim/30">
          <div
            className="h-full bg-primary transition-all duration-75 ease-out shadow-[0_0_8px_rgba(95,201,240,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live percentage readout in Share Tech Mono */}
        <div className="font-data text-xs tracking-wider text-primary-dim flex justify-between w-full">
          <span>SYS.DIAGNOSTICS</span>
          <span className="text-paper">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
