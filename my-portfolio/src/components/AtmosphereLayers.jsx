import { useReducedMotion } from '../hooks/useReducedMotion';

export function AtmosphereLayers() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* 1. Scanlines overlay */}
      <div className="absolute inset-0 scanlines-overlay opacity-30" />

      {/* 2. Vignette breathing effect (disabled in reduced motion) */}
      <div className={`absolute inset-0 ${reducedMotion ? '' : 'vignette-overlay'}`} />

      {/* 3. Chromatic aberration sliver on screen edges */}
      <div className="absolute inset-0 chroma-overlay" />

      {/* 4. Subtle film noise grain */}
      {!reducedMotion && (
        <div className="absolute inset-0 grain-overlay" />
      )}
    </div>
  );
}
